import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Post('add')
    async addProduct(
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('price') price: number,
    )
    {
    const idOfProd = await this.productsService.addProduct(name, description, price);
    return {id: idOfProd };
    }
    @Get()
    async getAllProducts() {
        return await this.productsService.getAllProducts();
    }
    @Get(":name")
    async getProduct(@Param('name') name: string) {
        return await this.productsService.getSingleProduct(name);
    }
    @Patch(":name")
    async patchProduct(@Param('name') name: string, @Body('newName') newName: string, @Body('description') description: string, @Body('price') price: number) {
        return await this.productsService.patchProduct(name, newName, description, price);
    }
    @Delete(":name")
    async deleteProduct(@Param('name') name: string) {
        await this.productsService.deleteProduct(name);
        return { message: 'Product deleted successfully' };
    }
    @Post('add-filler')
    async addFillerProducts() {
        await this.productsService.addFillerProducts();
        return { message: 'Filler products added successfully' };
    }
}



