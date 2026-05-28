import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, AuthSchema } from './user.model';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './strategies/jwt.strategy';
import { getJWTConfig } from '../../src/configs/jwt.config';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: AuthSchema, collection: 'User' }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig,
    }),
    ConfigModule,
    PassportModule,
  ],
  providers: [AuthService, JWTStrategy],
})
export class AuthModule {}
