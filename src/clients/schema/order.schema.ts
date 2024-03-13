// order.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Documents } from './docs.schema';
import mongoose from 'mongoose';

@Schema()
export class Order {
  @Prop({ required: true })
  status: 'created' | 'pendingVerification' | 'inProgress' | 'pendingPayment' | 'done';

  @Prop({ required: true })
  procedureName: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Documents"}]})
  documents: Documents[]
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
