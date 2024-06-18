import axios from "axios";

const ORDER_URL = "http://localhost:8000/orders"

// TABLES

export const createTableBack = async (name, quantity, state, accessToken) => {
    try {
        const response = await axios.post(`${ORDER_URL}/tables/create`,{
            name: name,
            quantity: quantity,
            state: state,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Table has been created successfully");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to create the table");
    }
}

export const getTableByNameBack = async (name, accessToken) => {
    try {
        const response = await axios.get(`${ORDER_URL}/tables/name`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            params: {name: name}
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for a table");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found a table");
    }
}

export const getAllTablesBack = async (accessToken) => {
    try {
        const response = await axios.get(`${ORDER_URL}/tables`,{
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for tables");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found tables");
    }
}

export const updateTableStateBack = async (id, quantity, state, activeOrderId, accessToken) => {
    try {
        const response = await axios.post(`${ORDER_URL}/tables/update`, {
            id:id,
            quantity: quantity,
            state: state,
            activeOrderId: activeOrderId
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Updating table state");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to update table state");
    }
}


// ORDERS

export const createOrderBack = async (products, userId, nameTable, email, accessToken) => {
    try {
        const response = await axios.post(`${ORDER_URL}/create`, {
            products: products,
            userId: userId,
            nameTable: nameTable,
            email: email
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Creating order");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to create an order");
    }
}

export const getOrderByIdBack = async (id, accessToken) => {
    try {
        const response = await axios.get(`${ORDER_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for a order");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found an order");
    }
}

export const getAllOrdersBack = async () => {
    try {
        const response = await axios.get(`${ORDER_URL}`);

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for orders");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found orders");
    }
}


export const updateOrderBack = async (orderId, products, userId, nameTable, email,accessToken) => {
    try {
        const response = await axios.post(`${ORDER_URL}/update/${orderId}`, {
            products:products,
            userId: userId,
            nameTable: nameTable,
            email: email
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Updating order");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to update an order");
    }
}


// SALES

export const createSaleBack = async (userName, tableName, date, tip, totalPrice, products, email,accessToken) => {
    try {
        const response = await axios.post(`${ORDER_URL}/sales/create`, {
            userName:userName,
            tableName: tableName,
            date: date,
            tip:tip,
            totalPrice: totalPrice,
            products: products,
            email:email
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Sale has been created");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to create sale");
    }
}

export const getAllSalesBack = async (accessToken) => {
    try {
        const response = await axios.get(`${ORDER_URL}/sales/all`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for sales");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found sales");
    }
}

export const saleFilterByUserNameBack = async (userName, accessToken) => {
    try {
        const response = await axios.get(`${ORDER_URL}/sales/user`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        },{
            params: {user: userName}
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for a table by name");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found a table");
    }
}

export const saleFilterByDateBack = async (date, accessToken) => {
    try {
        const response = await axios.get(`${ORDER_URL}/sales/date`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            }
        },{
            params: {date: date}
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for a table by date");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found a table");
    }
}


