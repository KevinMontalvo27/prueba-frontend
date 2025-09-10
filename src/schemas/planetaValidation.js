import { number, string } from 'yup';

const planetaSchema = Yup.object().shape({
    nombre: string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no debe exceder los 50 caracteres'),

    diametro: number()
        .typeError('El diámetro debe ser un número')
        .optional()
        .nullable()
        .positive('El diámetro debe ser un número positivo')
        .min(1, 'El diámetro debe tener al menos 1'),

    periodoRotacion: number()
        .typeError('El período de rotación debe ser un número')
        .optional()
        .nullable()
        .positive('El período de rotación debe ser un número positivo')
        .min(1, 'El período de rotación debe tener al menos 1'),

    periodoOrbital: number()
        .typeError('El período orbital debe ser un número')
        .optional()
        .nullable()
        .positive('El período orbital debe ser un número positivo')
        .min(1, 'El período orbital debe tener al menos 1 caracter'),

    gravedad: string()
        .optional()
        .nullable()
        .min(1, 'La, gravedad debe tener al menos 1 caracter'),

    poblacion: number()
        .typeError('La población debe ser un número')
        .optional()
        .nullable()
        .positive('La población debe ser un número positivo')
        .min(1, 'La población debe tener al menos 1'),

    clima: string()
        .optional()
        .nullable()
        .min(3, 'El clima debe tener al menos 3 caracteres')
        .max(50, 'El clima no debe exceder los 50 caracteres'),

    terreno: string()
        .optional()
        .nullable()
        .min(3, 'El terreno debe tener al menos 3 caracteres')
        .max(50, 'El terreno no debe exceder los 50 caracteres'),

    porcentajeSuperficieAgua: number()
        .typeError('El porcentaje de superficie cubierta por agua debe ser un número')
        .optional()
        .nullable()
        .positive('El porcentaje de superficie cubierta por agua debe ser un número positivo')
        .min(1, 'El porcentaje de superficie cubierta por agua debe tener al menos 1 caracter')
});