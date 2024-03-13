import { PartialType } from "@nestjs/swagger";
import { LoginAuthDto } from "./login.dto";
import { IsNotEmpty } from "class-validator";

export class CreateAuthDto extends PartialType(LoginAuthDto) {
    @IsNotEmpty()
    name:string;

    //"We are passing the data from the LoginAuth DTO, and now it includes email, password, and name
}