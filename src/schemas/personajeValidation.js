import { array, number, string } from 'yup';

const personajeSchema = Yup.object().shape({
    nombre: string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no debe exceder los 50 caracteres'),

    fechaNacimiento: string()
        .optional()
        .nullable()
        .min(10, 'La fecha de nacimiento debe tener al menos 10 caracteres')
        .max(10, 'La fecha de nacimiento no debe exceder los 10 caracteres'),
    
    colorOjos: string()
        .optional()
        .nullable()
        .min(3, 'El color de ojos debe tener al menos 3 caracteres')
        .max(20, 'El color de ojos no debe exceder los 20 caracteres'),

    colorCabello: string()
        .optional()
        .nullable()
        .min(3, 'El color de pelo debe tener al menos 3 caracteres')
        .max(20, 'El color de pelo no debe exceder los 20 caracteres'),

    estatura: number()
        .optional()
        .nullable()
        .positive('La estatura debe ser un número positivo'),

    masa: number()
        .optional()
        .nullable()
        .positive('La masa debe ser un número positivo'),
    
    colorPiel: string()
        .optional()
        .nullable()
        .min(3, 'El color de piel debe tener al menos 3 caracteres')
        .max(20, 'El color de piel no debe exceder los 20 caracteres'),

    peliculas: array()
        .optional()
        .nullable()
        .of(string().required('El ID de la pelicula es obligatorio')),

    especie: string()
        .optional()
        .nullable()
        .of(string().required('El ID de la especie es obligatorio')),
        
    vehiculos: array()
        .optional()
        .nullable()
        .of(string().required('El ID del vehiculo es obligatorio')),
    
    
})