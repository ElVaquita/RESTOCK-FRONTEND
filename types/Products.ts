export type Product = {
    id: number;
    name: string;
    sku: string;
    stock: number;
    price: number;
    category: string;
    description: string;
    image?: string;
}

export type OrderItem = {
    productId: number;
    quantity: number;
    modifications: string;
    productName:string;
    pricePerUnit: number;
    totalPrice: number;
}

export type Order = {
    orderItems: OrderItem[];
    userId: number;
    nameTable: string;
    email: string;
}

export type Sale = {
    id: number;
    userName: string;
    tableName: string;
    date: string;
    tip: number;
    totalPrice: number;
    products: OrderItem[];
};
