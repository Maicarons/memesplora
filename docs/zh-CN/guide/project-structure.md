# 项目结构

```
memesplora/
├── backend/                          # Go 后端
│   ├── cmd/
│   │   └── server/
│   │       └── main.go              # 程序入口
│   ├── internal/
│   │   ├── device/                   # 设备管理层
│   │   │   ├── device.go            # 设备接口定义
│   │   │   ├── ram.go               # RAM 设备实现
│   │   │   ├── ram_windows.go       # Windows RAM 实现
│   │   │   ├── ram_linux.go         # Linux RAM 实现
│   │   │   ├── vram.go              # VRAM 设备实现
│   │   │   ├── vram_cuda.go         # CUDA 显存管理
│   │   │   ├── vram_nvml.go         # NVML GPU 信息
│   │   │   ├── detector.go          # 设备检测接口
│   │   │   ├── detector_windows.go
│   │   │   └── detector_linux.go
│   │   ├── fs/                       # 内存文件系统
│   │   │   ├── filesystem.go        # 文件系统接口
│   │   │   ├── memfs.go             # 核心实现
│   │   │   ├── inode.go             # Inode 管理
│   │   │   ├── block.go             # 数据块管理
│   │   │   ├── dir.go               # 目录操作
│   │   │   ├── file.go              # 文件操作
│   │   │   └── path.go              # 路径工具
│   │   ├── api/                      # REST API 层
│   │   │   ├── router.go            # 路由注册
│   │   │   ├── middleware/
│   │   │   │   ├── auth.go          # JWT 认证
│   │   │   │   ├── cors.go          # CORS
│   │   │   │   ├── ratelimit.go     # 限流
│   │   │   │   └── logger.go        # 日志
│   │   │   └── handler/
│   │   │       ├── auth.go          # 认证处理器
│   │   │       ├── file.go          # 文件处理器
│   │   │       ├── space.go         # 空间处理器
│   │   │       ├── device.go        # 设备处理器
│   │   │       ├── share.go         # 分享处理器
│   │   │       └── admin.go         # 管理处理器
│   │   ├── s3/                       # S3 兼容 API
│   │   │   ├── handler.go           # 请求入口
│   │   │   ├── bucket.go            # Bucket 操作
│   │   │   ├── object.go            # 对象操作
│   │   │   ├── multipart.go         # 分段上传
│   │   │   ├── signature.go         # 签名验证
│   │   │   ├── error.go             # 错误类型
│   │   │   └── xml.go               # XML 响应
│   │   ├── webdav/                   # WebDAV
│   │   │   ├── webdav.go            # WebDAV 处理器
│   │   │   ├── memfs_adapter.go     # 适配器
│   │   │   └── lock.go              # 锁管理
│   │   ├── service/                  # 业务逻辑
│   │   │   ├── auth.go
│   │   │   ├── file.go
│   │   │   ├── space.go
│   │   │   ├── device.go
│   │   │   ├── share.go
│   │   │   └── admin.go
│   │   ├── model/                    # 数据模型
│   │   │   ├── ent/schema/
│   │   │   │   ├── user.go
│   │   │   │   ├── space.go
│   │   │   │   ├── file.go
│   │   │   │   └── share.go
│   │   │   └── dto/
│   │   │       ├── request.go
│   │   │       └── response.go
│   │   └── config/
│   │       ├── config.go
│   │       └── config.yaml
│   ├── pkg/
│   │   ├── crypto/                   # 加密工具
│   │   ├── util/                     # 通用工具
│   │   └── logger/                   # 日志工具
│   ├── web/                          # 前端静态文件
│   ├── Dockerfile
│   ├── go.mod
│   └── go.sum
│
├── frontend/                         # React 前端
│   ├── src/
│   │   ├── api/                      # API 调用层
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── files.ts
│   │   │   ├── spaces.ts
│   │   │   ├── devices.ts
│   │   │   └── shares.ts
│   │   ├── components/               # 组件
│   │   │   ├── Layout/               # 布局组件
│   │   │   ├── File/                 # 文件组件
│   │   │   ├── Device/               # 设备组件
│   │   │   ├── Share/                # 分享组件
│   │   │   └── Common/               # 通用组件
│   │   ├── pages/                    # 页面
│   │   ├── stores/                   # 状态管理
│   │   ├── hooks/                    # 自定义 Hooks
│   │   ├── types/                    # TypeScript 类型
│   │   └── utils/                    # 工具函数
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── docs/                             # VitePress 文档
│   ├── .vitepress/
│   │   └── config.ts
│   ├── guide/
│   ├── architecture/
│   ├── api/
│   └── index.md
│
├── scripts/                          # 脚本
├── Dockerfile
├── docker-compose.yml
├── Makefile
└── README.md
```