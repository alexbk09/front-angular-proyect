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

- [x] Proyecto creado con la última versión estable del framework (Angular) o versión alineada al mercado.
- [x] Estructura de carpetas clara (`app`, `components`, `pages`, `services`, `models`, `utils`, `layout`, etc.).
- [x] Configuración de TypeScript estricta (`strict: true`).
- [x] Linter configurado (ESLint) con reglas coherentes.
- [x] Formateador automático (Prettier o equivalente) integrado.
- [x] Scripts de npm para: `start`, `build`, `test`, `lint`, `format`.

---

## 2. Arquitectura y Escalabilidad

- [x] Separación clara entre **presentational components** y **smart/containers**.
- [x] Servicios para lógica de negocio y acceso a datos (HTTP, storage, etc.).
- [x] Modelos de datos tipados (interfaces/types) centralizados.
- [x] Uso de un patrón de estado (por ejemplo: servicios con `BehaviorSubject`, NgRx, Signal Store o similar) en vistas complejas.
- [x] Módulos o features independientes (ej.: `auth`, `dashboard`, `profile`, `settings`, etc.).
- [x] Inyección de dependencias usada correctamente para favorecer testeo y desac acoplamiento.

---

## 3. Diseño UX/UI y Diseño Visual

- [x] Definición de un **design system** básico: colores, tipografías, espaciados, bordes, sombras.
- [x] Uso consistente de componentes UI reutilizables (botones, inputs, cards, modales, etc.).
- [x] Layout responsivo (mobile-first) probado en varios tamaños de pantalla.
- [x] Navegación clara (header, menú, breadcrumb, footer) coherente en todas las páginas.
- [x] Feedback visual para estados de carga, éxito y error.
- [x] Transiciones y microinteracciones suaves pero discretas (no exageradas).

---

## 4. Accesibilidad (A11y)

- [x] Uso correcto de etiquetas semánticas HTML (`header`, `main`, `nav`, `section`, `article`, `footer`).
- [x] Texto alternativo en imágenes importantes (`alt`).
- [x] Contraste de colores suficiente (WCAG AA como mínimo).
- [x] Navegación por teclado funcional (focus visible e intuitivo).
- [x] Uso de `aria-*` donde sea necesario (modales, alerts, tooltips, etc.).

---

## 5. Ruteo y Flujo de Navegación

- [x] Rutas organizadas por módulos/páginas (lazy loading cuando aplique).
- [x] Manejo de rutas privadas (auth guard) y públicas.
- [x] Página de 404 personalizada y amigable.
- [x] Redirecciones bien definidas (por ejemplo al iniciar sesión o cerrar sesión).

---

## 6. Componentización

- [x] Componentes pequeños, con una sola responsabilidad.
- [x] Inputs/outputs bien definidos y tipados; sin "prop drilling" excesivo.
- [x] Uso de componentes compartidos para UI repetida (buttons, cards, forms, layout, etc.).
- [x] Estilos encapsulados por componente (SCSS/CSS Modules o estilos por componente en Angular).
- [x] Evitar duplicación de código en plantillas y lógica.

---

## 7. Gestión de Estado y Datos

- [x] Servicios centralizados para llamadas HTTP y cache básico cuando aplique.
- [x] Manejo de errores global (interceptors, handlers) y por componente.
- [x] Estados de carga (`loading`), vacío (`empty`), error (`error`), datos (`success`) claramente representados en la UI.
- [x] Uso de tipos para respuestas de API y request bodies.
- [x] Evitar lógica compleja en plantillas: moverla a métodos/lógica de componentes o servicios.

---

## 8. Formularios y Validaciones

- [x] Uso de formularios reactivos o template-driven con estructura clara.
- [x] Validaciones síncronas y asíncronas bien definidas y tipadas.
- [x] Mensajes de error de validación claros, amigables y accesibles.
- [x] Manejo de envío múltiple (deshabilitar botón, mostrar loading, etc.).

---

## 9. Performance

- [x] Lazy loading de módulos/rutas pesadas.
- [x] Carga diferida de imágenes (`lazy`), assets pesados optimizados.
- [x] Uso de `trackBy` en listas *ngFor (o equivalente) para evitar renders innecesarios.
- [x] Evitar recalcular datos caros en template; usar pipes puros o memoización.
- [ ] Build de producción verificado (tamaños de bundles razonables).

---

## 10. Seguridad (Front)

- [x] No exponer secretos en el frontend (API keys sensibles, tokens, etc.).
- [x] Uso de `HttpInterceptor` (o similar) para adjuntar tokens y manejar expiraciones.
- [x] Sanitización y escape de contenido dinámico cuando sea necesario.
- [x] Política de CORS, headers de seguridad y HTTPS considerados (documentado aunque se configure en backend/nginx).

---

## 11. Testing

- [x] Configuración básica de testing lista (`jest`/`karma`/`vitest` según el stack actual).
- [x] Tests unitarios para componentes clave (render básico + lógica importante).
- [x] Tests unitarios para servicios (lógica de negocio, mapping de datos, manejo de errores).
- [x] Tests de integración o e2e mínimos para flujos críticos (login, registro, flujo principal de la app).
- [ ] Cobertura mínima de código alcanzada (por ejemplo, >70%) o justificada.

---

## 12. Documentación del Proyecto

- [ ] README principal con:
  - [x] Descripción corta del proyecto (qué resuelve y por qué es interesante).
  - [x] Stack tecnológico y principales decisiones.
  - [x] Instrucciones de instalación, desarrollo, testing y build.
  - [ ] Capturas de pantalla y/o GIFs del producto.
- [x] Notas de arquitectura (carpetas, patrones, decisiones clave).
- [x] Lista de features implementados y futuros (roadmap corto).

---

## 13. Calidad de Código y Mantenimiento

- [x] Reglas de linting ejecutadas y errores corregidos.
- [x] Código sin `console.log` ni comentarios basura.
- [x] Nombres de variables, funciones y componentes claros y descriptivos.
- [x] Reutilización de lógica común a través de helpers/hooks/servicios/utilidades.
- [x] Comentarios solo donde aportan contexto o decisiones no obvias.

---

## 14. Módulos/Features Sugeridos para Portafolio

Para que tu proyecto "tenga de todo" y muestre experiencia senior:

- [x] **Módulo Auth**: login, registro, recuperación de contraseña, manejo de sesión.
- [x] **Módulo Dashboard**: métricas, gráficos, tablas filtrables y paginadas.
- [x] **Módulo Perfil de Usuario**: edición de datos, avatar, preferencias.
- [x] **Módulo Configuración**: opciones del sistema/usuario (tema oscuro/claro, idioma, etc.).
- [x] **Módulo Catálogo/Listado**: listados con filtros avanzados, ordenamiento y detalle.
- [x] **Módulo Formularios Complejos**: formularios multi-step, validaciones avanzadas, resumen final.
- [x] **Módulo Notificaciones**: toasts, banners, estado leído/no leído.

Marca qué módulos implementarás y documenta las decisiones de cada uno.

---

## 15. Preparación para Portafolio y Entrevistas

- [x] Story corta del proyecto: problema, solución, usuarios objetivo.
- [x] Lista de decisiones técnicas "senior" que tomaste y por qué.
- [x] Sección en README explicando retos técnicos y cómo los resolviste.
- [ ] Deploy a un entorno accesible (por ejemplo, Vercel/Netlify/Render) o captura de video detallada.
- [ ] Enlace listo para poner en tu CV/LinkedIn/portafolio.

---

> Recomendación: copia este archivo al inicio de cada nuevo proyecto de portafolio y ajústalo al stack y objetivos de ese proyecto. Mantén siempre la mentalidad de código limpio, modular, testeable y con buena experiencia de usuario.

---

## 16. Fase 2 – Landing, Admin y CRUD de Portafolio


### 16.1 Estrategia de contenido del inicio

- [x] Mensaje principal (1 frase) claro: qué haces y para quién.
- [x] Subtítulo con stack principal (Angular, Laravel, Tailwind, etc.).
- [x] Definir 3–4 tipos de problemas que resuelves (ej. dashboards, portales, sistemas internos).
- [x] Definir CTA principal del inicio ("Ver proyectos", "Descargar CV", "Agendar llamada").


### 16.2 Hero / Cabecera de inicio

- [x] Foto/ilustración profesional visible.
- [x] Título grande con tu rol (Frontend Engineer / Fullstack Developer, etc.).
- [x] Subtítulo con experiencia y tipo de proyectos.
- [x] Botones de acción:
  - [x] "Ver proyectos destacados".
  - [x] "Descargar CV" (link administrable).
- [x] Links a GitHub, LinkedIn y contacto.
- [x] Layout moderno y responsive (2 columnas en desktop, 1 en mobile).
- [x] Todo el contenido del hero editable desde el admin.


### 16.3 Sección "Sobre mí" orientada a empleo

- [x] Párrafo corto (3–5 frases) explicando qué tipo de empresas/proyectos buscas.
- [x] Explicar qué valor aportas (UX, escalabilidad, performance, testing, etc.).
- [ ] Lista de 2–3 logros o highlights relevantes.
- [ ] Contenido totalmente editable desde admin (texto y bullets).

### 16.4 Habilidades y Tech Stack

- [ ] Categorías de skills: Frontend, Backend, DevOps/Herramientas.
- [x] Visualización moderna (chips, badges o bloques) sin "5 estrellas" infantiles.
- [ ] Posibilidad de marcar skills que aparecen en el inicio.
- [ ] CRUD de skills en admin (crear/editar/borrar, categoría, orden, visibilidad).

### 16.5 Proyectos destacados en el inicio

- [x] Flag `isFeatured` en proyectos para marcarlos como destacados (expuesto por backend y consumido vía `/api/home`).
- [x] En el inicio mostrar 3–6 proyectos destacados con título, resumen corto, tags y enlaces.
- [x] Botón "Ver todos los proyectos" que lleva al catálogo completo.
- [x] Diseño de cards moderno con Tailwind y responsive.

### 16.6 CRUD completo de proyectos (admin)

 - [x] Admin de proyectos con crear/editar/borrar.
 - [x] Campos de proyecto:
   - [x] Título.
   - [x] Descripción corta (para home).
   - [x] Descripción larga / historia (para detalle).
   - [x] Tecnologías (tags).
   - [x] Tipo de proyecto (personal, freelance, cliente, curso).
   - [x] Enlace demo.
   - [x] Enlace repo.
   - [x] Imágenes (screenshot principal + extras).
   - [x] Flags: `isFeatured`, `isPublic`.
 - [x] Sincronizar el catálogo actual con estos campos y filtros.
 - [x] Validaciones en el formulario de admin (campos obligatorios, URLs válidas, mínimo una imagen).
 - [x] Permitir reordenar proyectos (drag & drop o campo de orden).
 - [x] Confirmación antes de borrar un proyecto.
 - [x] Feedback visual tras crear/editar/borrar (toast, modal, etc.).
 - [x] Edición de imágenes: previsualización, reemplazo y borrado.
 - [x] Soporte para proyectos en borrador (flag `isDraft`).
 - [x] Filtros y búsqueda en el listado de proyectos del admin.
 - [x] Paginación o scroll infinito si hay muchos proyectos.
 - [x] Acceso restringido solo a usuarios admin.
 - [x] Documentar el flujo de alta/edición/borrado en el README o guía interna.

### 16.7 Testimonios / Social proof

- [x] Modelo de testimonios en backend (nombre, rol/empresa, texto, foto opcional).
- [x] CRUD de testimonios en admin.
- [x] Sección en inicio que muestre 1–3 testimonios (slider o grid simple).
- [x] Opción para activar/desactivar esta sección desde admin.
  - [x] Validaciones en el formulario de testimonios (campos obligatorios, longitud mínima de texto, foto opcional).
  - [x] Feedback visual tras crear/editar/borrar testimonios (toast, modal, etc.).
  - [x] Confirmación antes de borrar un testimonio.
  - [x] Filtros y búsqueda en el listado de testimonios del admin.
  - [x] Paginación si hay muchos testimonios.
  - [x] Acceso restringido solo a usuarios admin.
  - [x] Documentar el flujo de alta/edición/borrado de testimonios en el README o guía interna.

### 16.8 Métricas rápidas (impacto)

- [ ] Bloques de stats (años de experiencia, proyectos finalizados, tecnologías dominadas, etc.).
- [ ] Valores configurables desde admin.
- [ ] Diseño responsive en 3–4 columnas desktop / 1–2 mobile.

### 16.9 Sección de contacto / CTA final

- [ ] Bloque final con texto tipo "¿Hablamos de tu próximo proyecto?".
- [ ] Botón principal hacia email o formulario de contacto.
- [ ] Link secundario a LinkedIn.
- [ ] Formularios de contacto simples (nombre, email, mensaje) integrados con backend (opcional).
- [ ] Textos y enlaces configurables desde admin.

### 16.10 Panel de administración – Contenido de inicio

- [ ] Módulo "Contenido de inicio" en admin para:
  - [ ] Hero (título, subtítulo, CTA, links sociales, imagen).
  - [ ] Sobre mí (párrafo y bullets).
  - [ ] Métricas.
  - [ ] Selección de skills destacadas.
  - [ ] Activar/desactivar secciones del home.
- [ ] Asegurar que solo tú (rol admin) puedes acceder a este módulo.

### 16.11 Backend / API específicos de Fase 2

- [ ] Endpoints CRUD para skills.
- [ ] Endpoints CRUD para testimonios.
- [ ] Endpoints para settings de home (hero, about, métricas, enlaces, secciones activas).
- [ ] Extender endpoints de proyectos con campos `isFeatured`, `isPublic`, screenshots.
- [ ] Validaciones de backend (longitud de textos, URLs válidas, etc.).
- [ ] Documentar nuevos endpoints en la guía de API para el frontend.

### 16.12 Frontend Angular – Integración Fase 2

- [ ] Servicios Angular para consumir contenido de inicio (HomeContentApiService, SkillsApiService, etc.).
- [ ] Estado con signals para home (loading, error, success).
- [ ] Skeleton loaders y mensajes de error amigables en el inicio.
- [ ] Páginas/Componentes de admin (si admin también se maneja desde Angular) o integración con vistas existentes de Laravel.

### 16.13 Diseño visual moderno y responsive

- [ ] Revisar tipografía global (ej. Inter, Manrope) y aplicarla.
- [ ] Ajustar paleta de colores a un look profesional y legible.
- [ ] Usar grids y flex responsivos para cada sección (Tailwind).
- [ ] Mantener buen espaciado y jerarquía visual en mobile y desktop.
- [ ] Respetar y mejorar el modo oscuro actual.

### 16.14 SEO, accesibilidad y analítica en el inicio

- [ ] Títulos y meta tags optimizados (nombre + rol + stack + "portafolio").
- [ ] Uso correcto de h1/h2/h3 en la landing.
- [ ] Alt text en imágenes de hero y proyectos.
- [ ] Integrar analytics básico (Google Analytics u otra opción).
- [ ] Medir clics en CTA principales (Ver proyectos, Descargar CV, Contacto).

---

## Documentación: Edición y configuración del portafolio

### ¿Cómo editar la información del portafolio?

Toda la información editable (Sobre mí, Skills, Contacto, Proyectos) se gestiona desde el backend, lo que permite cambiar textos, enlaces, imágenes y datos de contacto sin modificar el frontend.

### 1. Editar datos generales (Sobre mí, Skills, Contacto)
- Ve al archivo o endpoint de configuración en el backend: `/api/configuracion-portafolio`.
- Modifica los campos `sobreMi`, `skills` y `contacto` según lo que desees mostrar.
- Ejemplo de estructura JSON:

```json
{
  "sobreMi": {
    "nombre": "Tu Nombre",
    "descripcion": "Breve descripción profesional.",
    "fotoUrl": "https://tusitio.com/foto.jpg",
    "contacto": "+58 123-4567890"
  },
  "skills": ["Angular", "NestJS", "TypeScript"],
  "contacto": {
    "email": "tucorreo@email.com",
    "redesSociales": ["https://twitter.com/tuusuario"]
  }
}
```
- Guarda los cambios y recarga el frontend para verlos reflejados.

### 2. Editar proyectos
- Ve al endpoint o archivo mock de proyectos: `/api/proyectos`.
- Agrega, edita o elimina objetos del array según tus proyectos.
- Ejemplo de proyecto:

```json
{
  "id": "1",
  "nombre": "Mi Proyecto",
  "descripcion": "Descripción breve.",
  "tecnologias": ["Angular", "Node.js"],
  "enlace": "https://github.com/mi-proyecto",
  "imagen": "https://tusitio.com/proyecto.png"
}
```

### 3. Editar datos de contacto
- El formulario de contacto envía mensajes al endpoint `/api/contacto`.
- Si deseas cambiar el email de destino o lógica, edítalo en el backend.

### 4. Personalización visual
- Los colores, tipografías y estilos globales se configuran en `tailwind.config.js` y `src/styles.scss`.
- Puedes cambiar la paleta, fuentes y breakpoints para adaptar el diseño a tu marca.

### 5. Pruebas y validación
- Ejecuta los tests unitarios con `npm test` para asegurar que los cambios no rompen la app.

---

> **Tip:** No es necesario recompilar el frontend para actualizar textos, skills o proyectos. Solo edita la configuración en el backend y recarga la web.

---