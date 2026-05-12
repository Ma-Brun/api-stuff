import { Controller, Post, Body, Get, Param, Patch, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Post('add')
    addProduct(
        @Body('title') title: string,
        @Body('description') description: string,
        @Body('price') price: number,
    )
    {
    const idOfProd = this.productsService.newProduct(title, description, price);
    return {id: idOfProd };
    }
    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }
    @Get(":name")
    getProduct(@Param('name') name: string) {
        return this.productsService.getSingleProduct(name);
    }
    @Patch(":name")
    patchProduct(@Param('name') name: string, @Body('description') description: string, @Body('price') price: number) {
        this.productsService.patchProduct(name, description, price);
        return this.productsService.getSingleProduct(name);
    }
    @Delete(":name")
    deleteProduct(@Param('name') name: string) {
        this.productsService.deleteProduct(name);
        return { message: 'Product deleted successfully' };
    }

}



