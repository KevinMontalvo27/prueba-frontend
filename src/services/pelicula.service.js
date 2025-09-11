import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';


const peliculasAPI = axios.create({
    baseURL: `${API_BASE_URL}/peliculas`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const peliculaService = {

    getAllPeliculas: async () => {
        try{
            const response = await peliculasAPI.get('/');
            return response.data;
        } catch (error) {
            console.error('Error fetching peliculas:', error);
            throw error;
        }
    },

    getPeliculaById: async (id) => {
        try{
            const response = await peliculasAPI.get(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching pelicula with id ${id}:`, error);
            throw error;
        }
    },

    getListaPeliculas: async () => {
        try{
            const response = await peliculasAPI.get('/lista');
            return response.data;
        } catch (error) {
            console.error('Error fetching lista de peliculas:', error);
            throw error;
        }
    },

    createPelicula: async (peliculaData) => {
        try{
            const response = await peliculasAPI.post('/', peliculaData);
            return response.data;
        } catch (error) {
            console.error('Error creating pelicula:', error);
            throw error;
        }
    },

    updatePelicula : async (id, peliculaData) => {
        try{
            const response = await peliculasAPI.put(`/${id}`, peliculaData);
            return response.data;
        } catch (error) {
            console.error(`Error updating pelicula with id ${id}:`, error);
            throw error;
        }
    },

    deletePelicula: async (id) => {
        try{
            const response = await peliculasAPI.delete(`/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting pelicula with id ${id}:`, error);
            throw error;
        }
    }
}

export default peliculaService;