# 贡献指南

## 开发规范

### 代码风格

- **Go**: 遵循官方 [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: 遵循 [ESLint Recommended](https://eslint.org/docs/rules/) 配置
- 使用 `gofmt` 格式化 Go 代码
- 使用 `prettier` 格式化前端代码

### 提交信息

```
<type>(<scope>): <subject>

<body>
```

类型包括：
- `feat`: 新功能
- `fix`: 修复
- `docs`: 文档
- `style`: 代码格式
- `refactor`: 重构
- `test`: 测试
- `chore`: 构建/工具

示例：
```
feat(device): 添加 GPU 显存设备检测
fix(fs): 修复目录递归删除时的死锁问题
docs(api): 更新 S3 协议文档
```

## 分支策略

- `main`: 稳定版本
- `develop`: 开发分支
- `feature/*`: 功能分支
- `fix/*`: 修复分支
- `release/*`: 发布分支

## 开发流程

1. Fork 项目
2. 创建功能分支 `git checkout -b feature/your-feature`
3. 提交代码
4. 运行测试 `make test`
5. 创建 Pull Request

## 测试要求

- 核心模块（device、fs）测试覆盖率不低于 80%
- API 层需要集成测试
- 提交前确保所有测试通过

## 代码审查

所有 PR 需要至少一位维护者 Review 通过后才能合并。审查重点：
- 内存安全问题
- 并发安全（锁的正确性）
- 错误处理完整性
- API 兼容性