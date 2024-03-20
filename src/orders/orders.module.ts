import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Client, ClientSchema } from 'src/clients/schema/client.schema';
import { OrderSchema, Order } from 'src/clients/schema/order.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([
    {
      name:Order.name,
      schema: OrderSchema
    },
    {
      name: Client.name,
      schema: ClientSchema
    }
  ])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
