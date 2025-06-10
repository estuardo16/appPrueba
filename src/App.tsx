import React, { useRef } from 'react';
import { useUsers } from './hooks/useUsers';
//componentes IU
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import UserTable from './components/UserTable';
// librerías para generar PDF
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import './index.css'; 

const App: React.FC = () => {
  // hook para obtener todo el estado y las funciones necesarias
  const {
    filteredUsers, // Usuarios filtrados por el término de búsqueda
    loading,       // Estado de carga
    error,         // Mensaje de error
    searchTerm,    // Término de búsqueda actual
    setSearchTerm, // Función para actualizar el término de búsqueda
    currentPage,   // Página actual de la paginación
    totalPages,    // Número total de páginas
    goToNextPage,  // Función para avanzar página
    goToPreviousPage, // Función para retroceder página
  } = useUsers();

  // obtener una referencia al elemento DOM que queremos exportar a PDF
  const tableRef = useRef<HTMLDivElement>(null);

  
  const handleExportPdf = async () => {
    // se verifica que la referencia al elemento exista
    if (tableRef.current) {
      const input = tableRef.current; // El elemento HTML a convertir a PDF

      
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);

      try {
        // html2canvas convierte el elemento HTML en un objeto canvas (imagen)
        const canvas = await html2canvas(input, {
          scale: 2,         // Aumenta la escala para una mejor calidad de imagen en el PDF
          useCORS: true,    // Importante si las imágenes de los usuarios provienen de un dominio diferente
          scrollY: -window.scrollY, // Ajusta el scroll para html2canvas si la página ha sido scrolleada
          windowWidth: document.documentElement.offsetWidth, // Captura el ancho completo de la ventana
          windowHeight: document.documentElement.offsetHeight // Captura la altura completa de la ventana
        });

        // Convierte el canvas a una URL de datos (imagen PNG)
        const imgData = canvas.toDataURL('image/png');
        // Inicializa jsPDF con orientación 'p' (portrait), unidades 'mm' y tamaño de página 'a4(carta)'
        const pdf = new jsPDF('p', 'mm', 'a4');

        const imgWidth = 210; // Ancho A4 en mm
        const pageHeight = 297; // Alto A4 en mm
        // Calcula la altura de la imagen en el PDF manteniendo su relación de aspecto
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight; // Altura restante de la imagen por renderizar

        let position = 0; // Posición inicial en el PDF

        // Añade la primera página de la imagen al PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight; // Reduce la altura restante por la altura de una página

        // Si la imagen es más grande que una página, añade páginas adicionales
        while (heightLeft >= 0) {
          position = heightLeft - imgHeight; // Calcula la posición para la siguiente parte de la imagen
          pdf.addPage(); // Añade una nueva página al PDF
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); // Añade la siguiente parte de la imagen
          heightLeft -= pageHeight; // Reduce la altura restante
        }

        // Guarda el PDF con el nombre especificado
        pdf.save('listado_usuarios_filtrado.pdf');
        alert('PDF generado exitosamente');
      } catch (err) {
        console.error('Error al generar el PDF:', err);
        alert('Hubo un error al generar el PDF. Asegúrate de que exista contenido e inténtalo de nuevo.');
      } finally {
        // Vuelve a la posición de scroll original
        window.scrollTo(0, originalScrollY);
      }
    }
  };

  return (
    <div className="app-container">
      <h1>Listado de Usuarios</h1>

      {/*controles: Búsqueda y Botón de Exportar */}
      <div className="controls">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda mientras se escribe
          className="search-input"
        />
        <button
          onClick={handleExportPdf}
          className="export-button"
          // Deshabilita el botón si está cargando o no hay usuarios para exportar
          disabled={loading || filteredUsers.length === 0}
        >
          Exportar a PDF
        </button>
      </div>

      {/* Renderizado condicional basado en el estado */}
      {loading && <LoadingSpinner />} {/* Muestra spinner si está cargando */}
      {error && <ErrorMessage message={error} />} {/* Muestra mensaje de error si hay uno */}

      {/* Renderiza la tabla y la paginación solo si no está cargando y no hay error */}
      {!loading && !error && (
        <>
          {/*html2canvas genera el PDF basado en el ref */}
          <div ref={tableRef} style={{ width: '100%' }}>
            <UserTable users={filteredUsers} /> {/* Pasa los usuarios filtrados al componente UserTable */}
          </div>

          {/* Controles de paginación */}
          <div className="pagination-controls">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1} 
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages} 
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
