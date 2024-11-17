import express, { Request, Response, NextFunction } from 'express';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductRequest, UpdateProductRequest } from '../dto/product.dto';
const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

//endpoints
router.post('/products', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(CreateProductRequest, req.body);
        if (errors) return res.status(400).json(errors);
        const data = await catalogService.createProduct(input);
        return res.status(201).json(data);
    }
    catch (err) {
        const error = err as Error;
        return res.status(500).json(error.message)
    }
})

router.patch('/products/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { errors, input } = await RequestValidator(UpdateProductRequest, req.body);
        const id = parseInt(req.params.id) || 0;
        if (errors) return res.status(400).json(errors);
        const data = await catalogService.updateProduct({ id, ...input });
        return res.status(200).json(data);
    }
    catch (err) {
        const error = err as Error;
        return res.status(500).json(error.message)
    }
})

router.get('/products', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const limit = Number(req.query['limit']);
        const offset = Number(req.query['offset']);
        const data = await catalogService.getProducts(limit, offset);
        return res.status(200).json(data);
    }
    catch (err) {
        const error = err as Error;
        return res.status(500).json(error.message)
    }
})

router.get('/products/:product_id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id } = req.params;
        const data = await catalogService.getProduct(+product_id);
        return res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
})

router.delete('/products/:product_id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { product_id } = req.params;
        const data = await catalogService.deleteProduct(+product_id);
        return res.status(200).json(data);
    }
    catch (err) {
        const error = err as Error;
        return res.status(500).json(error.message)
    }
})

router.post("/products/stock", async (req: Request, res: Response) => {
    try {
        const data = await catalogService.getProductStock(req.body.ids);
        return res.status(200).json(data);
    } catch (error) {
        const err = error as Error;
        return res.status(500).json(err.message)
    }
})

export default router;