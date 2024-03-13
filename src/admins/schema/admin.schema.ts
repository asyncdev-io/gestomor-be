// administrator.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Client } from 'src/clients/schema/client.schema';

@Schema()
export class Administrator {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: "Client"}]})
  clients: Client[]

}

export type AdministratorDocument = Administrator & Document;
export const AdministratorSchema = SchemaFactory.createForClass(Administrator);
