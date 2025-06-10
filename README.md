# 🚀 Aplicación de Listado de Usuarios con Búsqueda, Paginación y Exportación a PDF

Este proyecto es una aplicación web construida con React y TypeScript que consume una API REST pública (`https://dummyjson.com/users`) para mostrar un listado interactivo de usuarios. Permite buscar usuarios por nombre, navegar a través de los resultados mediante paginación y exportar la vista actual (filtrada y paginada) a un archivo PDF.

---

## 🌐 Enlace a la Aplicación Desplegada

Link de aplicacion:
[https://app-prueba-estuardos-projects-2d20a08d.vercel.app/)


## 🛠️ Tecnologías Utilizadas

* **[React](https://react.dev/)**: Biblioteca de JavaScript para construir interfaces de usuario.
* **[TypeScript](https://www.typescriptlang.org/)**: Superset de JavaScript que añade tipado estático.
* **[Vite](https://vitejs.dev/)**: Herramienta de construcción rápida para proyectos web modernos.
* **[Axios](https://axios-http.com/)**: Cliente HTTP basado en promesas para el navegador y Node.js.
* **[jspdf](https://jspdf.org/)**: Librería para generar PDFs en el lado del cliente.
* **[html2canvas](https://html2canvas.hertzen.com/)**: Permite tomar "capturas de pantalla" de elementos HTML y convertirlos en imágenes (canvas).
* **[react-spinners](https://www.davidhu.io/react-spinners/)**: Componentes de spinners de carga para React.
* **CSS**: Para el estilizado de la aplicación.

---

## 💻 Instrucciones de Montaje del Entorno y Ejecución Local


### Prerrequisitos

Instalar lo siguiente:

* **Node.js**: Versión 18.x o superior. se puede descargar desde [nodejs.org](https://nodejs.org/).
* **npm** (Node Package Manager) o **Yarn**: npm viene incluido con Node.js.

### Pasos para la Ejecución Local

1.  **Clonar el Repositorio:**
    Abrir terminal y clona este repositorio usando Git.

    ```bash
    git clone [https://github.com/estuardo16/appPrueba.git]
     ```

2.  **Navegar al Directorio del Proyecto:**
    EntraR en la carpeta del proyecto que se ha clonado.

    ```bash
    cd appPrueba
    ```

3.  **Instalar Dependencias:**
    Instalar todas las dependencias del proyecto.

    ```bash
    npm install axios jspdf html2canvas react-spinners
    

4.  **Iniciar la Aplicación en Modo Desarrollo:**
   
    ```bash
    npm run dev
  

