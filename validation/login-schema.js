import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Por favor, ingrese un email valido')
        .required("Este campo es obligatorio"),
    password: Yup.string()
        .min(8, 'Minimo de 8 caracteres')
        .required("Este campo es obligatorio"),
});