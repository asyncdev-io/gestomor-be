// client.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Order } from './order.schema';
import { Administrator } from 'src/admins/schema/admin.schema';
import mongoose from 'mongoose';


@Schema()
export class Client {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  phoneNumber: string;

//   @Prop({ type: Schema.Types.ObjectId, ref: 'Admin' })
//   administrator: Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }] })
  orders: Order[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true })
  createdBy: Administrator; // Almacena el ID del administrador que creó el cliente

}

export type ClientDocument = Client & Document;
export const ClientSchema = SchemaFactory.createForClass(Client);
