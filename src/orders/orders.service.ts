import { Injectable, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/clients/schema/order.schema';
import { Model } from 'mongoose';
import { Client } from 'src/clients/schema/client.schema';
import { NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class OrdersService {

  constructor(@InjectModel(Order.name) private orderModel:Model<Order>, @InjectModel(Client.name) private clientModel:Model<Client>){}

  //ESTE SERVICIO SERA PARA DESARROLLO, EL CUAL VA A GUARDAR UN FILE EN LOCAL COMO PRUEBA
  //HABRA OTRO SERVICIO PARA DEPLOY QUE SERA CON S3
  //PENDIENTE: CREA LA ORDEN, PERO NO SE GUARDA EL FILE EN POSTMAN.

  //TODO: TERMINAR LOS DEMAS SERVICES, TRAER POR ID, TRAER POR ID DEL CLILENTE(ESO SE HARA EN LA CARPETA DE CLIENTS)
  //ACTUALIZAR Y ELIMINAR 

  

  @UseInterceptors(
    FileInterceptor(
       "file",
       {
        storage: diskStorage({
          destination: "./uploads",
          filename: function(req, file, cb){
            cb(null, file.originalname+ "-"+ Date.now()+ ".pdf")
          }
        })
       }
    )
  )

  async create(@UploadedFile() file: Express.Multer.File,createOrderDto: CreateOrderDto): Promise<string> {
    const order = new this.orderModel(createOrderDto);

    const client = await this.clientModel.findById(order.clientId);

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    client.orders.push(order); 
    await client.save();

    const newOrder =order.save();

    if (newOrder && file) {
      return `Order and file saved successfully: Order ID ${(await newOrder).id}, File: ${file.originalname}`;
    } else {
      return 'Order saved successfully';
    }

  }

  //PENDIENTE

  async createOrderDeploy(createOrderDto: CreateOrderDto){
    return "this is the service with S3"
  }

  async findAll(): Promise<Order[]> {
    return this.orderModel.find().exec()
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
