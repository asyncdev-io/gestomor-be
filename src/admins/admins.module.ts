import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { Mongoose, MongooseError } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Administrator, AdministratorSchema } from './schema/admin.schema';
import { Client, ClientSchema } from 'src/clients/schema/client.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Administrator.name,
      schema: AdministratorSchema
    },
    {
      name: Client.name,
      schema: ClientSchema
    },
    
  ]),
  JwtModule.register({
    secret: "SECRET",
    signOptions: {expiresIn: "10h"}
  })],

  controllers: [AdminsController],
  providers: [AdminsService, JwtStrategy],
})
export class AdminsModule {}
