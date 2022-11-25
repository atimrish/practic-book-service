
// getBooks();
// getBook(3);
// getAuthors();
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
addComment();

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

