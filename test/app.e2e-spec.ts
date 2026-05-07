import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/custom-message (POST) sets one custom message', async () => {
    await request(app.getHttpServer())
      .post('/custom-message')
      .send({ message: 'My custom message' })
      .expect(201)
      .expect('My custom message');

    return request(app.getHttpServer())
      .get('/custom-message')
      .expect(200)
      .expect('My custom message');
  });

  it('/custom-message (POST) replaces the existing custom message', async () => {
    await request(app.getHttpServer())
      .post('/custom-message')
      .send({ message: 'First message' })
      .expect(201)
      .expect('First message');

    await request(app.getHttpServer())
      .post('/custom-message')
      .send({ message: 'Second message' })
      .expect(201)
      .expect('Second message');

    return request(app.getHttpServer())
      .get('/custom-message')
      .expect(200)
      .expect('Second message');
  });

  afterEach(async () => {
    await app.close();
  });
});
