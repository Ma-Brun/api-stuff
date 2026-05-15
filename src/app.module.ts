import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule} from '@nestjs/mongoose';

@Module({
  imports: [ProductsModule, MongooseModule.forRoot("mongodb+srv://new-user:4ip72vondyDBCy2c@cluster0.s0upaf7.mongodb.net/nestjs-demo")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
