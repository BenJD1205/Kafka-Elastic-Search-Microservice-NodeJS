import { OrderWithLineItems } from "src/types/message.types";
import { ICatalogRepository } from "../interface/catalogRepository.interface";

export class CatalogService {

    private _repository: ICatalogRepository;
    constructor(repository: ICatalogRepository) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const data = await this._repository.create(input);
        if (!data.id) {
            throw new Error('unable to create product')
        }
        return data;
    }

    async updateProduct(input: any) {
        const data = await this._repository.update(input);
        if (!data.id) {
            throw new Error('unable to update product')
        }
        //emit event to update record in ElasticSearch
        return data;
    }

    async getProducts(limit: number, offset: number) {
        const data = await this._repository.find(limit, offset);
        return data;
    }

    async getProduct(id: number) {
        const data = await this._repository.findOne(id)
        return data;
    }

    async deleteProduct(id: number) {
        const res = await this._repository.delete(id);
        //delete record from ElasticSearch
        return res;
    }

    async getProductStock(ids: number[]) {
        const products = await this._repository.findStock(ids);
        if (!products) {
            throw new Error('unable to find product stock details');
        }
        return products;
    }

    async handleBrokerMessage(message: any) {
        console.log("Catalog Service received message", message);
        const orderData = message.data as OrderWithLineItems;
        const { orderItems } = orderData;
        orderItems.forEach((async (item) => {
            console.log("Updating stock for product", item.productId, item.qty)
            const product = await this.getProduct(item.productId);
            if (!product) {
                console.log("Product not found during stock update for create order", item.productId)
            } else {
                //update stock
                const updatedStock = product.stock - item.qty;
                await this.updateProduct({ ...product, stock: updatedStock })
            }
            //perform stock update operation
        }))
        //perform action based
    }
}