import { IsString, IsDate, IsPhoneNumber, IsArray } from 'class-validator';


export class UpdateClientDto {

  @IsString()
  name?: string;

  
  @IsDate()
  birthDate?: Date;

  
  @IsPhoneNumber()
  phoneNumber?: string;

  
 
}
