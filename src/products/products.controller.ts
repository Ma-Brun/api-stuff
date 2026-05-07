import { Controller, Post, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
    @Post()
    addProduct(@Body() prodTitle: string, @Body() prodDescription: string, @Body() prodPrice: number): any {
        const idOfProd = this.productsService.newProduct(prodTitle, prodDescription, prodPrice);
        return {id: idOfProd };
    }
}



