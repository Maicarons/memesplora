import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Memesplora',
  description: 'Memory & VRAM Filesystem - Use RAM and GPU VRAM as a high-speed file system',
  lang: 'en-US',
  base: '/memesplora/',
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: 'icon', href: '/memesplora/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#1677ff' }],
    ['meta', { property: 'og:title', content: 'Memesplora' }],
    ['meta', { property: 'og:description', content: 'Memory & VRAM Filesystem - Use RAM and GPU VRAM as a high-speed file system with Cloudreve-style UI, S3 and WebDAV support' }],
    ['meta', { property: 'og:url', content: 'https://maicarons.github.io/memesplora/' }],
  ],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Guide', link: '/guide/getting-started' },
          { text: 'Architecture', link: '/architecture/overview' },
          { text: 'API', link: '/api/index' },
        ],
        sidebar: {
          '/guide/': [
            { text: 'Guide', items: [
              { text: 'Getting Started', link: '/guide/getting-started' },
              { text: 'Project Structure', link: '/guide/project-structure' },
              { text: 'Setup', link: '/guide/setup' },
              { text: 'Deployment', link: '/guide/deployment' },
              { text: 'Contributing', link: '/guide/contributing' },
            ]},
          ],
          '/architecture/': [
            { text: 'Architecture', items: [
              { text: 'Overview', link: '/architecture/overview' },
              { text: 'Device Layer', link: '/architecture/device-layer' },
              { text: 'Memory Filesystem', link: '/architecture/memory-fs' },
              { text: 'REST API', link: '/architecture/rest-api' },
              { text: 'S3 Protocol', link: '/architecture/s3-protocol' },
              { text: 'WebDAV', link: '/architecture/webdav' },
              { text: 'Frontend', link: '/architecture/frontend' },
              { text: 'Database', link: '/architecture/database' },
            ]},
          ],
          '/api/': [
            { text: 'API Reference', items: [
              { text: 'REST API', link: '/api/rest' },
              { text: 'S3 Compatible API', link: '/api/s3' },
              { text: 'WebDAV', link: '/api/webdav' },
            ]},
          ],
          '/development/': [
            { text: 'Development', items: [
              { text: 'Standards', link: '/development/standards' },
              { text: 'Testing', link: '/development/testing' },
              { text: 'Performance', link: '/development/performance' },
              { text: 'CI/CD', link: '/development/ci-cd' },
            ]},
          ],
        },
        footer: {
          message: 'Apache License 2.0',
          copyright: 'Copyright © 2026 Memesplora Contributors',
        },
        editLink: {
          pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path',
          text: 'Edit this page on GitHub',
        },
      },
    },
    'zh-CN': {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh-CN/',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh-CN/' },
          { text: '指南', link: '/zh-CN/guide/getting-started' },
          { text: '架构', link: '/zh-CN/architecture/overview' },
          { text: 'API', link: '/zh-CN/api/index' },
        ],
        sidebar: {
          '/zh-CN/guide/': [
            { text: '指南', items: [
              { text: '快速开始', link: '/zh-CN/guide/getting-started' },
              { text: '项目结构', link: '/zh-CN/guide/project-structure' },
              { text: '环境搭建', link: '/zh-CN/guide/setup' },
              { text: '构建部署', link: '/zh-CN/guide/deployment' },
              { text: '贡献指南', link: '/zh-CN/guide/contributing' },
            ]},
          ],
          '/zh-CN/architecture/': [
            { text: '系统架构', items: [
              { text: '整体架构', link: '/zh-CN/architecture/overview' },
              { text: '设备管理层', link: '/zh-CN/architecture/device-layer' },
              { text: '内存文件系统', link: '/zh-CN/architecture/memory-fs' },
              { text: 'REST API', link: '/zh-CN/architecture/rest-api' },
              { text: 'S3 协议', link: '/zh-CN/architecture/s3-protocol' },
              { text: 'WebDAV 协议', link: '/zh-CN/architecture/webdav' },
              { text: '前端架构', link: '/zh-CN/architecture/frontend' },
              { text: '数据库设计', link: '/zh-CN/architecture/database' },
            ]},
          ],
          '/zh-CN/api/': [
            { text: 'API 参考', items: [
              { text: 'REST API', link: '/zh-CN/api/rest' },
              { text: 'S3 兼容 API', link: '/zh-CN/api/s3' },
              { text: 'WebDAV 协议', link: '/zh-CN/api/webdav' },
            ]},
          ],
          '/zh-CN/development/': [
            { text: '开发文档', items: [
              { text: '开发规范', link: '/zh-CN/development/standards' },
              { text: '测试指南', link: '/zh-CN/development/testing' },
              { text: '性能优化', link: '/zh-CN/development/performance' },
              { text: 'CI/CD 配置', link: '/zh-CN/development/ci-cd' },
            ]},
          ],
        },
        footer: {
          message: 'Apache License 2.0',
          copyright: 'Copyright © 2026 Memesplora Contributors',
        },
        editLink: {
          pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path',
          text: '在 GitHub 上编辑此页',
        },
      },
    },
    hi: {
      label: 'हिन्दी',
      lang: 'hi',
      link: '/hi/',
      themeConfig: {
        nav: [{ text: 'होम', link: '/hi/' }],
        sidebar: {},
      },
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: {
        nav: [{ text: 'Inicio', link: '/es/' }],
        sidebar: {},
      },
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      link: '/ar/',
      themeConfig: {
        nav: [{ text: 'الرئيسية', link: '/ar/' }],
        sidebar: {},
      },
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/',
      themeConfig: {
        nav: [{ text: 'Accueil', link: '/fr/' }],
        sidebar: {},
      },
    },
    bn: {
      label: 'বাংলা',
      lang: 'bn',
      link: '/bn/',
      themeConfig: {
        nav: [{ text: 'হোম', link: '/bn/' }],
        sidebar: {},
      },
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      link: '/pt/',
      themeConfig: {
        nav: [{ text: 'Início', link: '/pt/' }],
        sidebar: {},
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: [{ text: 'Главная', link: '/ru/' }],
        sidebar: {},
      },
    },
    id: {
      label: 'Bahasa Indonesia',
      lang: 'id',
      link: '/id/',
      themeConfig: {
        nav: [{ text: 'Beranda', link: '/id/' }],
        sidebar: {},
      },
    },
    ko: {
      label: '한국어',
      lang: 'ko',
      link: '/ko/',
      themeConfig: {
        nav: [{ text: '홈', link: '/ko/' }],
        sidebar: {},
      },
    },
  },

  themeConfig: {
    logo: '/memesplora/logo.svg',
    siteTitle: 'Memesplora',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Maicarons/memesplora' },
    ],
    lastUpdatedText: 'Last updated',
    docFooter: {
      prev: 'Previous',
      next: 'Next',
    },
    outline: {
      label: 'On this page',
      level: 'deep',
    },
  },
})