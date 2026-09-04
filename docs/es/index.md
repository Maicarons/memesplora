---
layout: home
hero:
  name: "Memesplora"
  text: "Sistema de archivos de memoria y VRAM"
  tagline: Usa RAM y VRAM de GPU como un sistema de archivos de alta velocidad con interfaz estilo Cloudreve, protocolo S3 y soporte WebDAV
  image:
    src: /memesplora/logo.svg
    alt: Memesplora
  actions:
    - theme: brand
      text: Comenzar
      link: /es/guide/getting-started
    - theme: alt
      text: Arquitectura
      link: /es/architecture/overview
    - theme: alt
      text: GitHub
      link: https://github.com/Maicarons/memesplora

features:
  - icon: 🚀
    title: Extremadamente rápido
    details: Almacenamiento basado en RAM/VRAM con latencia de nanosegundos, órdenes de magnitud más rápido que el disco
  - icon: 🎮
    title: Soporte multi-dispositivo
    details: Soporta RAM del sistema y VRAM de GPU (NVIDIA CUDA) con detección automática de dispositivos
  - icon: 📁
    title: Gestión de archivos
    details: Gestor de archivos inspirado en Cloudreve con árbol de directorios, carga por arrastrar y soltar, y vista previa multi-formato
  - icon: 🔌
    title: Multi-protocolo
    details: API REST nativa + protocolo compatible con S3 + WebDAV para todos los casos de uso
  - icon: 🌙
    title: Modo oscuro
    details: Alternancia de tema oscuro/claro integrada con preferencia persistente
  - icon: 📦
    title: Binario único
    details: Backend en Go compilado en un solo ejecutable con frontend incorporado
---