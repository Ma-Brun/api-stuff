import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { mongooseSchema } from './product.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Product', schema: mongooseSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}