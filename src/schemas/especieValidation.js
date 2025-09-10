import { string } from 'yup';

const especieSchema = Yup.object().shape({
    nombre: string()
        .required('El nombre es obligatorio')
        .min(2, 'El nombre debe tener al menos 2 caracteres')
        .max(50, 'El nombre no debe exceder los 50 caracteres'),

    clasificacion: string()
        .optional()
        .nullable()
        .min(3, 'La clasificación debe tener al menos 3 caracteres')
        .max(50, 'La clasificación no debe exceder los 50 caracteres'),

    designacion: string()
        .optional()
        .nullable()
        .min(3, 'La designación debe tener al menos 3 caracteres')
        .max(50, 'La designación no debe exceder los 50 caracteres'),

    estatura: number()
        .typeError('La estatura debe ser un número')
        .optional()
        .nullable() 
        .min(1, 'La estatura debe tener al menos 1 caracter')
        .max(10, 'La estatura no debe exceder los 10 caracteres'),

    esperanzaVida: number()
        .typeError('La esperanza de vida debe ser un número')
        .optional()
        .nullable()
        .min(1, 'La esperanza de vida debe ser al menos 1'),

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

    colorPiel: string()
        .optional()
        .nullable()
        .min(3, 'El color de piel debe tener al menos 3 caracteres')
        .max(20, 'El color de piel no debe exceder los 20 caracteres'),

    lenguaje: string()
        .optional()
        .nullable()
        .min(3, 'El lenguaje debe tener al menos 3 caracteres')
        .max(50, 'El lenguaje no debe exceder los 50 caracteres'),

    planeta: string()
        .optional()
        .nullable()
        .of(string().required('El ID del planeta es obligatorio')),
    
});