---
layout: home
hero:
  name: "Memesplora"
  text: "将内存/显存作为高速文件系统"
  tagline: 选择存储设备，创建自定义空间，以文件系统的方式管理内存数据
  image:
    src: /logo.svg
    alt: Memesplora
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 系统架构
      link: /architecture/overview
    - theme: alt
      text: GitHub
      link: https://github.com/memesplora/memesplora

features:
  - icon: 🚀
    title: 极致速度
    details: 基于内存/显存的存储，读写速度远超传统磁盘，延迟低至纳秒级
  - icon: 🎮
    title: 多设备支持
    details: 支持系统 RAM 和 GPU VRAM（NVIDIA CUDA），自动检测可用设备
  - icon: 📁
    title: 文件管理
    details: 类 Cloudreve 的文件管理界面，支持目录树、文件操作、拖拽上传
  - icon: 🔌
    title: 多协议支持
    details: 原生 REST API + S3 兼容协议 + WebDAV，满足所有使用场景
  - icon: 🔒
    title: 安全可靠
    details: JWT 认证、S3 签名验证、WebDAV 权限控制，数据安全有保障
  - icon: 📦
    title: 单文件部署
    details: Go 编译为单二进制，前端内嵌，一条命令即可运行
---