import jwt from 'jwt-simple';

describe('Routes Books', () => {
  let token;
  const Books = app.datasource.models.Books;
  const Users = app.datasource.models.Users;
  const jwtSecret = app.config.jwtSecret;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  beforeEach((done) => {
    Users
    .destroy({ where: {} })
    .then(() => Users.create({
      name: 'Ronaldo',
      email: 'ronaldo@mail.com',
      password: 'rea123',
    }))
    .then((user) => {
      Books
      .destroy({ where: {} })
      .then(() => Books.create(defaultBook))
      .then(() => {
        token = jwt.encode({ id: user.id }, jwtSecret);
        done();
      });
    });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      const booksList = joi.array().items(joi.object().keys({
        id: joi.number(),
        name: joi.string(),
        description: joi.string(),
        created_at: joi.date().iso(),
        updated_at: joi.date().iso(),
      }));
      request
      .get('/books')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        joiAssert(res.body, booksList);
        done(err);
      });
    });
  });

  describe('Route GET /books/{id}', () => {
    it('should return a book', (done) => {
      const book = joi.object().keys({
        id: joi.number(),
        name: joi.string(),
        description: joi.string(),
        created_at: joi.date().iso(),
        updated_at: joi.date().iso(),
      });
      request
      .get('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        joiAssert(res.body, book);
        done(err);
      });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = { id: 2, name: 'New Book', description: 'Default description' };
      const book = joi.object().keys({
        id: joi.number(),
        name: joi.string(),
        description: joi.string(),
        created_at: joi.date().iso(),
        updated_at: joi.date().iso(),
      });
      request
      .post('/books')
      .set('Authorization', `JWT ${token}`)
      .send(newBook)
      .end((err, res) => {
        joiAssert(res.body, book);
        done(err);
      });
    });
  });

  describe('Route PUT /books', () => {
    it('should update a book', (done) => {
      const updateBook = { name: 'Book Updated' };
      const updatedCount = joi.array().items(1);
      request
      .put('/books/1')
      .set('Authorization', `JWT ${token}`)
      .send(updateBook)
      .end((err, res) => {
        joiAssert(res.body, updatedCount);
        done(err);
      });
    });
  });

  describe('Route DELETE /books', () => {
    it('should delete a book', (done) => {
      request
      .delete('/books/1')
      .set('Authorization', `JWT ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);
        done(err);
      });
    });
  });
});
