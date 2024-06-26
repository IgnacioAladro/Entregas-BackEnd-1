import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const productsDao = new ProductDaoMongoDB();

import CartDaoMongoDB from "../daos/mongodb/cart.dao.js";
const cartDao = new CartDaoMongoDB();



export const getAll = async () => {
    try {
        return await cartDao.getAll();
    } catch (error) {
        console.log(error);
    }
};

export const getById = async (id) => {
    try {
        return await cartDao.getById(id);
    } catch (error) {
        console.log(error);
    }
};

export const create = async () => {
    try {
        const newCart = await cartDao.create();
        if (!newCart) return false;
        else return newCart;
    } catch (error) {
        console.log(error);
    }
};

export const clearCart = async (cartId) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) return null;
        return await cartDao.clearCart(cartId);
    } catch (error) {
        console.log(error);
    }
};

export const update = async (id, obj) => {
    try {
        return await cartDao.update(id, obj);
    } catch (error) {
        console.log(error);
    };
};

export const addProductToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) return null;
        const existProduct = await productsDao.getById(prodId);
        if (!existProduct) return null;
        const productInCart = await cartDao.existProductInCart(cartId, prodId);
        if (productInCart) {
            const quantity = productInCart.products.find(product => product.product.toString() === prodId).quantity + 1;
            return await cartDao.addProductToCart(cartId, prodId, quantity)
        };
        return await cartDao.addProductToCart(cartId, prodId);
    } catch (error) {
        console.log(error);
    };
};

export const removeProductToCart = async (cartId, prodId) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) return null;
        const existProductInCart = await cartDao.existProductInCart(cartId, prodId);
        if (!existProductInCart) return null;
        return await cartDao.removeProductToCart(cartId, prodId);
    } catch (error) {
        console.log(error);
    };
};

export const updateQuantityOfProductsInCart = async (cartId, prodId, quantity) => {
    try {
        const existCart = await getById(cartId);
        if (!existCart) return null;
        const existProductInCart = await cartDao.existProductInCart(cartId, prodId);
        if (!existProductInCart) return null;
        return await cartDao.updateQuantityOfProductsInCart(cartId, prodId, quantity);
    } catch (error) {
        console.log(error);
    };
};