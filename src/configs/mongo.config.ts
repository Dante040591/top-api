import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = (configService: ConfigService): MongooseModuleOptions => {
  const login = configService.get<string>('MONGO_LOGIN');
  const password = configService.get<string>('MONGO_PASSWORD');
  const host = configService.get<string>('MONGO_HOST');
  const port = configService.get<string>('MONGO_PORT');
  const authdatabase = configService.get<string>('MONGO_AUTHDATABASE');

  return {
    uri: `mongodb://${login}:${password}@${host}:${port}/${authdatabase}?retryWrites=true&w=majority`,
  };
};
