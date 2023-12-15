import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { productFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalogRepository {
    async create(data: Product): Promise<Product> {
        const product = productFactory.build();
        return Promise.resolve(product);
    }
    async update(data: Product): Promise<Product> {
        const product = productFactory.build();
        return Promise.resolve(product);
    }
    async delete(id: any) {
        const product = productFactory.build();
        return Promise.resolve(product);
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        const products = productFactory.buildList(limit);
        return Promise.resolve(products);
    }
    async findOne(id: number): Promise<Product> {
        const product = productFactory.build();
        return Promise.resolve(product);
    }
}