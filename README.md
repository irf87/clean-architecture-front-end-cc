# Multi Apoyo Front End Technical Test

Este es un proyecto desarrollado con [Next.js](https://nextjs.org) utilizando una arquitectura basada en Domain-Driven Design (DDD).

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm o yarn

## Configuración del Entorno

1. Clona el repositorio
2. Instala las dependencias:
```bash
yarn install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
NEXT_PUBLIC_API_URL="https://reqres.in/api"
NEXT_PUBLIC_ENCRYPTION_KEY="ezjllOXzhNB2l8jAsjbAhpvXVQ7RpQDk"
```

## Login

[Obtener lista de usuarios permitidos](https://reqres.in/api-docs/#/default/get_users)
Ejemplo: 
email: george.bluth@reqres.in
password: 123456

## Scripts Disponibles

### Desarrollo
```bash
yarn dev
```
Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000)

### Pruebas Unitarias
```bash
# Ejecutar todas las pruebas
yarn test

# Ejecutar pruebas en modo watch
yarn test:watch

# Ejecutar pruebas con cobertura
yarn test:coverage
```

### Storybook
```bash
# Iniciar Storybook
yarn storybook

# Construir Storybook
yarn build-storybook
```

### Linting
```bash
yarn lint

# Corregir errores de formato automáticamente

yarn lint:fix
```

## Documentación

Para más detalles sobre la arquitectura, decisiones de diseño y estrategias implementadas, consulta la [documentación técnica](https://docs.google.com/document/d/1Aklxm3mtinLMibq8v-KjJ3ovYTHOvfOvFxfOPn04Kt4/edit?usp=sharing).

## Tecnologías Principales

- Next.js 14
- React 18
- TypeScript
- Redux Toolkit
- Styled Components
- Vitest
- Storybook
- Tailwind css
