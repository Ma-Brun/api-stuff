import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
@Injectable()
export class ProductsService {
    private products: Product[] = [];

    newProduct(name: string, description: string, price: number) {
        const id = new Date().getTime();
        const newProd = new Product(id, name, description, price);
        this.products.push(newProd);
        return id;
    }
    getAllProducts() {
        return [...this.products];
    }

    getSingleProduct(name: string) {
        if (!this.products.find((prod) => prod.name === name)) {
            throw new NotFoundException("Product not found");
        }
        else {
        return {...this.products.find((prod) => prod.name === name)};}
    }
    patchProduct(name: string, description: string, price: number) {
        const productIndex = this.products.findIndex((prod) => prod.name === name);

        if (productIndex === -1) {
            throw new NotFoundException("Product not found");
        }
        else {
            if (description !== undefined) {                    
                this.products[productIndex].description = description;
            }
            if (price !== undefined) {
                this.products[productIndex].price = price;
            }
            if (description === undefined && price === undefined) {
                throw new NotFoundException("No fields to update");
            }
            return {...this.products[productIndex]};
        }
    }

    deleteProduct(name: string) {
        const productIndex = this.products.findIndex((prod) => prod.name === name);
        if (productIndex === -1) {
            throw new NotFoundException("Product not found");
        }
        this.products.splice(productIndex, 1);
    }

    addFillerProducts() {
        this.newProduct("Laptop", "A high-performance laptop for work and gaming.", 1200);
        this.newProduct("Smartphone", "A sleek smartphone with a powerful camera.", 800);
        this.newProduct("Headphones", "Noise-cancelling headphones for immersive sound.", 200);
    }
}
