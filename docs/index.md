---
layout: home
hero:
  name: "Memesplora"
  text: "Memory & VRAM Filesystem"
  tagline: Use RAM and GPU VRAM as a high-speed file system with Cloudreve-style UI, S3 protocol, and WebDAV support
  image:
    src: /memesplora/logo.svg
    alt: Memesplora
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Architecture
      link: /architecture/overview
    - theme: alt
      text: GitHub
      link: https://github.com/Maicarons/memesplora

features:
  - icon: 🚀
    title: Blazing Fast
    details: RAM/VRAM-based storage with nanosecond-level latency, orders of magnitude faster than disk
  - icon: 🎮
    title: Multi-Device Support
    details: Supports system RAM and GPU VRAM (NVIDIA CUDA) with automatic device detection
  - icon: 📁
    title: File Management
    details: Cloudreve-inspired file manager with directory tree, drag-and-drop upload, and multi-format preview
  - icon: 🔌
    title: Multi-Protocol
    details: Native REST API + S3-compatible protocol + WebDAV for all use cases
  - icon: 🌙
    title: Dark Mode
    details: Built-in dark/light theme toggle with persistent preference
  - icon: 📦
    title: Single Binary
    details: Go backend compiled into one executable with embedded frontend
---