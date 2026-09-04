import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Memesplora',
  description: 'Memory & VRAM Filesystem - Use RAM and GPU VRAM as a high-speed file system',
  lang: 'zh-CN',
  base: '/memesplora/',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/memesplora/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
    ['meta', { property: 'og:title', content: 'Memesplora' }],
    ['meta', { property: 'og:description', content: 'Memory & VRAM Filesystem - Use RAM and GPU VRAM as a high-speed file system with Cloudreve-style UI, S3 and WebDAV support' }],
    ['meta', { property: 'og:url', content: 'https://maicarons.github.io/memesplora/' }],
  ],

  themeConfig: {
    logo: '/memesplora/logo.svg',
    siteTitle: 'Memesplora',

    nav: [
      { text: '首页', link: '/' },
      { text: '架构指南', link: '/architecture/overview' },
      { text: 'API 文档', link: '/api/rest' },
      { text: '开发指南', link: '/guide/getting-started' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '项目结构', link: '/guide/project-structure' },
            { text: '环境搭建', link: '/guide/setup' },
            { text: '构建部署', link: '/guide/deployment' },
            { text: '贡献指南', link: '/guide/contributing' },
          ],
        },
      ],
      '/architecture/': [
        {
          text: '系统架构',
          items: [
            { text: '整体架构', link: '/architecture/overview' },
            { text: '设备管理层', link: '/architecture/device-layer' },
            { text: '内存文件系统', link: '/architecture/memory-fs' },
            { text: 'REST API', link: '/architecture/rest-api' },
            { text: 'S3 协议', link: '/architecture/s3-protocol' },
            { text: 'WebDAV 协议', link: '/architecture/webdav' },
            { text: '前端架构', link: '/architecture/frontend' },
            { text: '数据库设计', link: '/architecture/database' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: 'REST API', link: '/api/rest' },
            { text: 'S3 兼容 API', link: '/api/s3' },
            { text: 'WebDAV 协议', link: '/api/webdav' },
          ],
        },
      ],
      '/development/': [
        {
          text: '开发文档',
          items: [
            { text: '开发规范', link: '/development/standards' },
            { text: '测试指南', link: '/development/testing' },
            { text: '性能优化', link: '/development/performance' },
            { text: 'CI/CD 配置', link: '/development/ci-cd' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Maicarons/memesplora' },
    ],

    footer: {
      message: 'Apache License 2.0',
      copyright: 'Copyright © 2026 Memesplora Contributors',
    },

    editLink: {
      pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    lastUpdatedText: '最后更新',
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '目录',
      level: 'deep',
    },
  },
})