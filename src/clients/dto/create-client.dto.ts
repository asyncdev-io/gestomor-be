import { IsString, IsDate, IsPhoneNumber, IsArray } from 'class-validator';


export class CreateClientDto {
  @IsString()
  name: string;

  @IsDate()
  birthDate: Date;

  @IsPhoneNumber()
  phoneNumber: string;

  @IsString()
  createdBy: string; // Se asume que el ID del administrador es una cadena
}
