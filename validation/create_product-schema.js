import * as Yup from 'yup';

export const createProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "Debe tener un minimo de 3 caracteres")
        .required("Este campo es obligatorio"),
    stock: Yup.number()
        .min(1, "Debe indicar una cantidad")
        .required("Este campo es obligatorio")
        .typeError("La cantidad debe ser un número válido"),
    price: Yup.number()
        .min(1, "Debe indicar una cantidad")
        .required("Este campo es obligatorio")
        .typeError("La cantidad debe ser un número válido"),
    category: Yup.string()
        .required("Este campo es obligatorio"),
    description: Yup.string()
        .min(3, "Debe tener un minimo de 3 caracteres")
        .max(256, "Ha excedido el maximo permitido de caracteres")
        .required("Este campo es obligatorio"),
});