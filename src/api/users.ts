import axios from 'axios';
import type { UserApiResponse } from '../types/user'; // Importamos nuestra interfaz

// url de la API
const API_BASE_URL = 'https://dummyjson.com';


export const getUsers = async (limit: number = 10, skip: number = 0): Promise<UserApiResponse> => {
  try {
    // Realizamos la petición GET a la API usando Axios
    // Añadimos los parámetros 'limit' y 'skip' para controlar la paginación
    const response = await axios.get<UserApiResponse>(`${API_BASE_URL}/users?limit=${limit}&skip=${skip}`);

    // Axios envuelve la respuesta real de la API en la propiedad 'data'
    return response.data;
  } catch (error) {
    // Capturamos cualquier error que ocurra durante la petición
    console.error('Error fetching users:', error);
    // Lanzamos un nuevo error con un mensaje más amigable para el usuario
    throw new Error('No se pudieron cargar los usuarios. Intente de nuevo más tarde.');
  }
};