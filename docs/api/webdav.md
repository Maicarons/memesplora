# WebDAV 协议参考

## 概述

Memesplora 支持 WebDAV 协议，可以将存储空间映射为网络驱动器，在操作系统文件管理器中直接操作文件。

## 端点

**WebDAV 地址**: `http://localhost:5214`

## 认证

WebDAV 使用 HTTP Basic Auth 认证。

## 支持的方法

| 方法 | 说明 |
|------|------|
| PROPFIND | 获取资源属性和集合成员 |
| PROPPATCH | 修改资源属性 |
| MKCOL | 创建集合（目录） |
| GET | 获取资源内容 |
| PUT | 上传资源 |
| DELETE | 删除资源 |
| COPY | 复制资源 |
| MOVE | 移动资源 |
| LOCK | 锁定资源 |
| UNLOCK | 解锁资源 |

## 使用示例

### macOS Finder

```
菜单 > 前往 > 连接服务器
输入: http://localhost:5214
```

### Windows 资源管理器

```
右键"此电脑" > 映射网络驱动器
输入: http://localhost:5214
```

### Linux

```bash
sudo mount -t davfs http://localhost:5214 /mnt/memesplora
```

### curl

```bash
# 列出目录
curl -X PROPFIND http://localhost:5214/ -H "Depth: 1"

# 创建目录
curl -X MKCOL http://localhost:5214/new-folder

# 上传文件
curl -T file.txt http://localhost:5214/file.txt
```

## 架构详情

请参阅 [WebDAV 协议架构](/memesplora/architecture/webdav) 了解详细设计。