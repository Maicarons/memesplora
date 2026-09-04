package s3

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"strings"
)

// SignatureV4Validator validates AWS Signature V4 requests
type SignatureV4Validator struct {
	accessKey string
	secretKey string
}

func NewSignatureV4Validator(accessKey, secretKey string) *SignatureV4Validator {
	return &SignatureV4Validator{
		accessKey: accessKey,
		secretKey: secretKey,
	}
}

func (v *SignatureV4Validator) Validate(r *http.Request) error {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		// Anonymous access allowed for now
		return nil
	}

	// Parse the Authorization header
	// Format: AWS4-HMAC-SHA256 Credential=AKID/20240101/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-date, Signature=...
	if !strings.HasPrefix(authHeader, "AWS4-HMAC-SHA256") {
		return fmt.Errorf("unsupported signature algorithm")
	}

	parts := strings.Split(authHeader, ", ")
	if len(parts) < 3 {
		return fmt.Errorf("invalid authorization header")
	}

	// Extract credential
	credParts := strings.Split(strings.TrimPrefix(parts[0], "AWS4-HMAC-SHA256 "), "/")
	if len(credParts) < 5 {
		return fmt.Errorf("invalid credential format")
	}

	_ = credParts[0] // access key
	_ = credParts[1] // date
	_ = credParts[2] // region
	_ = credParts[3] // service
	_ = credParts[4] // request type

	// Stub: In production, compute and verify the signature
	// For now, accept any request with valid format
	return nil
}

func (v *SignatureV4Validator) sign(key []byte, msg string) []byte {
	mac := hmac.New(sha256.New, key)
	mac.Write([]byte(msg))
	return mac.Sum(nil)
}

func (v *SignatureV4Validator) getSignatureKey(key, dateStamp, regionName, serviceName string) []byte {
	kDate := v.sign([]byte("AWS4"+key), dateStamp)
	kRegion := v.sign(kDate, regionName)
	kService := v.sign(kRegion, serviceName)
	kSigning := v.sign(kService, "aws4_request")
	return kSigning
}

func hashSHA256(data []byte) string {
	hash := sha256.Sum256(data)
	return hex.EncodeToString(hash[:])
}

// S3AuthMiddleware handles S3 authentication
func S3AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Stub: In production, validate AWS Signature V4
		// For development, allow all requests
		next.ServeHTTP(w, r)
	})
}