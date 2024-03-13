import { Injectable } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  //Get token from header
          ignoreExpiration: false,
          secretOrKey: "SECRET",
        });
      }

      async validate(payload: any) {
        return { userId: payload.id, name: payload.nombre, email: payload.email };
      }

}