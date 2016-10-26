import jwt from 'jwt-simple';

describe('Routes Users', () => {
  let token;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;
  const defaultUser = {
    id: 1,
    name: 'Default user',
    email: 'email@mail.com',
    password: '123',
  };

  beforeEach((done) => {
    Users
    .destroy({ where: {} })
    .then(() => Users.create({
      name: 'ronaldo',
      email: 'ronaldo@mail.com',
      password: 'rea123',
    }))
    .then((user) => {
      Users.create(defaultUser)
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
      .get('/users')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body[1].id).to.be.eql(defaultUser.id);
        expect(res.body[1].name).to.be.eql(defaultUser.name);
        expect(res.body[1].email).to.be.eql(defaultUser.email);
        done(err);
      });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
      .get('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.body.id).to.be.eql(defaultUser.id);
        expect(res.body.name).to.be.eql(defaultUser.name);
        expect(res.body.email).to.be.eql(defaultUser.email);
        done(err);
      });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newBook = { id: 2, name: 'New Book', email: 'newemail@mail.com', password: '123' };
      request
      .post('/users')
      .set('Authorization', `JWT ${token}`)
      .set('Authorization', `JWT ${token}`)
      .send(newBook)
      .end((err, res) => {
        expect(res.body.name).to.be.eql(newBook.name);
        expect(res.body.email).to.be.eql(newBook.email);
        done(err);
      });
    });
  });

  describe('Route PUT /users', () => {
    it('should update a user', (done) => {
      const updateUser = { name: 'User Updated', email: 'update@email.com' };
      request
      .put('/users/1')
      .set('Authorization', `JWT ${token}`)
      .send(updateUser)
      .end((err, res) => {
        expect(res.body).to.be.eql([1]);
        done(err);
      });
    });
  });

  describe('Route DELETE /users', () => {
    it('should delete a user', (done) => {
      request
      .delete('/users/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);
        done(err);
      });
    });
  });
});
