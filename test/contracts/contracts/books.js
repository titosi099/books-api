describe('Routes Books', () => {
  const Books = app.datasource.models.Books;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  beforeEach((done) => {
    Books
    .destroy({ where: {} })
    .then(() => Books.create(defaultBook))
    .then(() => {
      done();
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
      .end((err, res) => {
        expect(res.statusCode).to.be.eql(204);
        done(err);
      });
    });
  });
});
