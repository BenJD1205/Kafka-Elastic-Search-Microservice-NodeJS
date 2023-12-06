import { Factory } from "rosie";
import { faker } from '@faker-js/faker';
import { Product } from "../../models/product.model";


export const productFactory = new Factory<Product>()
    .attr("id", faker.number.int({ min: 10, max: 1000 }))
    .attr("name", faker.commerce.productName())
    .attr("description", faker.commerce.productDescription())
    .attr('stock', faker.number.int({ min: 10, max: 100 }))
    .attr('price', +faker.commerce.price())