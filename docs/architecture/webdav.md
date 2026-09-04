# WebDAV 协议

## 概述

Memesplora 支持 WebDAV 协议，可以将存储空间映射为网络驱动器，在操作系统文件管理器中直接操作文件。

## 端口

WebDAV 服务监听在 `:5214` 端口。

## 认证

WebDAV 使用 HTTP Basic Auth 认证，用户名和密码为 Web 管理界面中的用户凭证。

## 支持的 WebDAV 方法

| 方法 | 说明 | 实现状态 |
|------|------|:--------:|
| PROPFIND | 获取资源属性和集合成员 | ✅ |
| PROPPATCH | 修改资源属性 | ✅ |
| MKCOL | 创建集合（目录） | ✅ |
| GET | 获取资源内容 | ✅ |
| PUT | 上传资源 | ✅ |
| DELETE | 删除资源 | ✅ |
| COPY | 复制资源 | ✅ |
| MOVE | 移动资源 | ✅ |
| LOCK | 锁定资源 | ✅ |
| UNLOCK | 解锁资源 | ✅ |
| OPTIONS | 获取支持的方法 | ✅ |

## 使用示例

### macOS Finder

```
菜单 > 前往 > 连接服务器
输入: http://localhost:5214
输入用户名和密码
```

### Windows 资源管理器

```
右键"此电脑" > 映射网络驱动器
输入: http://localhost:5214
勾选"使用其他凭据连接"
输入用户名和密码
```

### Linux

```bash
# 安装 davfs2
sudo apt install davfs2

# 挂载
sudo mount -t davfs http://localhost:5214 /mnt/memesplora

# 或使用 /etc/fstab 自动挂载
echo "http://localhost:5214 /mnt/memesplora davfs rw,user,noauto 0 0" | sudo tee -a /etc/fstab
```

### 使用 curl

```bash
# 列出目录
curl -X PROPFIND http://localhost:5214/ \
  -u username:password \
  -H "Depth: 1"

# 创建目录
curl -X MKCOL http://localhost:5214/new-folder \
  -u username:password

# 上传文件
curl -T file.txt http://localhost:5214/file.txt \
  -u username:password

# 下载文件
curl -o file.txt http://localhost:5214/file.txt \
  -u username:password
```

## 实现架构

WebDAV 使用 `golang.org/x/net/webdav` 包实现，核心是适配器模式：

```go
// 适配器：将内存文件系统适配为 webdav.FileSystem
type MemFSAdapter struct {
    mfs *fs.MemFileSystem
}

func (a *MemFSAdapter) Mkdir(ctx context.Context, name string, perm os.FileMode) error {
    return a.mfs.Mkdir(ctx, name, getOwnerID(ctx))
}

func (a *MemFSAdapter) OpenFile(ctx context.Context, name string, flag int, perm os.FileMode) (webdav.File, error) {
    return a.mfs.Open(ctx, name)
}

func (a *MemFSAdapter) RemoveAll(ctx context.Context, name string) error {
    return a.mfs.Delete(ctx, name)
}

func (a *MemFSAdapter) Rename(ctx context.Context, oldName, newName string) error {
    return a.mfs.Rename(ctx, oldName, newName)
}

func (a *MemFSAdapter) Stat(ctx context.Context, name string) (os.FileInfo, error) {
    info, err := a.mfs.Stat(ctx, name)
    if err != nil {
        return nil, err
    }
    return &memFileInfo{info}, nil
}
```

## 锁管理

WebDAV 锁用于防止并发写冲突：

- **排他锁**: 同一时间只有一个客户端可以修改资源
- **共享锁**: 多个客户端可以同时读，但不能写
- **锁超时**: 自动释放过期锁
- **锁令牌**: 用于标识和解锁

## 属性管理

WebDAV 支持两种属性：

- **Live Properties**: 动态计算，如文件大小、修改时间
- **Dead Properties**: 用户自定义的 XML 属性

## 注意事项

- 通过 WebDAV 创建的文件，在 Web 管理界面中实时可见
- 文件大小限制受空间配额控制
- 建议使用 HTTPS 保护 WebDAV 通信