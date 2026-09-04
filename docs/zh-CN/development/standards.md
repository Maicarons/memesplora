# 开发规范

## 代码规范

### Go 后端

- 遵循 [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- 使用 `gofmt` 格式化代码
- 变量命名使用驼峰式
- 错误处理：永远不要忽略错误
- 接口命名：`-er` 后缀（如 `Reader`、`Writer`）

### TypeScript/React 前端

- 遵循 ESLint 推荐配置
- 使用 TypeScript 严格模式
- 组件使用函数式组件 + Hooks
- 命名规范：
  - 组件文件：PascalCase（如 `FileList.tsx`）
  - 工具文件：camelCase（如 `format.ts`）
  - 类型文件：camelCase（如 `api.ts`）

## 并发安全

### 锁使用规范

1. 优先使用 `sync.RWMutex`，读多写少场景
2. 始终按相同顺序获取锁，避免死锁
3. 使用 `defer` 释放锁
4. 避免在持有锁时调用外部接口

```go
// 正确
mu.Lock()
defer mu.Unlock()
// 操作共享资源

// 错误：可能导致死锁
mu.Lock()
anotherMu.Lock() // 如果其他地方以相反顺序获取，死锁
```

## 错误处理

### Go 错误处理

```go
// 自定义错误类型
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
    Err     error  `json:"-"`
}

func (e *AppError) Error() string {
    return e.Message
}

// 统一错误返回
func handleError(c *gin.Context, err error) {
    if appErr, ok := err.(*AppError); ok {
        c.JSON(400, gin.H{
            "code":    appErr.Code,
            "message": appErr.Message,
        })
        return
    }
    c.JSON(500, gin.H{
        "code":    50001,
        "message": "服务器内部错误",
    })
}
```

## 日志规范

```go
// 日志级别
log.Info("文件上传成功", "path", path, "size", size)
log.Warn("磁盘空间不足", "device", deviceID, "free", freeSize)
log.Error("设备分配失败", "device", deviceID, "error", err)
```

## 测试规范

- 单元测试覆盖率不低于 80%
- 核心模块（device、fs）需要全面测试
- API 层需要集成测试
- 使用 `testing` 标准库
- 测试文件命名：`*_test.go`