# Checklist Proyecto Frontend de Portafolio (Nivel Senior)

Usa este checklist como guía viva. Márcalo por secciones y actualízalo según avances.

---

## 0. Protocolo de Trabajo Personal (Nivel Senior)

- [ ] Antes de escribir código, definir objetivo del módulo/pantalla y su flujo UX.
- [ ] Trabajar siempre con enfoque en **componentización**, reutilización y separación de responsabilidades.
- [ ] Mantener una **arquitectura limpia**: evitar mezclar lógica de negocio con lógica de presentación.
- [ ] Diseñar primero la experiencia de usuario (UX) y después ajustar el UI (colores, tipografías, espaciados, microinteracciones).
- [ ] Priorizar **legibilidad sobre rapidez**: nombres claros, funciones cortas, archivos ordenados.
- [ ] Incluir pruebas (unitarias/integración/e2e) para flujos importantes antes de dar un módulo por terminado.
- [ ] Revisar accesibilidad básica (navegación teclado, contraste, roles/aria) en cada nueva vista.
- [ ] Documentar las decisiones técnicas clave de cada módulo (por qué se eligió esa solución).
- [ ] Hacer revisiones periódicas de refactor: eliminar duplicaciones, mejorar performance y simplificar lógica.

> Este protocolo debe guiar SIEMPRE tu forma de trabajar en el proyecto para asegurar calidad, UX sólida y buenas prácticas de desarrollo a nivel profesional.

---

## 1. Base del Proyecto

- [ ] Proyecto creado con la última versión estable del framework (Angular) o versión alineada al mercado.
- [ ] Estructura de carpetas clara (`app`, `components`, `pages`, `services`, `models`, `utils`, `layout`, etc.).
- [ ] Configuración de TypeScript estricta (`strict: true`).
- [ ] Linter configurado (ESLint) con reglas coherentes.
- [ ] Formateador automático (Prettier o equivalente) integrado.
- [ ] Scripts de npm para: `start`, `build`, `test`, `lint`, `format`.

---

## 2. Arquitectura y Escalabilidad

- [ ] Separación clara entre **presentational components** y **smart/containers**.
- [ ] Servicios para lógica de negocio y acceso a datos (HTTP, storage, etc.).
- [ ] Modelos de datos tipados (interfaces/types) centralizados.
- [ ] Uso de un patrón de estado (por ejemplo: servicios con `BehaviorSubject`, NgRx, Signal Store o similar) en vistas complejas.
- [ ] Módulos o features independientes (ej.: `auth`, `dashboard`, `profile`, `settings`, etc.).
- [ ] Inyección de dependencias usada correctamente para favorecer testeo y desac acoplamiento.

---

## 3. Diseño UX/UI y Diseño Visual

- [ ] Definición de un **design system** básico: colores, tipografías, espaciados, bordes, sombras.
- [ ] Uso consistente de componentes UI reutilizables (botones, inputs, cards, modales, etc.).
- [ ] Layout responsivo (mobile-first) probado en varios tamaños de pantalla.
- [ ] Navegación clara (header, menú, breadcrumb, footer) coherente en todas las páginas.
- [ ] Feedback visual para estados de carga, éxito y error.
- [ ] Transiciones y microinteracciones suaves pero discretas (no exageradas).

---

## 4. Accesibilidad (A11y)

- [ ] Uso correcto de etiquetas semánticas HTML (`header`, `main`, `nav`, `section`, `article`, `footer`).
- [ ] Texto alternativo en imágenes importantes (`alt`).
- [ ] Contraste de colores suficiente (WCAG AA como mínimo).
- [ ] Navegación por teclado funcional (focus visible e intuitivo).
- [ ] Uso de `aria-*` donde sea necesario (modales, alerts, tooltips, etc.).

---

## 5. Ruteo y Flujo de Navegación

- [ ] Rutas organizadas por módulos/páginas (lazy loading cuando aplique).
- [ ] Manejo de rutas privadas (auth guard) y públicas.
- [ ] Página de 404 personalizada y amigable.
- [ ] Redirecciones bien definidas (por ejemplo al iniciar sesión o cerrar sesión).

---

## 6. Componentización

- [ ] Componentes pequeños, con una sola responsabilidad.
- [ ] Inputs/outputs bien definidos y tipados; sin "prop drilling" excesivo.
- [ ] Uso de componentes compartidos para UI repetida (buttons, cards, forms, layout, etc.).
- [ ] Estilos encapsulados por componente (SCSS/CSS Modules o estilos por componente en Angular).
- [ ] Evitar duplicación de código en plantillas y lógica.

---

## 7. Gestión de Estado y Datos

- [ ] Servicios centralizados para llamadas HTTP y cache básico cuando aplique.
- [ ] Manejo de errores global (interceptors, handlers) y por componente.
- [ ] Estados de carga (`loading`), vacío (`empty`), error (`error`), datos (`success`) claramente representados en la UI.
- [ ] Uso de tipos para respuestas de API y request bodies.
- [ ] Evitar lógica compleja en plantillas: moverla a métodos/lógica de componentes o servicios.

---

## 8. Formularios y Validaciones

- [ ] Uso de formularios reactivos o template-driven con estructura clara.
- [ ] Validaciones síncronas y asíncronas bien definidas y tipadas.
- [ ] Mensajes de error de validación claros, amigables y accesibles.
- [ ] Manejo de envío múltiple (deshabilitar botón, mostrar loading, etc.).

---

## 9. Performance

- [ ] Lazy loading de módulos/rutas pesadas.
- [ ] Carga diferida de imágenes (`lazy`), assets pesados optimizados.
- [ ] Uso de `trackBy` en listas *ngFor (o equivalente) para evitar renders innecesarios.
- [ ] Evitar recalcular datos caros en template; usar pipes puros o memoización.
- [ ] Build de producción verificado (tamaños de bundles razonables).

---

## 10. Seguridad (Front)

- [ ] No exponer secretos en el frontend (API keys sensibles, tokens, etc.).
- [ ] Uso de `HttpInterceptor` (o similar) para adjuntar tokens y manejar expiraciones.
- [ ] Sanitización y escape de contenido dinámico cuando sea necesario.
- [ ] Política de CORS, headers de seguridad y HTTPS considerados (documentado aunque se configure en backend/nginx).

---

## 11. Testing

- [ ] Configuración básica de testing lista (`jest`/`karma`/`vitest` según el stack actual).
- [ ] Tests unitarios para componentes clave (render básico + lógica importante).
- [ ] Tests unitarios para servicios (lógica de negocio, mapping de datos, manejo de errores).
- [ ] Tests de integración o e2e mínimos para flujos críticos (login, registro, flujo principal de la app).
- [ ] Cobertura mínima de código alcanzada (por ejemplo, >70%) o justificada.

---

## 12. Documentación del Proyecto

- [ ] README principal con:
  - [ ] Descripción corta del proyecto (qué resuelve y por qué es interesante).
  - [ ] Stack tecnológico y principales decisiones.
  - [ ] Instrucciones de instalación, desarrollo, testing y build.
  - [ ] Capturas de pantalla y/o GIFs del producto.
- [ ] Notas de arquitectura (carpetas, patrones, decisiones clave).
- [ ] Lista de features implementados y futuros (roadmap corto).

---

## 13. Calidad de Código y Mantenimiento

- [ ] Reglas de linting ejecutadas y errores corregidos.
- [ ] Código sin `console.log` ni comentarios basura.
- [ ] Nombres de variables, funciones y componentes claros y descriptivos.
- [ ] Reutilización de lógica común a través de helpers/hooks/servicios/utilidades.
- [ ] Comentarios solo donde aportan contexto o decisiones no obvias.

---

## 14. Módulos/Features Sugeridos para Portafolio

Para que tu proyecto "tenga de todo" y muestre experiencia senior:

- [ ] **Módulo Auth**: login, registro, recuperación de contraseña, manejo de sesión.
- [ ] **Módulo Dashboard**: métricas, gráficos, tablas filtrables y paginadas.
- [ ] **Módulo Perfil de Usuario**: edición de datos, avatar, preferencias.
- [ ] **Módulo Configuración**: opciones del sistema/usuario (tema oscuro/claro, idioma, etc.).
- [ ] **Módulo Catálogo/Listado**: listados con filtros avanzados, ordenamiento y detalle.
- [ ] **Módulo Formularios Complejos**: formularios multi-step, validaciones avanzadas, resumen final.
- [ ] **Módulo Notificaciones**: toasts, banners, estado leído/no leído.

Marca qué módulos implementarás y documenta las decisiones de cada uno.

---

## 15. Preparación para Portafolio y Entrevistas

- [ ] Story corta del proyecto: problema, solución, usuarios objetivo.
- [ ] Lista de decisiones técnicas "senior" que tomaste y por qué.
- [ ] Sección en README explicando retos técnicos y cómo los resolviste.
- [ ] Deploy a un entorno accesible (por ejemplo, Vercel/Netlify/Render) o captura de video detallada.
- [ ] Enlace listo para poner en tu CV/LinkedIn/portafolio.

---

> Recomendación: copia este archivo al inicio de cada nuevo proyecto de portafolio y ajústalo al stack y objetivos de ese proyecto. Mantén siempre la mentalidad de código limpio, modular, testeable y con buena experiencia de usuario.