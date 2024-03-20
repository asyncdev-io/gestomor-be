import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client } from './schema/client.schema';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Administrator } from 'src/admins/schema/admin.schema';
import { NotFoundException } from '@nestjs/common';


//single responsibility principle to add an admin id to the client 
@Injectable()
export class AdminService {
  constructor(@InjectModel(Administrator.name) private adminModel: Model<Administrator>) {}

  async addClientToAdmin(adminId: string, client: Client): Promise<Administrator> {
    const admin = await this.adminModel.findById(adminId).populate("clients");

    if(!admin){
      throw new NotFoundException('Admin not found');
    }

    admin.clients.push(client);
    await admin.save();

    await admin.populate('clients');
  
    return admin;
  }

  async removeClientFromAdmin(){
    //pendiente
  }
}


//all client service and methods
@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private userModel: Model<Client>,
    @InjectModel(Administrator.name) private adminModel: Model<Administrator>,
    private adminService: AdminService, // Inyecta el AdminService
  ) {}


  async findAll(): Promise<Client[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<Client> {
    return this.userModel.findById(id).exec();
  }

  async create(createUser: CreateClientDto): Promise<Client> {
    const client = new this.userModel(createUser);
  
    const adminId = createUser.createdBy;

  // Llamar al método addClientToAdmin con el ID del administrador
    await this.adminService.addClientToAdmin(adminId, client);
  
    return client.save();
  }
  

  async findByAdminId(adminId: string): Promise<Client[]> {
    return this.userModel.find({ createdBy: adminId }).exec();
  }

  async delete(id: string): Promise<Client> {
    return this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, updateUser: UpdateClientDto): Promise<Client> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .exec();
    return updatedUser;
  }
}



