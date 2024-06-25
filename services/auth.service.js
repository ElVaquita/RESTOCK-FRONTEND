import axios from "axios";

const AUTH_URL = "http://localhost:8000/auth"

export const getUserBack = async (id, accessToken) => {
    try {
        const response = await axios.get(`${AUTH_URL}/user/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        })

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for an user");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found user");
    }
}

export const loginBack = async ({email, password}) => {
    try {
        const response = await axios.post(`${AUTH_URL}/login`,{
            email: email,
            password: password
        })

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Successful login");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to log in");
    }
}

export const registerBack = async ({name, rut, email, password}) => {
    try {
        const response = await axios.post(`${AUTH_URL}/register`,{
            name: name,
            rut: rut,
            email: email,
            password: password
        })

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Successful register");
        return responseData; 
    } catch (error){
        console.error("An error has occurred: ", error);
        throw new Error("An error has occurred: Failed to register");
    }
}

export const recoveryByEmailBack = async ({email}) => {
    try {
        const response = await axios.post(`${AUTH_URL}/recovery`,{
            email: email
        })

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Email has been sended");
        return responseData; 
    } catch (error){
        console.error("An error has occurred: ", error);
        throw new Error("An error has occurred: Failed to send email");
    }
}

export const verifyCodeBack = async ({email,code}) => {
    try {
        const response = await axios.post(`${AUTH_URL}/verifycode`,{
            email: email,
            code: code
        })

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Code has been verified");
        return responseData; 
    } catch (error){
        console.error("An error has occurred: ", error);
        throw new Error("An error has occurred: Failed to verify the code");
    }
}

export const changePasswordBack = async ({email,code, newPassword, confirmPassword}) => {
    try {
        const response = await axios.post(`${AUTH_URL}/changepassword`,{
            email: email,
            code: code,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        })

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Password has been changed");
        return responseData; 
    } catch (error){
        console.error("An error has occurred: ", error);
        throw new Error("An error has occurred: Failed to change the password");
    }
}