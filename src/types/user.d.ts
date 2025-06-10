// Interfaz para la estructura de usuario
export interface User {
  id: number; 
  firstName: string; // nombre
  lastName: string; //apellido
  maidenName: string; //apellido d soltera
  age: number; 
  gender: string; 
  email: string; 
  phone: string;
  username: string;
  password?: string;
  birthDate: string;
  image: string; // imagen del usuario
  bloodGroup: string; //tipo de sangre
  height: number; //altura
  weight: number; //peso
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    department: string;
    name: string; // Nombre de la empresa
    title: string; // Puesto de trabajo
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
  };
  ein: string;
  ssn: string;
  userAgent: string; //navegador?
}

// Interfaz para la API de usuarios
export interface UserApiResponse {
  users: User[];    // array de usuarios
  total: number;    // n total de usuarios disponibles en la API
  skip: number;     // usuarios que se saltaron (para paginación)
  limit: number;    // usuarios que se pidieron (para paginación)
}