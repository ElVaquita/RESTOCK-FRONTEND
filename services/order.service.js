import axios from "axios";

const ORDER_URL = "http://localhost:8000/orders"

// TABLES

export const createTableBack = async ({name, quantity, state}) => {
    try {
        const response = await axios.post(`${ORDER_URL}/tables/create`,{
            name: name,
            quantity: quantity,
            state: state
        })

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

export const getTableByNameBack = async ({name}) => {
    try {
        const response = await axios.get(`${ORDER_URL}/tables/name`,{
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

export const getAllTablesBack = async () => {
    try {
        const response = await axios.get(`${ORDER_URL}/tables`);

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

export const updateTableStateBack = async ({id, quantity, state}) => {
    try {
        const response = await axios.post(`${ORDER_URL}/tables/update`, {
            id:id,
            quantity: quantity,
            state: state
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


// SALES

export const createSaleBack = async ({userName, tableName, date, tip, totalPrice, products}) => {
    try {
        const response = await axios.post(`${ORDER_URL}/sales/create`, {
            userName:userName,
            tableName: tableName,
            date: date,
            tip:tip,
            totalPrice: totalPrice,
            products: products
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

export const getAllSalesBack = async () => {
    try {
        const response = await axios.get(`${ORDER_URL}/sales/all`);

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

export const saleFilterByUserNameBack = async ({userName}) => {
    try {
        const response = await axios.get(`${ORDER_URL}/sales/user`,{
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

export const saleFilterByDateBack = async ({date}) => {
    try {
        const response = await axios.get(`${ORDER_URL}/sales/date`,{
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

