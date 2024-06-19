import * as Yup from 'yup';

export const orderSchema = Yup.object().shape({
    quantityTable: Yup.number()
        .min(1, "Debe indicar una cantidad")
        .max(6, "El maximo es de 6 personas")
        .required("Este campo es obligatorio")
        .typeError("La cantidad debe ser un número válido"),
    email: Yup.string()
        .email('Por favor, ingrese un email valido')
        .required("Este campo es obligatorio"),
});