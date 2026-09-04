---
layout: home
hero:
  name: "Memesplora"
  text: "Файловая система памяти и VRAM"
  tagline: Используйте RAM и GPU VRAM как высокоскоростную файловую систему с интерфейсом в стиле Cloudreve, поддержкой протокола S3 и WebDAV
  image:
    src: /memesplora/logo.svg
    alt: Memesplora
  actions:
    - theme: brand
      text: Начать
      link: /ru/guide/getting-started
    - theme: alt
      text: Архитектура
      link: /ru/architecture/overview
    - theme: alt
      text: GitHub
      link: https://github.com/Maicarons/memesplora

features:
  - icon: 🚀
    title: Молниеносная скорость
    details: Хранение на основе RAM/VRAM с задержкой на уровне наносекунд, на порядки быстрее диска
  - icon: 🎮
    title: Поддержка нескольких устройств
    details: Поддерживает системную RAM и GPU VRAM (NVIDIA CUDA) с автоматическим обнаружением устройств
  - icon: 📁
    title: Управление файлами
    details: Файловый менеджер в стиле Cloudreve с деревом каталогов, загрузкой перетаскиванием и предпросмотром множества форматов
  - icon: 🔌
    title: Мультипротокольность
    details: Нативный REST API + S3-совместимый протокол + WebDAV для всех сценариев использования
  - icon: 🌙
    title: Тёмная тема
    details: Встроенное переключение тёмной/светлой темы с сохранением предпочтений
  - icon: 📦
    title: Единый бинарный файл
    details: Бэкенд на Go, скомпилированный в один исполняемый файл со встроенным фронтендом
---