import { string } from 'yup';

const peliculaSchema = Yup.object().shape({
    titulo: string()
        .required('El título es obligatorio')
        .min(2, 'El título debe tener al menos 2 caracteres')
        .max(100, 'El título no debe exceder los 100 caracteres'),

    director: string()
        .required('El director es obligatorio')
        .min(2, 'El director debe tener al menos 2 caracteres')
        .max(50, 'El director no debe exceder los 50 caracteres'),

    productor: string()
        .required('El productor es obligatorio')
        .min(2, 'El productor debe tener al menos 2 caracteres')
        .max(50, 'El productor no debe exceder los 50 caracteres')
});