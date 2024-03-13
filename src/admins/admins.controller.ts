import {
  Body,
  ConflictException,
  NotFoundException,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { LoginAuthDto } from './dto/login.dto';
import { CreateAuthDto } from './dto/register.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post("register")
  registerUser(@Body() userObject: CreateAuthDto){
    return this.adminsService.register(userObject)
  }

  @Post("login")
  loginUser(@Body() userObject: LoginAuthDto ){
    return this.adminsService.login(userObject)
  }


  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async GetInfo(@Param("id") id: string){
    const info = await this.adminsService.GetInfoAdmin(id)
    if (!info) throw new NotFoundException('Admin does not exist!');
    return info;
  }
}
