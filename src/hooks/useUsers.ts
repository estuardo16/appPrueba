// src/hooks/useUsers.ts
import { useState, useEffect, useCallback, useMemo } from 'react';
import type { User } from '../types/user'; // Importamos la interfaz de usuario (con 'type' para compatibilidad)
import { getUsers } from '../api/users'; // Importamos la función para obtener usuarios de la API

interface UseUsersResult {
  users: User[]; // usuarios obtenidos de la API
  filteredUsers: User[]; // Usuarios después de aplicar el filtro de búsqueda y la paginación
  loading: boolean; // Indica si los datos están siendo cargados
  error: string | null; // Almacena el mensaje de error si ocurre alguno
  searchTerm: string; // El término actual de búsqueda
  setSearchTerm: (term: string) => void; // Función para actualizar el término de búsqueda
  currentPage: number; // La página actual de la paginación
  totalPages: number; // El numero total de páginas disponibles
  goToNextPage: () => void; // Función para ir a la siguiente pagina 
  goToPreviousPage: () => void; // Función ir a la pagina anterior
}

// número de usuarios que queremos mostrar por página (para la paginación local)
const USERS_PER_PAGE = 10;

// se piden a la API datos de 100 usuarios para la carga inicial
const API_LOAD_LIMIT = 100; //

/**
 * Custom Hook para manejar la lógica de obtención, filtrado y paginación de usuarios.
 * @returns regresa un objeto con el estado y las funciones relacionadas con los usuarios.
 */
export const useUsers = (): UseUsersResult => {
  // Estado para almacenar TODOS los usuarios obtenidos de la API (la base para filtrar/paginar)
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // Estado para controlar el estado de carga
  const [loading, setLoading] = useState<boolean>(true);
  // Estado para almacenar cualquier mensaje de error
  const [error, setError] = useState<string | null>(null);
  // Estado para el término de búsqueda introducido por el usuario
  const [searchTerm, setSearchTerm] = useState<string>('');
  // Estado para la página actual en la paginación
  const [currentPage, setCurrentPage] = useState<number>(1);

  
   //Función useCallback para obtener usuarios de la API.
  
  const fetchAllUsers = useCallback(async () => {
    setLoading(true); // estado de carga a true al inicio de la petición
    setError(null); // limpia cualquier error previo
    try {
      // se pide el máximo de usuarios que la API puede darnos en una sola llamada.
      // Un 'skip' de 0 significa que empezamos desde el primer usuario.
      const data = await getUsers(API_LOAD_LIMIT, 0);
      setAllUsers(data.users); // se almacena todos los usuarios obtenidos
      setCurrentPage(1); // se reinicia a la primera página cada vez que se cargan nuevos usuarios (por si se recarga la paginación)
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al cargar los usuarios.'); // Si hay un error, se almacena 
    } finally {
      setLoading(false); // se actualiza el estado de carga a false al finalizar la petición
    }
  }, []); 

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

 
  const filteredAndSearchedUsers = useMemo(() => {
    // se filtran todos los usuarios basándonos en el termino de busqueda
    // Convierte el nombre y el término de búsqueda a minúsculas para una búsqueda que funcione tanto para mayusculas o minusculas
    return allUsers.filter((user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allUsers, searchTerm]); 

  // se calcula el número total de páginas necesarias para los usuarios filtrados
  const totalPages = Math.ceil(filteredAndSearchedUsers.length / USERS_PER_PAGE);

  
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * USERS_PER_PAGE;
    const endIndex = startIndex + USERS_PER_PAGE;
    return filteredAndSearchedUsers.slice(startIndex, endIndex);
  }, [filteredAndSearchedUsers, currentPage]);


  
  // función para ir a la siguiente página.
   
  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, totalPages]); 

  
  // función para ir a la página anterior.
  
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]); 

  // se retornan el estado y las funciones que el componente principal necesita.
  return {
    users: allUsers, 
    filteredUsers: paginatedUsers, 
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
  };
};