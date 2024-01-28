import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { productFactory } from "../utils/fixtures";

export class CatalogRepository implements ICatalogRepository {
    _prismaClient: PrismaClient
    constructor() {
        this._prismaClient = new PrismaClient()
    }

    async create(data: Product): Promise<Product> {
        return this._prismaClient.product.create({
            data,
        })
    }
    async update(data: Product): Promise<Product> {
        return this._prismaClient.product.update({
            where: { id: data.id },
            data
        })
    }
    async delete(id: any) {
        return this._prismaClient.product.delete({
            where: { id: id },
        })
    }
    async find(limit: number, offset: number): Promise<Product[]> {
        return this._prismaClient.product.findMany({
            take: limit,
            skip: offset
        })
    }
    async findOne(id: number): Promise<Product> {
        const product = this._prismaClient.product.findFirst({
            where: { id: id },
        })
        if (product) {
            return Promise.resolve(product);
        }
        throw new Error("product not found");
    }
}