import { number, string } from 'yup';


const naveSchema = Yup.object().shape({
    nombre: string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no debe exceder los 50 caracteres'),

    modelo: string()
        .required('El modelo es obligatorio')
        .min(2, 'El modelo debe tener al menos 2 caracteres')
        .max(50, 'El modelo no debe exceder los 50 caracteres'),

    tamanio: string()
        .optional()
        .nullable()
        .min(1, 'El tamaño debe tener al menos 1 caracter')
        .max(20, 'El tamaño no debe exceder los 20 caracteres'),

    velocidadAtmosfericaMaxima: string()
        .optional()
        .nullable()
        .min(1, 'La velocidad atmosférica máxima debe tener al menos 1 caracter')
        .max(20, 'La velocidad atmosférica máxima no debe exceder los 20 caracteres'),
        
    hiperimpulsor: string()
        .optional()
        .nullable()
        .min(1, 'El hiperimpulsor debe tener al menos 1 caracter')
        .max(20, 'El hiperimpulsor no debe exceder los 20 caracteres'),

    numeroPasajeros: number()
        .typeError('El número de pasajeros debe ser un número')
        .optional()
        .nullable()
        .positive('El número de pasajeros debe ser un número positivo')
        .min(1, 'El número de pasajeros debe tener al menos 1'),

    capacidadCarga: number()
        .typeError('La capacidad de carga debe ser un número')
        .optional()
        .nullable()
        .positive('La capacidad de carga debe ser un número positivo')
        .min(1, 'La capacidad de carga debe tener al menos 1'),

    consumibles: string()
        .optional()
        .nullable()
        .min(1, 'Los consumibles deben tener al menos 1 caracter')
        .max(50, 'Los consumibles no deben exceder los 50 caracteres'),

    mglt: number()
        .typeError('El MGLT debe ser un número')
        .optional()
        .nullable()
        .positive('El MGLT debe ser un número positivo')
        .min(1, 'El MGLT debe tener al menos 1'),

});