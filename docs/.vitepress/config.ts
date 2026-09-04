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
        nav: [
          { text: 'होम', link: '/hi/' },
          { text: 'गाइड', link: '/hi/guide/getting-started' },
          { text: 'आर्किटेक्चर', link: '/hi/architecture/overview' },
          { text: 'एपीआई', link: '/hi/api/index' },
        ],
        sidebar: {
          '/hi/guide/': [{ text: 'गाइड', items: [
            { text: 'आरंभ करें', link: '/hi/guide/getting-started' },
            { text: 'प्रोजेक्ट संरचना', link: '/hi/guide/project-structure' },
            { text: 'सेटअप', link: '/hi/guide/setup' },
            { text: 'डिप्लॉयमेंट', link: '/hi/guide/deployment' },
            { text: 'योगदान', link: '/hi/guide/contributing' },
          ]}],
          '/hi/architecture/': [{ text: 'आर्किटेक्चर', items: [
            { text: 'अवलोकन', link: '/hi/architecture/overview' },
            { text: 'डिवाइस लेयर', link: '/hi/architecture/device-layer' },
            { text: 'मेमोरी फाइलसिस्टम', link: '/hi/architecture/memory-fs' },
            { text: 'REST API', link: '/hi/architecture/rest-api' },
            { text: 'S3 प्रोटोकॉल', link: '/hi/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/hi/architecture/webdav' },
            { text: 'फ्रंटएंड', link: '/hi/architecture/frontend' },
            { text: 'डेटाबेस', link: '/hi/architecture/database' },
          ]}],
          '/hi/api/': [{ text: 'एपीआई संदर्भ', items: [
            { text: 'REST API', link: '/hi/api/rest' },
            { text: 'S3 संगत API', link: '/hi/api/s3' },
            { text: 'WebDAV', link: '/hi/api/webdav' },
          ]}],
          '/hi/development/': [{ text: 'डेवलपमेंट', items: [
            { text: 'मानक', link: '/hi/development/standards' },
            { text: 'परीक्षण', link: '/hi/development/testing' },
            { text: 'प्रदर्शन', link: '/hi/development/performance' },
            { text: 'CI/CD', link: '/hi/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'GitHub पर संपादित करें' },
      },
    },
    es: {
      label: 'Español',
      lang: 'es',
      link: '/es/',
      themeConfig: {
        nav: [
          { text: 'Inicio', link: '/es/' },
          { text: 'Guía', link: '/es/guide/getting-started' },
          { text: 'Arquitectura', link: '/es/architecture/overview' },
          { text: 'API', link: '/es/api/index' },
        ],
        sidebar: {
          '/es/guide/': [{ text: 'Guía', items: [
            { text: 'Comenzar', link: '/es/guide/getting-started' },
            { text: 'Estructura', link: '/es/guide/project-structure' },
            { text: 'Configuración', link: '/es/guide/setup' },
            { text: 'Despliegue', link: '/es/guide/deployment' },
            { text: 'Contribuir', link: '/es/guide/contributing' },
          ]}],
          '/es/architecture/': [{ text: 'Arquitectura', items: [
            { text: 'Visión general', link: '/es/architecture/overview' },
            { text: 'Capa de dispositivo', link: '/es/architecture/device-layer' },
            { text: 'Sistema de archivos', link: '/es/architecture/memory-fs' },
            { text: 'REST API', link: '/es/architecture/rest-api' },
            { text: 'Protocolo S3', link: '/es/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/es/architecture/webdav' },
            { text: 'Frontend', link: '/es/architecture/frontend' },
            { text: 'Base de datos', link: '/es/architecture/database' },
          ]}],
          '/es/api/': [{ text: 'Referencia API', items: [
            { text: 'REST API', link: '/es/api/rest' },
            { text: 'API S3', link: '/es/api/s3' },
            { text: 'WebDAV', link: '/es/api/webdav' },
          ]}],
          '/es/development/': [{ text: 'Desarrollo', items: [
            { text: 'Estándares', link: '/es/development/standards' },
            { text: 'Pruebas', link: '/es/development/testing' },
            { text: 'Rendimiento', link: '/es/development/performance' },
            { text: 'CI/CD', link: '/es/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'Editar en GitHub' },
      },
    },
    ar: {
      label: 'العربية',
      lang: 'ar',
      link: '/ar/',
      themeConfig: {
        nav: [
          { text: 'الرئيسية', link: '/ar/' },
          { text: 'دليل', link: '/ar/guide/getting-started' },
          { text: 'الهندسة', link: '/ar/architecture/overview' },
          { text: 'API', link: '/ar/api/index' },
        ],
        sidebar: {
          '/ar/guide/': [{ text: 'الدليل', items: [
            { text: 'ابدأ', link: '/ar/guide/getting-started' },
            { text: 'هيكل المشروع', link: '/ar/guide/project-structure' },
            { text: 'الإعداد', link: '/ar/guide/setup' },
            { text: 'النشر', link: '/ar/guide/deployment' },
            { text: 'المساهمة', link: '/ar/guide/contributing' },
          ]}],
          '/ar/architecture/': [{ text: 'الهندسة', items: [
            { text: 'نظرة عامة', link: '/ar/architecture/overview' },
            { text: 'طبقة الجهاز', link: '/ar/architecture/device-layer' },
            { text: 'نظام الملفات', link: '/ar/architecture/memory-fs' },
            { text: 'REST API', link: '/ar/architecture/rest-api' },
            { text: 'بروتوكول S3', link: '/ar/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/ar/architecture/webdav' },
            { text: 'الواجهة الأمامية', link: '/ar/architecture/frontend' },
            { text: 'قاعدة البيانات', link: '/ar/architecture/database' },
          ]}],
          '/ar/api/': [{ text: 'مرجع API', items: [
            { text: 'REST API', link: '/ar/api/rest' },
            { text: 'API S3', link: '/ar/api/s3' },
            { text: 'WebDAV', link: '/ar/api/webdav' },
          ]}],
          '/ar/development/': [{ text: 'التطوير', items: [
            { text: 'المعايير', link: '/ar/development/standards' },
            { text: 'الاختبار', link: '/ar/development/testing' },
            { text: 'الأداء', link: '/ar/development/performance' },
            { text: 'CI/CD', link: '/ar/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'تحرير على GitHub' },
      },
    },
    fr: {
      label: 'Français',
      lang: 'fr',
      link: '/fr/',
      themeConfig: {
        nav: [
          { text: 'Accueil', link: '/fr/' },
          { text: 'Guide', link: '/fr/guide/getting-started' },
          { text: 'Architecture', link: '/fr/architecture/overview' },
          { text: 'API', link: '/fr/api/index' },
        ],
        sidebar: {
          '/fr/guide/': [{ text: 'Guide', items: [
            { text: 'Démarrer', link: '/fr/guide/getting-started' },
            { text: 'Structure', link: '/fr/guide/project-structure' },
            { text: 'Configuration', link: '/fr/guide/setup' },
            { text: 'Déploiement', link: '/fr/guide/deployment' },
            { text: 'Contribuer', link: '/fr/guide/contributing' },
          ]}],
          '/fr/architecture/': [{ text: 'Architecture', items: [
            { text: 'Aperçu', link: '/fr/architecture/overview' },
            { text: 'Couche périphérique', link: '/fr/architecture/device-layer' },
            { text: 'Système de fichiers', link: '/fr/architecture/memory-fs' },
            { text: 'REST API', link: '/fr/architecture/rest-api' },
            { text: 'Protocole S3', link: '/fr/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/fr/architecture/webdav' },
            { text: 'Frontend', link: '/fr/architecture/frontend' },
            { text: 'Base de données', link: '/fr/architecture/database' },
          ]}],
          '/fr/api/': [{ text: 'Référence API', items: [
            { text: 'REST API', link: '/fr/api/rest' },
            { text: 'API S3', link: '/fr/api/s3' },
            { text: 'WebDAV', link: '/fr/api/webdav' },
          ]}],
          '/fr/development/': [{ text: 'Développement', items: [
            { text: 'Normes', link: '/fr/development/standards' },
            { text: 'Tests', link: '/fr/development/testing' },
            { text: 'Performance', link: '/fr/development/performance' },
            { text: 'CI/CD', link: '/fr/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'Modifier sur GitHub' },
      },
    },
    bn: {
      label: 'বাংলা',
      lang: 'bn',
      link: '/bn/',
      themeConfig: {
        nav: [
          { text: 'হোম', link: '/bn/' },
          { text: 'গাইড', link: '/bn/guide/getting-started' },
          { text: 'আর্কিটেকচার', link: '/bn/architecture/overview' },
          { text: 'এপিআই', link: '/bn/api/index' },
        ],
        sidebar: {
          '/bn/guide/': [{ text: 'গাইড', items: [
            { text: 'শুরু করুন', link: '/bn/guide/getting-started' },
            { text: 'প্রজেক্ট স্ট্রাকচার', link: '/bn/guide/project-structure' },
            { text: 'সেটআপ', link: '/bn/guide/setup' },
            { text: 'ডিপ্লয়', link: '/bn/guide/deployment' },
            { text: 'অবদান', link: '/bn/guide/contributing' },
          ]}],
          '/bn/architecture/': [{ text: 'আর্কিটেকচার', items: [
            { text: 'ওভারভিউ', link: '/bn/architecture/overview' },
            { text: 'ডিভাইস লেয়ার', link: '/bn/architecture/device-layer' },
            { text: 'মেমোরি ফাইলসিস্টেম', link: '/bn/architecture/memory-fs' },
            { text: 'REST API', link: '/bn/architecture/rest-api' },
            { text: 'S3 প্রোটোকল', link: '/bn/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/bn/architecture/webdav' },
            { text: 'ফ্রন্টএন্ড', link: '/bn/architecture/frontend' },
            { text: 'ডাটাবেস', link: '/bn/architecture/database' },
          ]}],
          '/bn/api/': [{ text: 'এপিআই রেফারেন্স', items: [
            { text: 'REST API', link: '/bn/api/rest' },
            { text: 'S3 API', link: '/bn/api/s3' },
            { text: 'WebDAV', link: '/bn/api/webdav' },
          ]}],
          '/bn/development/': [{ text: 'ডেভেলপমেন্ট', items: [
            { text: 'স্ট্যান্ডার্ড', link: '/bn/development/standards' },
            { text: 'টেস্টিং', link: '/bn/development/testing' },
            { text: 'পারফরম্যান্স', link: '/bn/development/performance' },
            { text: 'CI/CD', link: '/bn/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'GitHub এ সম্পাদনা করুন' },
      },
    },
    pt: {
      label: 'Português',
      lang: 'pt',
      link: '/pt/',
      themeConfig: {
        nav: [
          { text: 'Início', link: '/pt/' },
          { text: 'Guia', link: '/pt/guide/getting-started' },
          { text: 'Arquitetura', link: '/pt/architecture/overview' },
          { text: 'API', link: '/pt/api/index' },
        ],
        sidebar: {
          '/pt/guide/': [{ text: 'Guia', items: [
            { text: 'Começar', link: '/pt/guide/getting-started' },
            { text: 'Estrutura', link: '/pt/guide/project-structure' },
            { text: 'Configuração', link: '/pt/guide/setup' },
            { text: 'Implantação', link: '/pt/guide/deployment' },
            { text: 'Contribuir', link: '/pt/guide/contributing' },
          ]}],
          '/pt/architecture/': [{ text: 'Arquitetura', items: [
            { text: 'Visão geral', link: '/pt/architecture/overview' },
            { text: 'Camada de dispositivo', link: '/pt/architecture/device-layer' },
            { text: 'Sistema de arquivos', link: '/pt/architecture/memory-fs' },
            { text: 'REST API', link: '/pt/architecture/rest-api' },
            { text: 'Protocolo S3', link: '/pt/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/pt/architecture/webdav' },
            { text: 'Frontend', link: '/pt/architecture/frontend' },
            { text: 'Banco de dados', link: '/pt/architecture/database' },
          ]}],
          '/pt/api/': [{ text: 'Referência API', items: [
            { text: 'REST API', link: '/pt/api/rest' },
            { text: 'API S3', link: '/pt/api/s3' },
            { text: 'WebDAV', link: '/pt/api/webdav' },
          ]}],
          '/pt/development/': [{ text: 'Desenvolvimento', items: [
            { text: 'Padrões', link: '/pt/development/standards' },
            { text: 'Testes', link: '/pt/development/testing' },
            { text: 'Performance', link: '/pt/development/performance' },
            { text: 'CI/CD', link: '/pt/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'Editar no GitHub' },
      },
    },
    ru: {
      label: 'Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Руководство', link: '/ru/guide/getting-started' },
          { text: 'Архитектура', link: '/ru/architecture/overview' },
          { text: 'API', link: '/ru/api/index' },
        ],
        sidebar: {
          '/ru/guide/': [{ text: 'Руководство', items: [
            { text: 'Начало', link: '/ru/guide/getting-started' },
            { text: 'Структура', link: '/ru/guide/project-structure' },
            { text: 'Настройка', link: '/ru/guide/setup' },
            { text: 'Развертывание', link: '/ru/guide/deployment' },
            { text: 'Участие', link: '/ru/guide/contributing' },
          ]}],
          '/ru/architecture/': [{ text: 'Архитектура', items: [
            { text: 'Обзор', link: '/ru/architecture/overview' },
            { text: 'Уровень устройств', link: '/ru/architecture/device-layer' },
            { text: 'Файловая система', link: '/ru/architecture/memory-fs' },
            { text: 'REST API', link: '/ru/architecture/rest-api' },
            { text: 'Протокол S3', link: '/ru/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/ru/architecture/webdav' },
            { text: 'Фронтенд', link: '/ru/architecture/frontend' },
            { text: 'База данных', link: '/ru/architecture/database' },
          ]}],
          '/ru/api/': [{ text: 'Справочник API', items: [
            { text: 'REST API', link: '/ru/api/rest' },
            { text: 'API S3', link: '/ru/api/s3' },
            { text: 'WebDAV', link: '/ru/api/webdav' },
          ]}],
          '/ru/development/': [{ text: 'Разработка', items: [
            { text: 'Стандарты', link: '/ru/development/standards' },
            { text: 'Тестирование', link: '/ru/development/testing' },
            { text: 'Производительность', link: '/ru/development/performance' },
            { text: 'CI/CD', link: '/ru/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'Редактировать на GitHub' },
      },
    },
    id: {
      label: 'Bahasa Indonesia',
      lang: 'id',
      link: '/id/',
      themeConfig: {
        nav: [
          { text: 'Beranda', link: '/id/' },
          { text: 'Panduan', link: '/id/guide/getting-started' },
          { text: 'Arsitektur', link: '/id/architecture/overview' },
          { text: 'API', link: '/id/api/index' },
        ],
        sidebar: {
          '/id/guide/': [{ text: 'Panduan', items: [
            { text: 'Memulai', link: '/id/guide/getting-started' },
            { text: 'Struktur Proyek', link: '/id/guide/project-structure' },
            { text: 'Pengaturan', link: '/id/guide/setup' },
            { text: 'Deployment', link: '/id/guide/deployment' },
            { text: 'Berkontribusi', link: '/id/guide/contributing' },
          ]}],
          '/id/architecture/': [{ text: 'Arsitektur', items: [
            { text: 'Ikhtisar', link: '/id/architecture/overview' },
            { text: 'Lapisan Perangkat', link: '/id/architecture/device-layer' },
            { text: 'Sistem File Memori', link: '/id/architecture/memory-fs' },
            { text: 'REST API', link: '/id/architecture/rest-api' },
            { text: 'Protokol S3', link: '/id/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/id/architecture/webdav' },
            { text: 'Frontend', link: '/id/architecture/frontend' },
            { text: 'Database', link: '/id/architecture/database' },
          ]}],
          '/id/api/': [{ text: 'Referensi API', items: [
            { text: 'REST API', link: '/id/api/rest' },
            { text: 'API S3', link: '/id/api/s3' },
            { text: 'WebDAV', link: '/id/api/webdav' },
          ]}],
          '/id/development/': [{ text: 'Pengembangan', items: [
            { text: 'Standar', link: '/id/development/standards' },
            { text: 'Pengujian', link: '/id/development/testing' },
            { text: 'Kinerja', link: '/id/development/performance' },
            { text: 'CI/CD', link: '/id/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'Edit di GitHub' },
      },
    },
    ko: {
      label: '한국어',
      lang: 'ko',
      link: '/ko/',
      themeConfig: {
        nav: [
          { text: '홈', link: '/ko/' },
          { text: '가이드', link: '/ko/guide/getting-started' },
          { text: '아키텍처', link: '/ko/architecture/overview' },
          { text: 'API', link: '/ko/api/index' },
        ],
        sidebar: {
          '/ko/guide/': [{ text: '가이드', items: [
            { text: '시작하기', link: '/ko/guide/getting-started' },
            { text: '프로젝트 구조', link: '/ko/guide/project-structure' },
            { text: '설정', link: '/ko/guide/setup' },
            { text: '배포', link: '/ko/guide/deployment' },
            { text: '기여하기', link: '/ko/guide/contributing' },
          ]}],
          '/ko/architecture/': [{ text: '아키텍처', items: [
            { text: '개요', link: '/ko/architecture/overview' },
            { text: '디바이스 레이어', link: '/ko/architecture/device-layer' },
            { text: '메모리 파일시스템', link: '/ko/architecture/memory-fs' },
            { text: 'REST API', link: '/ko/architecture/rest-api' },
            { text: 'S3 프로토콜', link: '/ko/architecture/s3-protocol' },
            { text: 'WebDAV', link: '/ko/architecture/webdav' },
            { text: '프론트엔드', link: '/ko/architecture/frontend' },
            { text: '데이터베이스', link: '/ko/architecture/database' },
          ]}],
          '/ko/api/': [{ text: 'API 참조', items: [
            { text: 'REST API', link: '/ko/api/rest' },
            { text: 'S3 호환 API', link: '/ko/api/s3' },
            { text: 'WebDAV', link: '/ko/api/webdav' },
          ]}],
          '/ko/development/': [{ text: '개발', items: [
            { text: '표준', link: '/ko/development/standards' },
            { text: '테스트', link: '/ko/development/testing' },
            { text: '성능', link: '/ko/development/performance' },
            { text: 'CI/CD', link: '/ko/development/ci-cd' },
          ]}],
        },
        footer: { message: 'Apache License 2.0', copyright: 'Copyright © 2026 Memesplora Contributors' },
        editLink: { pattern: 'https://github.com/Maicarons/memesplora/edit/master/docs/:path', text: 'GitHub에서 편집' },
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