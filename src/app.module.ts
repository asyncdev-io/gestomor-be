import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import {config} from "./config"
// require('dotenv').config();

@Module({
  imports: [
    AdminsModule, 
    ClientsModule,
    ConfigModule.forRoot({ 
      envFilePath: config[process.env.NODE_ENV] || ".env", 
      load: [config],
      isGlobal: true,

      }), 
    MongooseModule.forRoot(
      "mongodb+srv://eduardourbina:9myniceHEXmEl4UA@gestomor.9kqupvu.mongodb.net/?retryWrites=true&w=majority&appName=gestomor",{
        autoCreate: true, // Crear nuevas colecciones automáticamente (si no existen)
        autoIndex: true, // Crear índices automáticamente para mejorar el rendimiento de las consultas
        
      }),
    OrdersModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
