---
layout: home
hero:
  name: "Memesplora"
  text: "Système de fichiers memoire et VRAM"
  tagline: Utilisez la RAM et la VRAM GPU comme un système de fichiers haute vitesse avec interface Cloudreve, protocole S3 et support WebDAV
  image:
    src: /memesplora/logo.svg
    alt: Memesplora
  actions:
    - theme: brand
      text: Commencer
      link: /fr/guide/getting-started
    - theme: alt
      text: Architecture
      link: /fr/architecture/overview
    - theme: alt
      text: GitHub
      link: https://github.com/Maicarons/memesplora

features:
  - icon: 🚀
    title: Extrêmement rapide
    details: Stockage base sur la RAM/VRAM avec une latence de l'ordre de la nanoseconde, des ordres de grandeur plus rapide qu'un disque
  - icon: 🎮
    title: Support multi-peripheriques
    details: Prend en charge la RAM système et la VRAM GPU (NVIDIA CUDA) avec detection automatique des peripheriques
  - icon: 📁
    title: Gestion de fichiers
    details: Gestionnaire de fichiers inspire de Cloudreve avec arborescence, glisser-deposer et aperçu multi-format
  - icon: 🔌
    title: Multi-protocole
    details: API REST native + protocole compatible S3 + WebDAV pour tous les cas d'utilisation
  - icon: 🌙
    title: Mode sombre
    details: Basculateur integre theme sombre/clair avec preference persistante
  - icon: 📦
    title: Binaire unique
    details: Backend Go compile en un seul executable avec interface integree
---