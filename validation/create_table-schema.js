import * as Yup from 'yup';

export const createTableSchema = Yup.object().shape({
    name: Yup.string()
        .matches(/^Mesa\s.+$/, "El nombre debe comenzar con 'Mesa '")
        .min(4, "Debe tener un minimo de 3 caracteres")
        .required("Este campo es obligatorio"),
    quantity: Yup.number()
        .min(1, "Debe indicar una cantidad")
        .max(6, "El maximo es de 6 personas")
        .required("Este campo es obligatorio")
        .typeError("La cantidad debe ser un número válido"),
    state: Yup.string()
        .required("Este campo es obligatorio"),
});