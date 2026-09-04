# Guía de desarrollo

## Estándares de código

- **Go**: Siga los [Comentarios de revisión de código de Go](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Siga la configuración recomendada de ESLint
- Use `gofmt` para el formateo de código Go
- Use `prettier` para el formateo de código frontend

## Seguridad de concurrencia

- Use `sync.RWMutex` para escenarios de mucha lectura
- Adquiera siempre los bloqueos en el mismo orden para prevenir interbloqueos
- Use `defer` para liberar bloqueos
- Evite llamar a interfaces externas mientras mantiene bloqueos

## Manejo de errores

```go
type AppError struct {
    Code    int    `json:"code"`
    Message string `json:"message"`
}
```

## Pruebas

- La cobertura de pruebas unitarias debe ser al menos del 80% para los módulos principales
- La capa de API necesita pruebas de integración
- Use la biblioteca estándar `testing`

## CI/CD

El proyecto usa GitHub Actions para CI/CD:

- **CI de Backend**: Compilar, probar y verificar al hacer push/PR
- **CI de Frontend**: Verificación de TypeScript y compilación
- **CI de Documentación**: Compilar y desplegar VitePress en GitHub Pages

Consulte [Configuración de CI/CD](/es/development/ci-cd) para más detalles.