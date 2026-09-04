# Contribuir

## Estilo de código

- **Go**: Siga los [Comentarios de revisión de código de Go](https://go.dev/wiki/CodeReviewComments)
- **TypeScript/React**: Siga las reglas de ESLint
- Use `gofmt` y `prettier` para el formateo

## Formato de mensajes de confirmación

```
<tipo>(<ámbito>): <asunto>

<cuerpo>
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

## Estrategia de ramas

- `main`: Versiones estables
- `develop`: Rama de desarrollo
- `feature/*`: Ramas de funcionalidades
- `fix/*`: Correcciones de errores

## Proceso de solicitudes de extracción (Pull Request)

1. Haga un fork del repositorio
2. Cree una rama de funcionalidad: `git checkout -b feature/su-funcionalidad`
3. Confirme sus cambios
4. Ejecute las pruebas: `make test`
5. Cree una solicitud de extracción

## Revisión de código

Todas las solicitudes de extracción requieren al menos una revisión de un mantenedor. Áreas de enfoque:
- Seguridad de la memoria
- Seguridad de concurrencia (corrección de bloqueos)
- Integridad del manejo de errores
- Compatibilidad de API