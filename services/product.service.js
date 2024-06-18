import axios from "axios";

const PRODUCT_URL = "http://localhost:8000/products"


export const createProductBack = async ({name, sku, stock, price, category, description, accessToken}) => {
    try {
        const response = await axios.post(`${PRODUCT_URL}`,{
            name: name,
            sku: sku,
            stock: stock,
            price: price,
            category: category,
            description: description
        },{
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
        console.log("Product has been created successfully");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to create the product");
    }
}

export const getAllProductsBack = async ({accessToken}) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/product/all`, {
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
        console.log("Looking for products");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found products");
    }
}

export const getProductByIDBack = async ({id, accessToken}) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/${id}`, {
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
        console.log("Looking for a product");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found a product");
    }
}

export const getProductByNameBack = async ({name, accessToken}) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/product/name`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            params: {name:name}
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for a product by name");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found a product by name");
    }
}


export const getProductByCategoryBack = async ({category, accessToken}) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/product/category`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
            },
            params: {category:category}
        });

        const responseData = response.data;

        if (responseData.status !== 200 && responseData.status !== 201) {
            throw new Error(`An error has occurred: ${responseData.error.join(', ')}`);
        }
        console.log("Looking for a product by category");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to found a product by category");
    }
}

export const updateProductBack = async ({id, product, accessToken}) => {
    try {
        const response = await axios.post(`${PRODUCT_URL}/product/update`,{
            id:id,
            product: product
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
        console.log("Updating a product");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to update a product");
    }
}

export const deleteProductBack = async ({id,accessToken}) => {
    try {
        const response = await axios.delete(`${PRODUCT_URL}/delete/${id}`, {
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
        console.log("Deleting a product");
        return responseData; 
    } catch (error){
        console.error(error);
        throw new Error("An error has occurred: Failed to delete a product");
    }
}



