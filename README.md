# practic_book_service

### http_server: nginx
## Routes
### Books
* GET http://practic-book-service/books
* GET http://practic-book-service/books/{id}
* POST http://practic-book-service/books
* PATCH http://practic-book-service/books/{id}
* DELETE http://practic-book-service/books/{id}
### Authors
* GET http://practic-book-service/authors
* GET http://practic-book-service/authors/{id}
* POST http://practic-book-service/authors
* PATCH http://practic-book-service/authors/{id}
* DELETE http://practic-book-service/authors/{id}
### Users
* GET http://practic-book-service/users
* GET http://practic-book-service/users/{id}
* POST http://practic-book-service/users
* PATCH http://practic-book-service/users/{id}
* DELETE http://practic-book-service/users/{id}
### Rating
* GET http://practic-book-service/rating
* GET http://practic-book-service/rating/{id}
* GET http://practic-book-service/rating/books/{id}
* GET http://practic-book-service/rating/users/{id}
* POST http://practic-book-service/rating
* PATCH http://practic-book-service/rating
* DELETE http://practic-book-service/rating
### Comments
* GET http://practic-book-service/comments
* GET http://practic-book-service/comments/{id}
* GET http://practic-book-service/comments?book_id={id}
* GET http://practic-book-service/comments?user_id={id}
* GET http://practic-book-service/comments?user_id={id}&book_id={id}
* POST http://practic-book-service/comments
* PATCH http://practic-book-service/comments
* DELETE http://practic-book-service/comments/{id}