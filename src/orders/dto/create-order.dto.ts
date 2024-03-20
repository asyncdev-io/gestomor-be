// create-order.dto.ts
import { IsString, IsArray, IsEnum, IsMongoId } from 'class-validator';

export class CreateOrderDto {
  @IsEnum(['created', 'pendingVerification', 'inProgress', 'pendingPayment', 'done'])
  status: 'created' | 'pendingVerification' | 'inProgress' | 'pendingPayment' | 'done';

  @IsString()
  procedureName: string;

  @IsArray()
  documents: string[]; // Array de URLs de documentos

  @IsMongoId()
  clientId: string; // ID del cliente asociado a la orden
}
