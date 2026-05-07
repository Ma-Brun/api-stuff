import { Injectable } from '@nestjs/common';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
    products: Product[] = [];

    addProduct(prod : Product) {
        this.products.push(prod);
    }

    newProduct(name: string, description: string, price: number) {
        const id = new Date().getTime();
        const newProd = new Product(id, name, description, price);
        this.addProduct(newProd);
        return id;
    }
}
