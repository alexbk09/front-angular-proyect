## Portafolio Frontend (Angular)

Proyecto de portafolio frontend construido con Angular 21 (standalone components) y Tailwind, pensado para demostrar capacidades "senior" en arquitectura, UX, estado, formularios avanzados, integración con backend Laravel y testing.

Incluye módulos típicos de una app real: autenticación, dashboard, perfil de usuario, configuración (tema/idioma), catálogo de proyectos y base para formularios complejos.

## Stack y decisiones técnicas

- Angular 21 con componentes standalone y ruteo lazy por feature.
- Tailwind CSS para layout responsivo y design system ligero (tipografías, colores, spacing).
- Estado por feature usando servicios con signals (Home, Dashboard, Auth, etc.).
- Interceptores HTTP para token de autenticación y manejo global de errores.
- Formularios reactivos con validaciones síncronas y asíncronas (ejemplo en registro).
- Vitest como runner de tests unitarios para servicios y componentes clave.

## Puesta en marcha

### Requisitos

- Node.js LTS (recomendado 20.x).
- npm o pnpm.

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm start
```

Aplicación disponible en `http://localhost:4200/`.

### Tests

```bash
npm test
```

Ejecuta la suite de tests unitarios con Vitest.

### Lint

```bash
npm run lint
```

Aplica las reglas de ESLint configuradas para el proyecto.

### Build de producción

```bash
npm run build
```

Genera el bundle optimizado en la carpeta `dist/`.

## Arquitectura y organización

- `src/app/layout`: navegación principal, header, footer.
- `src/app/pages`: páginas principales (home, auth, dashboard, profile, settings, catalog, not-found).
- `src/app/components`: componentes UI reutilizables (botón, card, errores de formulario, etc.).
- `src/app/infrastructure`: servicios HTTP, estado, modelos de API, guards, interceptores y validadores.

La comunicación con el backend Laravel se hace vía servicios HTTP tipados (por ejemplo, AuthApiService, ProjectsApiService, ProfileApiService).

## Features implementados (MVP)

- Landing/Home con listado de proyectos destacados.
- Módulo de autenticación (login/registro) con manejo de estado y errores.
- Dashboard con métricas de ejemplo (integración prevista con backend).
- Perfil de usuario editable, incluyendo preferencias de tema/idioma.
- Módulo de configuración global (Settings) para cambiar tema e idioma.
- Catálogo de proyectos con búsqueda, filtros por tags y ordenación.
- Manejo de estados de carga, error y vacío en las vistas clave.

### Formularios complejos y notificaciones

- Wizard multi-step para crear un proyecto, con validaciones por paso y resumen final.
- Centro de notificaciones en memoria, con soporte a estado leído/no leído.

## Capturas / demo

- TODO: añadir capturas en `docs/screenshots/` (por ejemplo, `dashboard.png`, `profile.png`, `catalog.png`) y/o enlace a vídeo de demo.

## Historia del proyecto

Este proyecto nace de la necesidad de tener un único portafolio frontend que demuestre, en un mismo lugar, módulos típicos de aplicaciones reales: autenticación, panel de control, perfil, configuración, catálogo y formularios avanzados.

La solución es una SPA/SSR ligera en Angular, conectada a un backend Laravel, que sirve como base de conversación en entrevistas técnicas y como referencia de buenas prácticas.

Usuarios objetivo: reclutadores técnicos, líderes de equipo y cualquier persona que quiera evaluar experiencia real en desarrollo frontend moderno.

## Decisiones técnicas "senior"

- Uso de Angular standalone + routing lazy para reducir boilerplate y modularizar por feature.
- Estado por página encapsulado en servicios con signals (en lugar de global store pesado) para mantener simpleza con escalabilidad.
- Interceptores HTTP para gestionar autenticación (token) y manejo global de errores.
- Formularios reactivos para flujos críticos (auth, perfil, settings, wizard) con validación síncrona y asíncrona.
- Separación clara entre componentes de presentación (UI) y servicios de infraestructura (HTTP, estado, mapeos).
- Tests unitarios sobre servicios y componentes clave usando Vitest.

## Retos técnicos y cómo se abordaron

- Integrar el frontend Angular con un backend Laravel manteniendo contratos de API tipados desde el lado del cliente.
- Diseñar un sistema de estado basado en signals que sea simple pero permita manejar estados de carga, error, vacío y éxito.
- Asegurar una arquitectura limpia (páginas, componentes, infrastructure, layout) que pueda crecer con nuevos módulos.

## Deploy

- TODO: desplegar en Vercel/Netlify/otro proveedor y enlazar aquí la URL pública.

Mientras tanto, este README sirve como guía para clonar, levantar en local y explorar el código.
