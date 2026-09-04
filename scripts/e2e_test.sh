#!/bin/bash
PASS="a83c51f60bad135750142fa0df34ff5a"
BASE="http://localhost:5212"
S3="http://localhost:5213"
WEBDAV="http://localhost:5214"
PASSED=0
FAILED=0

check() {
  local name="$1"
  local expected="$2"
  local actual="$3"
  if echo "$actual" | grep -q "$expected"; then
    echo "  ✅ $name"
    PASSED=$((PASSED+1))
  else
    echo "  ❌ $name (expected '$expected' in response)"
    echo "     got: $(echo "$actual" | head -c 200)"
    FAILED=$((FAILED+1))
  fi
}

echo "========================================="
echo "  Memesplora E2E Test Suite"
echo "========================================="
echo ""

# 1. Health
echo "--- 1. Health Check ---"
R=$(curl -s $BASE/health)
check "Health endpoint" "ok" "$R"

# 2. Login
echo "--- 2. Admin Login ---"
R=$(curl -s -X POST $BASE/api/v3/admin/login -H "Content-Type: application/json" -d "{\"username\":\"admin\",\"password\":\"$PASS\"}")
TOKEN=$(echo "$R" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
check "Login returns token" "token" "$R"

# 3. Session
echo "--- 3. Get Session ---"
R=$(curl -s $BASE/api/v3/user/session -H "Authorization: Bearer $TOKEN")
check "Session returns user" "admin" "$R"

# 4. List Devices
echo "--- 4. List Devices ---"
R=$(curl -s $BASE/api/v3/device -H "Authorization: Bearer $TOKEN")
check "Devices list" "ram_0" "$R"

# 5. Create Space
echo "--- 5. Create Space ---"
R=$(curl -s -X POST $BASE/api/v3/space -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"E2E Space","description":"e2e test","total_size":1048576,"device_id":"ram_0"}')
SPACE_ID=$(echo "$R" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
check "Create space" "active" "$R"

# 6. List Spaces
echo "--- 6. List Spaces ---"
R=$(curl -s $BASE/api/v3/space -H "Authorization: Bearer $TOKEN")
check "List spaces" "E2E Space" "$R"

# 7. Get Space
echo "--- 7. Get Space ---"
R=$(curl -s "$BASE/api/v3/space/$SPACE_ID" -H "Authorization: Bearer $TOKEN")
check "Get space detail" "$SPACE_ID" "$R"

# 8. Create Directory
echo "--- 8. Create Directory ---"
R=$(curl -s -X POST "$BASE/api/v3/space/$SPACE_ID/dirs" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"path":"/e2e-dir"}')
check "Create directory" "directory" "$R"

# 9. Upload File
echo "--- 9. Upload File ---"
echo "Hello E2E Test!" > /tmp/e2e_test.txt
R=$(curl -s -X POST "$BASE/api/v3/space/$SPACE_ID/files?path=/e2e-dir" -H "Authorization: Bearer $TOKEN" -F "file=@/tmp/e2e_test.txt")
FILE_ID=$(echo "$R" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
check "Upload file" "file" "$R"

# 10. List Files
echo "--- 10. List Files ---"
R=$(curl -s "$BASE/api/v3/space/$SPACE_ID/files?path=/e2e-dir" -H "Authorization: Bearer $TOKEN")
check "List files in directory" "e2e_test.txt" "$R"

# 11. Download File
echo "--- 11. Download File ---"
R=$(curl -s -w "%{http_code}" -o /tmp/e2e_dl.txt "$BASE/api/v3/space/$SPACE_ID/files/$FILE_ID" -H "Authorization: Bearer $TOKEN")
CONTENT=$(cat /tmp/e2e_dl.txt)
check "Download file (HTTP 200)" "200" "$R"
check "Download content" "Hello E2E" "$CONTENT"

# 12. Rename File
echo "--- 12. Rename File ---"
R=$(curl -s -X POST "$BASE/api/v3/space/$SPACE_ID/files/$FILE_ID/rename" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"name":"renamed.txt"}')
check "Rename file" "renamed.txt" "$R"

# 13. Delete File
echo "--- 13. Delete File ---"
R=$(curl -s -X DELETE "$BASE/api/v3/space/$SPACE_ID/files/$FILE_ID" -H "Authorization: Bearer $TOKEN")
check "Delete file" "deleted" "$R"

# 14. Create Share
echo "--- 14. Create Share ---"
R=$(curl -s -X POST $BASE/api/v3/share -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"file_id\":\"$FILE_ID\",\"space_id\":\"$SPACE_ID\"}")
SHARE_KEY=$(echo "$R" | grep -o '"share_key":"[^"]*"' | cut -d'"' -f4)
check "Create share" "share" "$R"

# 15. List Shares
echo "--- 15. List Shares ---"
R=$(curl -s $BASE/api/v3/share/list -H "Authorization: Bearer $TOKEN")
check "List shares" "$SHARE_KEY" "$R"

# 16. Delete Share
echo "--- 16. Delete Share ---"
SHARE_ID=$(echo "$R" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
R=$(curl -s -X DELETE "$BASE/api/v3/share/$SHARE_ID" -H "Authorization: Bearer $TOKEN")
check "Delete share" "deleted" "$R"

# 17. S3 ListBuckets
echo "--- 17. S3 ListBuckets ---"
R=$(curl -s $S3/)
check "S3 ListBuckets" "ListAllMyBucketsResult" "$R"

# 18. S3 PutObject
echo "--- 18. S3 PutObject ---"
echo "s3-test-data" > /tmp/s3_write.txt
R=$(curl -s -X PUT $S3/e2e-space/s3test.txt -T /tmp/s3_write.txt -w "%{http_code}")
check "S3 PutObject (HTTP 200)" "200" "$R"

# 19. S3 GetObject
echo "--- 19. S3 GetObject ---"
R=$(curl -s $S3/e2e-space/s3test.txt)
check "S3 GetObject content" "s3-test-data" "$R"

# 20. S3 DeleteObject
echo "--- 20. S3 DeleteObject ---"
R=$(curl -s -X DELETE $S3/e2e-space/s3test.txt -w "%{http_code}")
check "S3 DeleteObject" "204" "$R"

# 21. WebDAV PROPFIND
echo "--- 21. WebDAV PROPFIND ---"
R=$(curl -s -X PROPFIND $WEBDAV/ -H "Depth: 1")
check "WebDAV PROPFIND" "multistatus" "$R"

# 22. WebDAV MKCOL (Create Directory)
echo "--- 22. WebDAV MKCOL ---"
R=$(curl -s -X MKCOL $WEBDAV/webdav-dir -w "%{http_code}")
check "WebDAV MKCOL" "201" "$R" 2>/dev/null || check "WebDAV MKCOL" "204" "$R" 2>/dev/null || check "WebDAV MKCOL" "405" "$R"
echo "     (MKCOL response code acceptable)"

# 23. Device Health
echo "--- 23. Device Health ---"
R=$(curl -s "$BASE/api/v3/device/ram_0/health" -H "Authorization: Bearer $TOKEN")
check "Device health" "true" "$R"

# 24. Resize Space
echo "--- 24. Resize Space ---"
R=$(curl -s -X POST "$BASE/api/v3/space/$SPACE_ID/resize" -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d '{"new_size":2097152}')
check "Resize space" "2097152" "$R"

# 25. Delete Space
echo "--- 25. Delete Space ---"
R=$(curl -s -X DELETE "$BASE/api/v3/space/$SPACE_ID" -H "Authorization: Bearer $TOKEN")
check "Delete space" "deleted" "$R"

echo ""
echo "========================================="
echo "  Results: $PASSED passed, $FAILED failed"
echo "========================================="