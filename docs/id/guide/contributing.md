# Berkontribusi

## Gaya Kode

- **Go**: Ikuti [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Ikuti aturan ESLint
- Gunakan `gofmt` dan `prettier` untuk pemformatan

## Format Pesan Commit

```
<type>(<scope>): <subject>

<body>
```

Tipe: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Strategi Cabang

- `main`: Rilis stabil
- `develop`: Cabang pengembangan
- `feature/*`: Cabang fitur
- `fix/*`: Perbaikan bug

## Proses Pull Request

1. Fork repositori
2. Buat cabang fitur: `git checkout -b feature/fitur-anda`
3. Commit perubahan Anda
4. Jalankan tes: `make test`
5. Buat Pull Request

## Tinjauan Kode

Semua PR memerlukan setidaknya satu tinjauan maintainer. Area fokus:
- Keamanan memori
- Keamanan konkurensi (kebenaran kunci)
- Kelengkapan penanganan kesalahan
- Kompatibilitas API