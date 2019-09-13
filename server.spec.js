const server =  require('./api/server');
const request = require('supertest');
const router = require('./auth/auth-router')



describe('server.js', () => {
    
    describe('index route', () => {
      it('should return an OK status code from the index route', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).get('/');
            expect(response.status).toEqual(expectedStatusCode);

      });
      it('should return a JSON object fron the index route', async () => {
        const expectedBody = { api: 'running' };
        const response = await request(server).get('/');
            expect(response.body).toEqual(expectedBody);
      });
  
      it('should return a JSON object fron the index route', async () => {
        const response = await request(server).get('/');
            expect(response.type).toEqual('application/json');
      });
      //REGISTER
      it('should return an CREATED status code from the index route', async () => {
        const expectedStatusCode = 201;
        const response = await request(server).post('/register');
            expect(response.status).toEqual(expectedStatusCode);

      });

      it('should return a JSON object fron the index route', async () => {
        const expectedBody = { status: 'CREATED' };
        const response = await request(server).post('/register');
            expect(response.body).toEqual(expectedBody);
      });

      //LOGIN
      it('should return an OK status code from the index route', async () => {
        const expectedStatusCode = 200;
        const response = await request(server).post('/login');
            expect(response.status).toEqual(expectedStatusCode);
       });
   
        it('should return a JSON object fron the index route', async () => {
        const expectedBody = { status: 'OK' };
        const response = await request(server).post('/login');
            expect(response.body).toEqual(expectedBody);
      }); 

      

    });

  });


  


