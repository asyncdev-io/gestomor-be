// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Client } from './client.schema';

@Schema()
export class Order {
  @Prop({ required: true })
  status: 'created' | 'pendingVerification' | 'inProgress' | 'pendingPayment' | 'done';

  @Prop({ required: true })
  procedureName: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }] })
  documents: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client' }) // Referencia al cliente
  clientId: Client; // ID del cliente asociado a la orden
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
