import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
    constructor (@InjectModel('Product') private readonly productModel: Model<Product>) {}
    
    async addProduct(name: string, description: string, price: number) {
        const newProd = new this.productModel({ name, description, price });
        const result = await newProd.save();
        return result.id;
    }
    async getAllProducts() {
        const products = await this.productModel.find();
        return products.map((product) => ({
            name: product.name,
            description: product.description,
            price: product.price,
        }));
    }

    async getSingleProduct(name: string) {
        const product = await this.productModel.findOne({ name });

        if (!product) {
            throw new NotFoundException("Product not found");
        }

        return { name: product.name, description: product.description, price: product.price };
    }
    async patchProduct(name: string, newName: string, description: string, price: number) {
        if (newName === undefined && description === undefined && price === undefined) {
            throw new BadRequestException("No fields to update");
        }

        const updateData: Partial<Product> = {};
        if (newName !== undefined) {
            updateData.name = newName;
        }
        if (description !== undefined) {
            updateData.description = description;
        }
        if (price !== undefined) {
            updateData.price = price;
        }

        const updatedProduct = await this.productModel.findOneAndUpdate(
            { name },
            updateData,
            { returnDocument: 'after' },
        );

        if (!updatedProduct) {
            throw new NotFoundException("Product not found");
        }

        return updatedProduct;
    }

    async deleteProduct(name: string) {
        const result = await this.productModel.deleteOne({ name });

        if (result.deletedCount === 0) {
            throw new NotFoundException("Product not found");
        }
    }

    async addFillerProducts() {
        await this.addProduct("Laptop", "A high-performance laptop for work and gaming.", 1200);
        await this.addProduct("Smartphone", "A sleek smartphone with a powerful camera.", 800);
        await this.addProduct("Headphones", "Noise-cancelling headphones for immersive sound.", 200);
    }
}
