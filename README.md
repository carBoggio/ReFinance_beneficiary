# ReFinance - Plataforma de Financiamiento Comunitario

ReFinance es una plataforma web moderna que conecta donantes con proyectos que necesitan financiamiento. La plataforma facilita la recaudación de fondos para causas sociales, educativas y comunitarias.

## 🎨 Características del Diseño

- **Paleta de colores**: Colores terracota claros (marrones claros) con acentos en azul celeste
- **Estilo**: Moderno, confiable y atractivo
- **Responsive**: Diseño adaptativo para todos los dispositivos
- **UI/UX**: Interfaz intuitiva y fácil de usar

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18 + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Arquitectura**: Componentes funcionales con hooks
- **Patrones**: SOLID principles, componentes reutilizables

## 📁 Estructura del Proyecto

```
src/
├── actions/           # Llamadas a la API (placeholders)
├── components/        # Componentes reutilizables
│   ├── Header.jsx    # Navegación principal
│   └── Footer.jsx    # Pie de página con formulario de contacto
├── pages/            # Páginas de la aplicación
│   ├── Home/         # Página principal
│   ├── Projects/     # Lista de proyectos
│   ├── ProjectDetail/# Detalle de proyecto individual
│   ├── Donate/       # Página de donaciones
│   └── Blog/         # Blog con artículos informativos
└── App.jsx           # Componente principal con routing
```

## 🏠 Páginas Principales

### Home
- Logo central de ReFinance
- Dos opciones principales: "Necesito" y "Quiero Donar"
- Explicación de cómo funciona la plataforma

### Projects
- Formulario para agregar propuestas o solicitar ayuda
- Lista de proyectos pendientes con tarjetas
- Botones de acción para cada proyecto

### Project Detail
- Información detallada del proyecto
- Barra de progreso de recaudación
- Formulario de donación
- Actualizaciones del proyecto

### Donate
- Explicación detallada de cómo funciona
- Formulario de donación completo
- Información sobre beneficios fiscales

### Blog
- Artículos sobre cómo donar
- Categorías de contenido
- Newsletter de suscripción

## 🎯 Funcionalidades Implementadas

- ✅ Routing completo con React Router
- ✅ Diseño responsive con Tailwind CSS
- ✅ Formularios funcionales (frontend)
- ✅ Componentes reutilizables
- ✅ Estructura de carpetas organizada
- ✅ Paleta de colores terracota y azul celeste
- ✅ Logo circular azul de ReFinance
- ✅ Navegación entre páginas
- ✅ Footer con información de contacto

## 🚧 Funcionalidades Pendientes (Backend)

- 🔄 Integración con API real
- 🔄 Autenticación de usuarios
- 🔄 Base de datos de proyectos
- 🔄 Sistema de pagos
- 🔄 Gestión de donaciones
- 🔄 Panel de administración

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd ReFinance
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

### Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construir para producción
- `npm run preview` - Vista previa de la build
- `npm run lint` - Ejecutar ESLint

## 🎨 Personalización de Colores

Los colores personalizados están definidos en `tailwind.config.js`:

- **refinance-blue**: #4A90E2 (azul celeste principal)
- **terracotta**: Paleta de marrones claros (50-900)

## 📱 Responsive Design

La aplicación está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1280px+)

## 🔧 Desarrollo

### Agregar nuevas páginas
1. Crear componente en `src/pages/`
2. Agregar ruta en `src/App.jsx`
3. Actualizar navegación en `Header.jsx`

### Agregar nuevas acciones
1. Crear función en `src/actions/index.js`
2. Importar en el componente que la use
3. Implementar lógica cuando el backend esté listo

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

- **Email**: contacto@refinance.mx
- **Teléfono**: +52 (55) 1234-5678
- **Ubicación**: Ciudad de México, México

---

Desarrollado con ❤️ por el equipo de ReFinance
