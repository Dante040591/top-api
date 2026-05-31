import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
  login: 'test@mail.ru',
  password: '123',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;

  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDto)
      .expect(200)
      .then(({ body }: request.Response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        token = body.access_token;
        expect(token).toBeDefined();
      });
  });

  it('/auth/login (POST) - failed password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: '123123' })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND,
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - failed login', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, email: 'testrrere@mail' })
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND,
        error: 'Unauthorized',
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
