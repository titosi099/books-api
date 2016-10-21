import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('shoud return a list of books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getAll()
             .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get a book: getById()', () => {
    it('shoud return a book', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ',
      }];

      td.when(Books.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.getById({ id: 1 })
             .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('POST a book: create()', () => {
    it('shoud create a book', () => {
      const Books = {
        create: td.function(),
      };
      const requestBody = {
        name: 'New Book',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ',
      }];

      td.when(Books.create(requestBody)).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.create(requestBody)
             .then((response) => {
               expect(response.data).to.be.eql(expectedResponse);
               expect(response.statusCode).to.be.eql(201);
             });
    });
  });

  describe('PUT a book: update()', () => {
    it('shoud update a book', () => {
      const Books = {
        update: td.function(),
      };
      const requestBody = {
        id: 1,
        name: 'Update Book',
      };
      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '2016-08-06T23:55:36.69ZZ',
        updated_at: '2016-08-06T23:55:36.69ZZ',
      }];

      td.when(Books.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);
      return booksController.update(requestBody, { id: 1 })
             .then((response) => {
               expect(response.data).to.be.eql(expectedResponse);
             });
    });
  });

  describe('DELETE a book: destroy()', () => {
    it('shoud delete a book', () => {
      const Books = {
        destroy: td.function(),
      };

      td.when(Books.destroy({ where: { id: 1 } })).thenResolve({});

      const booksController = new BooksController(Books);
      return booksController.delete({ id: 1 })
             .then((response) => {
               expect(response.statusCode).to.be.eql(204);
             });
    });
  });
});
