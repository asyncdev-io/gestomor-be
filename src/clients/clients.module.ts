import { Module } from '@nestjs/common';
import { ClientService } from './clients.service';
import { ClientController } from './clients.controller';
import { Client, ClientSchema } from "./schema/client.schema"
import { MongooseModule } from '@nestjs/mongoose';
import { Administrator, AdministratorSchema } from 'src/admins/schema/admin.schema';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Client.name,
      schema: ClientSchema
    },
    {
      name: Administrator.name,
      schema: AdministratorSchema
    }
  ])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientsModule {}
