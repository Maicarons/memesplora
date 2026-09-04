# Panduan Pengembangan

## Standar Kode

- **Go**: Ikuti [Go Code Review Comments](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Ikuti konfigurasi ESLint yang direkomendasikan
- Gunakan `gofmt` untuk pemformatan kode Go
- Gunakan `prettier` untuk pemformatan kode frontend

## Keamanan Konkurensi

- Gunakan `sync.RWMutex` untuk skenario baca-berat
- Selalu ambil kunci dalam urutan yang sama untuk mencegah deadlock
- Gunakan `defer` untuk melepaskan kunci
- Hindari memanggil antarmuka eksternal sambil memegang kunci

## Penanganan Kesalahan

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## Pengujian

- Cakupan pengujian unit harus setidaknya 80% untuk modul inti
- Lapisan API memerlukan pengujian integrasi
- Gunakan pustaka standar `testing`

## CI/CD

Proyek ini menggunakan GitHub Actions untuk CI/CD:

- **Backend CI**: Build, test, dan vet pada push/PR
- **Frontend CI**: Pemeriksaan TypeScript dan build
- **Docs CI**: Build dan deploy VitePress ke GitHub Pages

Lihat [Konfigurasi CI/CD](/id/development/ci-cd) untuk detailnya.