# Recetas

Aplicación web para gestión y visualización de recetas de cocina, construida con Angular. Permite listar, buscar, crear, editar y eliminar recetas fácilmente, mostrando detalles completos y fotografías.

## Características principales

- Listado, búsqueda y filtrado de recetas.
- Visualización de detalles e instrucciones paso a paso de cada receta.
- Agregar, editar y eliminar recetas (CRUD básico).
- Diseño responsivo y atractivo, utilizando Tailwind CSS.

## Tecnologías empleadas

- [Angular 20+](https://angular.io/): framework principal para la SPA.
- [Tailwind CSS](https://tailwindcss.com/): estilos y diseño responsivo.
- [TypeScript](https://www.typescriptlang.org/): tipado de datos y robustez.
- [RxJS](https://rxjs.dev/): gestión reactiva de datos.

## Instalación y puesta en marcha

1. Clona el repositorio y entra al directorio del proyecto:

   ```bash
   git clone <repo_url>
   cd recetas
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia la aplicación en desarrollo:

   ```bash
   npm start
   # o equivalente: ng serve
   ```

4. Accede desde tu navegador a `http://localhost:4200/`

## Scripts útiles

- `ng serve` — Levanta el servidor de desarrollo.
- `ng build` — Genera la versión de producción.
- `ng test` — Ejecuta tests unitarios.

## Estructura básica del proyecto

```
recetas/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── recipe-list/        # Listado y filtrado de recetas
│   │   │   ├── recipe-card/        # Visualización individual
│   │   │   ├── recipe-form/        # Formulario de alta y edición
│   │   │   ├── features/           # Servicios lógicos (Recetas)
│   │   │   └── models/             # Interfaces y tipos (Recipes)
│   │   └── ...                    # Otros módulos/app principal
│   └── ...
├── package.json                    # Dependencias y scripts
├── angular.json                    # Configuración de Angular
├── tailwind.config.*               # Configuración de Tailwind
└── README.md
```

## Contribuciones

¡Las contribuciones son bienvenidas! Puedes abrir issues para sugerir mejoras/bugs o enviar Pull Requests.

## Licencia

Este proyecto es open source y se puede usar/editar libremente.

---

### Autor: Equipo Recetas

---

Este proyecto se generó con [Angular CLI](https://github.com/angular/angular-cli).
