# 🏄 Windsurf Development Stack & Standards

Este documento define el ecosistema técnico y los estándares de ingeniería aplicados en el proyecto, integrando una mentalidad de **Producto (PM)**, **Calidad (QA)** y **Experiencia de Usuario (UX)**.

## 🛠 Tech Stack

*   **Backend:** PHP 8.3+ (Laravel Framework)
*   **Database:** MySQL 8.0 (Optimización de índices y relaciones)
*   **Frontend:** Angular 17+ (Signals, Standalone Components)
*   **Styling:** Tailwind CSS (Diseño atómico y Utility-first)
*   **Runtime/Tooling:** Node.js (LTS) & Vite

---

## 🏛 Principios de Ingeniería (SOLID & Clean Code)

Aplicamos **SOLID** para asegurar que el software sea fácil de mantener y extender:

1.  **S - Single Responsibility:** Cada clase (Service, Controller, Component) tiene una única razón para cambiar.
2.  **O - Open/Closed:** Entidades abiertas para extensión (via Interfaces/Abstracts) pero cerradas para modificación.
3.  **L - Liskov Substitution:** Las subclases o implementaciones de interfaces deben ser intercambiables sin romper la lógica.
4.  **I - Interface Segregation:** Interfaces específicas para el cliente; no forzamos dependencias de métodos no usados.
5.  **D - Dependency Inversion:** Dependemos de abstracciones, no de concreciones (Inyección de dependencias nativa de Laravel y Angular).

---

## 🧪 Estrategia de Calidad (QA Mindset)

*No se entrega código que no esté validado.*

*   **Backend (TDD con Pest/PHPUnit):**
    *   **Unit Tests:** Validación de lógica de negocio en Services.
    *   **Feature Tests:** Validación de Endpoints, Middleware y Responses.
*   **Frontend (Cypress/Playwright):**
    *   **E2E Testing:** Flujos críticos de usuario (Happy Path).
*   **Static Analysis:** 
    *   PHPStan (Level 8) para tipado fuerte en PHP.
    *   ESLint & Prettier para consistencia en Angular/Node.

---

## 🎨 Frontend, UX & Diseño (Expert Perspective)

Buscamos una experiencia fluida basada en patrones de diseño modernos:

*   **Patrones de UI:** Uso de "Smart & Dumb Components" para separar la lógica de estado de la representación visual.
*   **UX/A11y:** Contraste de colores (WCAG), estados de carga (Skeletons) y feedback inmediato (Toasts/Modals).
*   **Performance:** Lazy loading de rutas en Angular y optimización de assets con Vite.
*   **Design System:** Tokens de diseño consistentes mediante la configuración de `tailwind.config.js`.

---

## 📋 Gestión de Proyecto (PM Best Practices)

*   **Definition of Done (DoD):** Código revisado, tests pasando, documentación actualizada y criterios de aceptación cumplidos.
*   **Git Flow:** Uso de ramas por funcionalidad (`feat/`, `fix/`, `refactor/`) y Pull Requests con code review obligatorio.
*   **Escalabilidad:** Diseño de base de datos normalizado pero preparado para crecimiento mediante el uso eficiente de Eloquent y Query Caching.

---

## 🚀 Comandos de Desarrollo Rápidos

```bash
# Backend Setup
composer install && php artisan migrate --seed

# Frontend Setup
npm install && ng serve

# Testing
php artisan test --parallel
npm test