import * as service from "../services/product.services.js";

export const getAll = async (req, res, next) => {
    try {
        const { page, limit, price, sort } = req.query;
        const response = await service.getAll(page, limit, price, sort);
        if (sort !== undefined) {
            let urlNext = `http://localhost:8080/products?page=${response.nextPage}`
            return urlNextSort = urlNext + `&sort=${sort}`;
        };
        if (sort!== undefined) {
            let urlPrev = `http://localhost:8080/products?page=${response.prevPage}`
            return urlPrevSort = urlPrev + `&sort=${sort}`
        };
        const next = response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null;
        res.status(200).json({
            status: 'success',
            payload: response.docs,
            totalPages: response.totalDocs,
            nextPage: response.nextPage,
            prevPage: response.prevPage,
            page,
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            next,
            prev
        });
    } catch (error) {
        next(error.message);
    };
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if (!response) res.status(404).json({ msg: "No se ecuentra el producto solicitado" });
        else res.status(200).json(response);
    } catch (error) {
        next(error.message);
    };
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) res.status(404).json({ msg: "A ocurrido un error al intentar crear el producto solicitado" });
        else res.status(200).json(newProd);
    } catch (error) {
        next(error.message);
    };
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) res.status(404).json({ msg: "A ocurrido un error al intentar actualizar el producto solicitado" });
        else res.status(200).json(prodUpd);
    } catch (error) {
        next(error.message);
    };
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if (!prodDel) res.status(404).json({ msg: "A ocurrido un error al intentar eliminar el producto solicitado" });
        else res.status(200).json({ msg: `El producto ${id} fue eliminado` });
    } catch (error) {
        next(error.message);
    };
};