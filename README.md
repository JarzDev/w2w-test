# api-gestor-medios-pago-impl

Este proyecto define el backend del submódulo de medios de pago. Expone
endpoints en una API Gateway para validar el medio de pago de órdenes según su
concepto, y endpoints para gestionar los medios de pago.

La estrucutra del repositorio es la siguiente:

- `src` - Código fuente de funciones AWS Lambda.
- `__tests__` - Tests unitarios para el código de las funciones AWS Lambda.
- `template.yaml` - Definición en formato AWS SAM de recursos de infraestructura
  AWS.

## Desarrollo

```bash
# Formatear todos los archivos de codigo fuente
npm run fmt
# Ejecutar linting
npm run lint
# Ejecutar tests unitarios
npm run test
```
