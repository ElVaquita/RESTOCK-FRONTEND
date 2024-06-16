import * as Yup from 'yup';

// Función para validar el RUT
const validateRUT = (rut) => {
    // Eliminar los puntos y guion
    const cleanRUT = rut.replace(/\./g, '').replace('-', '');

    // Separar el cuerpo y el dígito verificador
    const body = cleanRUT.slice(0, -1);
    const dv = cleanRUT.slice(-1).toUpperCase();

    // Validar el cuerpo del RUT
    if (body.length < 7 || !/^\d+$/.test(body)) {
        return false;
    }

    // Calcular el dígito verificador esperado
    let sum = 0;
    let multiplier = 2;
    for (let i = body.length - 1; i >= 0; i--) {
        sum += parseInt(body[i], 10) * multiplier;
        multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const expectedDV = 11 - (sum % 11);
    const calculatedDV = expectedDV === 11 ? '0' : expectedDV === 10 ? 'K' : expectedDV.toString();

    // Comparar el dígito verificador esperado con el dígito verificador del RUT
    return calculatedDV === dv;
};

export const registerSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Minimo de 3 caracteres')
        .required('Este campo es obligatorio'),
    rut: Yup.string()
        .required('Este campo es obligatorio')
        .test('is-valid-rut', 'RUT inválido', value => value ? validateRUT(value) : false),
    email: Yup.string()
        .email('Por favor, ingrese un email valido')
        .required("Este campo es obligatorio"),
    password: Yup.string()
        .min(8, 'Minimo de 8 caracteres')
        .required("Este campo es obligatorio"),
});
