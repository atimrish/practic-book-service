const book_add_form = document.querySelector('#book_add_form');
const genre_container = document.querySelector('.drag-n-drop-genre-body');
const author_container = document.querySelector('.drag-n-drop-author-body');

const bookAddFormData = new FormData();
bookAddFormData.append('title', '');
bookAddFormData.append('year_of_issue', '');
bookAddFormData.append('description', '');
bookAddFormData.append('image', '');
bookAddFormData.append('author_id', '');
bookAddFormData.append('genre_id', '');


book_add_form.onsubmit = async (e) => {
    e.preventDefault();
    bookAddFormData.set('title', book_add_form.querySelector('#title').value);
    bookAddFormData.set('year_of_issue', book_add_form.querySelector('#year_of_issue').value);
    bookAddFormData.set('description', book_add_form.querySelector('#description').value);
    bookAddFormData.set('image', book_add_form.querySelector('#image').files[0]);

    let genres = genre_container.children;
    let authors = author_container.children;

    const genre_id = [];
    const author_id = [];

    for (let genre of genres) {
        genre_id.push(genre.getAttribute('data-genre-id'));
    }

    for (let author of authors) {
        author_id.push(author.getAttribute('data-id'));
    }

    let genre_string = genre_id.join('/');
    let author_string = author_id.join('/');

    bookAddFormData.set('genre_id', genre_string);
    bookAddFormData.set('author_id', author_string);


    try {
        let res = await fetch('http://practic-book-service/books', {
            method: 'POST',
            body: bookAddFormData
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

};



const form_add_author = document.querySelector('#add_author_form');

form_add_author.onsubmit = async (e) => {
    e.preventDefault();
    const addAuthorFormData = new FormData();
    addAuthorFormData.append('surname', form_add_author.querySelector('#author_surname').value);
    addAuthorFormData.append('name', form_add_author.querySelector('#author_name').value);
    addAuthorFormData.append('patronymic', form_add_author.querySelector('#author_patronymic').value);
    addAuthorFormData.append('avatar', form_add_author.querySelector('#author_image').files[0]);

    let res = await fetch('http://practic-book-service/authors', {
        method: 'POST',
        body: addAuthorFormData
    });
    res = await res.json();

    if (res.status) {
        pushNotice('success', 'Операция выполнена успешно');
    } else {
        pushNotice('error', 'Ошибка');
    }

}





