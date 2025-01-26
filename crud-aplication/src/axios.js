import axios from 'axios';

// Configurar la URL base del servidor Express
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',  // Cambia la URL si tu servidor está en otra dirección
  timeout: 5000,  // Tiempo de espera para las solicitudes (opcional)
});

export default axiosInstance;