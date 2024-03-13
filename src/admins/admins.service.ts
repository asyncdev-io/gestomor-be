import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { Administrator } from './schema/admin.schema';
import { CreateAuthDto } from './dto/register.dto';
import { LoginAuthDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AdminsService {
  
  constructor(
    @InjectModel(Administrator.name) private readonly AuthUserModel: Model<Administrator>,
    private jwtService: JwtService
  ) {}

  async register(userObject: CreateAuthDto): Promise<Administrator> {
    try {
      const { email, password } = userObject;

      // Check if the user already exists in the database
      const existingUser = await this.AuthUserModel.findOne({ email });
      if (existingUser) {
        throw new ConflictException('User already exists');
      }

      // Hash the password
      const hashPassword = await hash(password, 10);

      // Create a new user 
      const newUser = new this.AuthUserModel({ ...userObject, password: hashPassword });
      return await newUser.save();

    } catch (error) {
      throw new Error('Error while registering user');
    }
  }

  async login(userObject: LoginAuthDto) {
    
    //Get the email and password from the body
    const {email, password} = userObject
    const findUser = await this.AuthUserModel.findOne({email})

    //check if users exists logic
    if(!findUser) throw new HttpException("USER NOT FOUND", 404);

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword) throw new HttpException("PASSWORD INVALID", 403);

    //Generate Token logic
    const payload = { sub: findUser._id, username: findUser.nombre, email: findUser.email };

  
    return {
      findUser,
      access_token: await this.jwtService.signAsync(payload)
    }
    
  }

  async GetInfoAdmin(id: string): Promise<Administrator | null> {
    try {
      return await this.AuthUserModel.findById(id).exec();
    } catch (error) {
      throw new Error('Error while getting Admin information');
    }
  }
}