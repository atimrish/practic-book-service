

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


const form_add_author = document.querySelector('#add_author');

form_add_author.onsubmit = (e) => {
    e.preventDefault();
    let surname = form_add_author.querySelector('input#surname').value;
    let name = form_add_author.querySelector('input#name').value;
    let patronymic = form_add_author.querySelector('input#patronymic').value;
    let avatar = form_add_author.querySelector('input#avatar').files[0];



    const formData = new FormData();
    formData.append('surname', surname);
    formData.append('name', name);
    formData.append('patronymic', patronymic);
    formData.append('avatar', avatar);


    addAuthor(formData);


};


const form_add_book = document.querySelector('#add_book');

getAllGenres();
getAuthorsAndSelectAdd();

form_add_book.onsubmit = (e) => {
    e.preventDefault();
    let title = form_add_book.querySelector('input#title').value;
    let description = form_add_book.querySelector('input#description').value;
    let year_of_issue = form_add_book.querySelector('input#year_of_issue').value;
    let author_id = form_add_book.querySelector('select#author_id').value;
    let genre_id = form_add_book.querySelector('select#genre_id').value;
    let image = form_add_book.querySelector('input#image').files[0];

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('year_of_issue', year_of_issue);
    formData.append('author_id', author_id);
    formData.append('genre_id', genre_id);
    formData.append('image', image);


    addBook(formData);

}


















async function getAllGenres() {
    try {
        const genre_select = form_add_book.querySelector('select#genre_id');
        let res = await fetch('http://practic-book-service/genre');
        res = await res.json();

        res.forEach(value => {
            genre_select.innerHTML += `<option value="${value.id}">${value.title}</option>`
        });

    }
    catch (error) {
        console.log(error);
    }
}



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

async function getAuthorsAndSelectAdd() {
    try {
        const author_select = form_add_book.querySelector('select#author_id');
        let res = await fetch('http://practic-book-service/authors');
        res = await res.json();
        res.forEach(value => {
            author_select.innerHTML += `<option value="${value.id}">${value.surname} ${value.name}</option>`;
        });

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



async function addBook(formData) {

    try {
        let res = await fetch('http://practic-book-service/books', {
            method: 'POST',
            body: formData
        });

    res = await res.json();

    if (res.status) {
        pushNotice('success', 'Операция выполнена успешно');
    } else {
        pushNotice('error', 'Ошибка');
    }

    }
    catch (e) {
        pushNotice('error', e);
    }




}


async function addAuthor(formData) {


    let res = await fetch('http://practic-book-service/authors', {
        method: 'POST',
        body: formData
    });
    res = await res.json();

    if (res.status) {
        pushNotice('success', 'Операция выполнена успешно');
    } else {
        pushNotice('error', 'Ошибка');
    }


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

async function checkLogin(login) {
    const loginFormData = new FormData();
    loginFormData.append('login', login);

    let res = await fetch('http://practic-book-service/logincheck', {
        method: 'POST',
        body: loginFormData
    });
    res = await res.json();

    console.log(res);
}



function pushNotice(type ,message) {

    const notice = document.createElement('div');

    switch (type) {
        case 'warning':
            notice.classList.add('push-notice-warning');
            notice.classList.add('push-notice-animation');
            notice.innerHTML = `<div class="notice-icon-warning">!</div>
            <div class="notice-body">${message}</div>`;
            break;
        case 'success':
            notice.classList.add('push-notice-success');
            notice.classList.add('push-notice-animation');
            notice.innerHTML = `<div class="notice-icon-success">V</div>
            <div class="notice-body">${message}</div>`;
            break;
        case 'error':
            notice.classList.add('push-notice-error');
            notice.classList.add('push-notice-animation');
            notice.innerHTML = `<div class="notice-icon-error">X</div>
            <div class="notice-body">${message}</div>`;
            break;
        case 'info':
            notice.classList.add('push-notice-info');
            notice.classList.add('push-notice-animation');
            notice.innerHTML = `<div class="notice-icon-info">i</div>
            <div class="notice-body">${message}</div>`;
            break;
    }



    document.body.appendChild(notice);

    setTimeout(() => {
        notice.remove();
    }, 4800);


}



