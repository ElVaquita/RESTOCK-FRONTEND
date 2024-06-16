import axios from "axios";

const PRODUCT_URL = "http://localhost:8000/products"


export const createProductBack = async ({name, sku, stock, price, category, description}) => {
    try {
        const response = await axios.post(`${PRODUCT_URL}`,{
            name: name,
            sku: sku,
            stock: stock,
            price: price,
            category: category,
            description: description
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

export const getProductBack = async ({id}) => {
    try {
        const response = await axios.get(`${PRODUCT_URL}/${id}`);

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
