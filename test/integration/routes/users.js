describe('Routes Users', () => {
  const Users = app.datasource.models.Users;
  const defaultUser = {
    id: 1,
    name: 'Default user',
    email: 'email@mail.com',
    password: '123',
  };

  beforeEach((done) => {
    Users
    .destroy({ where: {} })
    .then(() => Users.create(defaultUser))
    .then(() => {
      done();
    });
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
      .get('/users')
      .end((err, res) => {
        expect(res.body[0].id).to.be.eql(defaultUser.id);
        expect(res.body[0].name).to.be.eql(defaultUser.name);
        expect(res.body[0].email).to.be.eql(defaultUser.email);
        done(err);
      });
    });
  });

  describe('Route GET /users/{id}', () => {
    it('should return a user', (done) => {
      request
      .get('/users/1')
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
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);
        done(err);
      });
    });
  });
});
