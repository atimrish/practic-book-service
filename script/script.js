
console.log('adad');

getBooks();
// getBook(3);
getAuthors();
// getAuthor(1);
// getUsers();
// getUser(1);
// getRatings();
// getRatingByBookId(4);
// getRatingByUserId(2);
// getComments();
// getCommentById(4)
// getCommentByBookId(311);
// getCommentByUserId(1211);
// getCommentByUserIdAndBookId(2,3);


// addBook();
// addAuthor();
// addUser();
// addRating();
// addComment();


// updateBook(5);
// updateAuthor(2);
// updateUser(1);
// updateRating(1, 7);
// updateComment(1);


// deleteBook(5);
// deleteAuthor(2);
// deleteUser(1);
// deleteRating(1,7);
// deleteComment(2);


async function getBooks() {
    try {
        let res = await fetch('http://practic-book-service/books');
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

async function getBook(id) {
    try {
        let res = await fetch(`http://practic-book-service/books/${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getAuthors() {
    try {
        let res = await fetch('http://practic-book-service/authors');
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

async function getAuthor(id) {
    try {
        let res = await fetch(`http://practic-book-service/authors/${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

async function getUsers() {
    try {
        let res = await fetch('http://practic-book-service/users');
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getUser(id) {
    try {
        let res = await fetch(`http://practic-book-service/users/${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

async function getRatings() {
    try {
        let res = await fetch('http://practic-book-service/rating');
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getRatingByBookId(id) {
    try {
        let res = await fetch(`http://practic-book-service/rating/books/${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getRatingByUserId(id) {
    try {
        let res = await fetch(`http://practic-book-service/rating/users/${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}

async function getComments() {
    try {
        let res = await fetch('http://practic-book-service/comments');
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getCommentById(id) {
    try {
        let res = await fetch(`http://practic-book-service/comments/${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getCommentByBookId(id) {
    try {
        let res = await fetch(`http://practic-book-service/comments?book_id=${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getCommentByUserId(id) {
    try {
        let res = await fetch(`http://practic-book-service/comments?user_id=${id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function getCommentByUserIdAndBookId(user_id, book_id) {
    try {
        let res = await fetch(`http://practic-book-service/comments?user_id=${user_id}&book_id=${book_id}`);
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}



async function addBook() {

    let formData = new FormData();
    formData.append('title', 'test_js');
    formData.append('image', 'test_js');
    formData.append('description', 'test_js');
    formData.append('year_of_issue', '2022');
    formData.append('author_id', '1');
    formData.append('genre_id', '3');


    try {
        let res = await fetch('http://practic-book-service/books', {
            method: 'POST',
            body: formData
        });

    }
    catch (e) {
        console.log(e);
    }




}


async function addAuthor() {

    let formData = new FormData();
    formData.append('surname', 'test_js');
    formData.append('name', 'test_js');
    formData.append('patronymic', 'test_js');

    let res = fetch('http://practic-book-service/authors', {
        method: 'POST',
        body: formData
    });

}


async function addUser() {

    let formData = new FormData();
    formData.append('surname', 'test_js');
    formData.append('name', 'test_js');
    formData.append('patronymic', 'test_js');
    formData.append('login', 'test_js');
    formData.append('password', 'test_js');
    formData.append('avatar', 'test_js');

    let res = fetch('http://practic-book-service/users', {
        method: 'POST',
        body: formData
    });

}


async function addRating() {

    let formData = new FormData();
    formData.append('user_id', '1');
    formData.append('book_id', '7');
    formData.append('value', '3');

    let res = await fetch('http://practic-book-service/rating', {
        method: 'POST',
        body: formData
    });

    res = res.json();
    console.log(res);

}


async function addComment() {

    let formData = new FormData();
    formData.append('description', 'test_js');
    formData.append('user_id', '1');
    formData.append('book_id', '4');

    let res = await fetch('http://practic-book-service/comments', {
        method: 'POST',
        body: formData
    });

    res = res.json();
    console.log(res);

}


async function updateBook(id) {
    let data = {
        title: 'test-js',
        image: 'test-js',
        description: 'test-js',
        year_of_issue: '2012',
        author_id: '2',
        genre_id: '4',
        rating: '3'
    }

    let res = await fetch(`http://practic-book-service/books/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    console.log(res)

}


async function updateAuthor(id) {
    let data = {
        surname: 'test-js',
        name: 'test-js',
        patronymic: 'test-js'
    }

    let res = await fetch(`http://practic-book-service/authors/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    console.log(res)
}


async function updateUser(id) {
    let data = {
        surname: 'test-js',
        name: 'test-js',
        patronymic: 'test-js'
    }

    let res = await fetch(`http://practic-book-service/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    console.log(res)
}


async function updateRating(user_id, book_id) {
    let data = {
        user_id: user_id,
        book_id: book_id,
        value: '10'
    }

    let res = await fetch('http://practic-book-service/rating', {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    console.log(res)
}


async function updateComment(id) {
    let data = {
        description: 'test-js-updated'
    }

    let res = await fetch(`http://practic-book-service/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    console.log(res)
}


async function deleteBook(id) {
    let res = await fetch(`http://practic-book-service/books/${id}`, {
        method: 'DELETE'
    });
    res = await res.json();

    console.log(res);
}


async function deleteAuthor(id) {
    let res = await fetch(`http://practic-book-service/authors/${id}`, {
        method: 'DELETE'
    });
    res = await res.json();

    console.log(res);
}


async function deleteUser(id) {
    let res = await fetch(`http://practic-book-service/users/${id}`, {
        method: 'DELETE'
    });
    res = await res.json();

    console.log(res);
}


async function deleteRating(user_id, book_id) {
    let data = {
        user_id: user_id,
        book_id: book_id
    }


    let res = await fetch('http://practic-book-service/rating', {
        method: 'DELETE',
        body: JSON.stringify(data)
    });
    res = await res.json();

    console.log(res);
}


async function deleteComment(id) {
    let res = await fetch(`http://practic-book-service/comments/${id}`, {
        method: 'DELETE'
    });
    res = await res.json();

    console.log(res);
}