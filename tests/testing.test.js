
const superTest = require("supertest")
const mongoose = require("mongoose")
const {app ,server} = require("../src/index")
const api = superTest(app)
const User = require('../models/user')
const mockData = {}

beforeAll(async () => {
  const users = await User.find({})
  mockData.users = users;
})

describe("Testeango metodo get" , () => {

  it('Sholud return all inf of the BD', async () => {
    const response = await api
                              .get("/api/usuarios")
                                .expect(200)
                                .set('Accept', 'application/json')
                                .expect('Content-Type', /json/);
    expect(response.body).toHaveLength(mockData.users.length)
  });

  it('Testing the first item of the array of the BD ', async () => {
    const response = await  api
            .get("/api/usuarios")
            .expect(200)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);
            expect(response.body[0].nombre).toBe("jona")
  });

  it("should be return only one user", async () => {
    const user = await api
    .get("/api/usuarios/614d16503f4e108d6b324dac")
    .expect(200)
    .expect('Content-Type', /json/);
    expect(user.body).toBeTruthy()
    expect(user.body._id).toBe("614d16503f4e108d6b324dac")
  })
})

describe("Test Register endpoint",() => {
  it.skip("should be register okay",async () => {
      const registerUser = await api
      .post('/api/register')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .send({
          nombre: "jonaachwu",
          apellido : "vinagre",
          password : "jona12",
          email: `jonatanp111a232${mockData.users.length + 1}n@gmail.com`,
          sexo: "hombre",
          edad: 15,
          dni: "39458716"
      })
      expect(registerUser).toBeTruthy();
  })
  it("should be return error " , async () => {
    const registerUser = await api
    .post('/api/register')
    .expect(401)
    .expect('Content-Type', "application/json; charset=utf-8")
    .send({})
    expect(registerUser.text).toBe("\"Campo nombre obligatorio\"")
  })
})

describe("Test login endpoint", () => {
  it("should be login ok" ,async () => {
    const login = await api 
        .post("/api/login")
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .send({ 
          password : "jona12",
          email: `jonatanp111a2329n@gmail.com`,
        })
      expect(login.body.email).toBe("jonatanp111a2329n@gmail.com")
  })
  it("should be return a error about emptys inputs and error 401" , async () => {
    const login = await api
    .post("/api/login")
    .expect(401)
    .expect("Content-Type" , /application\/json/)
    .send({})
    expect(login.text).toBe("\"Campo Email obligatorio\"");
  })

  it("should be return error 404" , async () => {
    const login = await api 
    .post("/api/login")
    .expect(404)
    .expect("Content-Type" , "text/html; charset=utf-8")
    .send({
      email:"s@gmail.com",
      password:"wwwww"
    })
    expect(login.text).toBe("Email y/o password invalidos");
  })
})

afterAll (() => {
  server.close()
  mongoose.connection.close()
})