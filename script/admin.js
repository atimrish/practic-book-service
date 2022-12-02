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

    } catch (e) {
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


const search_update_author = document.querySelector('#search_update_author');
const update_author_search_result = document.querySelector('#update_author_search_result');
const update_author_form = document.querySelector('#update_author_form');
let update_author_id = '';

insertAuthors(update_author_search_result);


update_author_form.onsubmit = (e) => {
    e.preventDefault();
    const data = {
        surname: update_author_form.querySelector('#author_update_surname').value,
        name: update_author_form.querySelector('#author_update_name').value,
        patronymic: update_author_form.querySelector('#author_update_patronymic').value,
        avatar: update_author_form.querySelector('#author_update_image').files[0]
    }

    console.log(JSON.stringify(data));

};


search_update_author.oninput = async (e) => {
    let input_value = search_update_author.value.toLowerCase();

    update_author_search_result.innerHTML = '';
    let res = await fetch('http://practic-book-service/authors');
    res = await res.json();
    res.forEach(value => {
        let fio = value.name + ' ' + value.surname + ' ' + value.patronymic;
        if (fio.toLowerCase().match(input_value)) {

            update_author_search_result.innerHTML += `
        <div data-author-id="${value.id}"
             data-author-surname="${value.surname}"
             data-author-name="${value.name}"
             data-author-patronymic="${value.patronymic}"
             data-author-image="${value.author_image}"
        >${fio}</div>
        
        `;
        }

    });

    updateAuthorReplaceEvent();


};


async function insertAuthors(elem) {
    elem.innerHTML = '';
    let res = await fetch('http://practic-book-service/authors');
    res = await res.json();
    res.forEach(value => {
        elem.innerHTML += `
        <div data-author-id="${value.id}"
             data-author-surname="${value.surname}"
             data-author-name="${value.name}"
             data-author-patronymic="${value.patronymic}"
             data-author-image="${value.author_image}"
        >${value.name + ' ' + value.surname + ' ' + value.patronymic}</div>
        
        `;
    });

    updateAuthorReplaceEvent();

}


function updateAuthorReplaceEvent() {
    for (let i = 0; i < update_author_search_result.children.length; i++) {
        update_author_search_result.children[i].onclick = (e) => {
            let input_surname = update_author_form.querySelector('#author_update_surname');
            input_surname.value = e.target.getAttribute('data-author-surname');

            let input_name = update_author_form.querySelector('#author_update_name');
            input_name.value = e.target.getAttribute('data-author-name');

            let input_patronymic = update_author_form.querySelector('#author_update_patronymic');
            input_patronymic.value = e.target.getAttribute('data-author-patronymic');

            let input_image = update_author_form.querySelector('#author_update_image');
            input_image.files[0] = e.target.getAttribute('data-author-image');

            update_author_id = e.target.getAttribute('data-author-id');

        }
    }
}


const delete_author_search_input = document.querySelector('#delete_author_search_input');
const delete_author_search_container_result = document.querySelector('.delete_author_search_container_result');
const selected_author = document.querySelector('.selected_author');
const delete_author_form = document.querySelector('#delete_author_form');


delete_author_search_input.oninput = async () => {
    let input_value = delete_author_search_input.value.toLowerCase();

    delete_author_search_container_result.innerHTML = '';

    let res = await fetch('http://practic-book-service/authors');
    res = await res.json();

    res.forEach(value => {
        let fio = value.name + ' ' + value.surname + ' ' + value.patronymic;

        if (fio.toLowerCase().match(input_value)) {
            delete_author_search_container_result.innerHTML += `
                <div data-author-id="${value.id}">${fio}</div>
           `;
        }

    });

    for (let elem of delete_author_search_container_result.children) {
        elem.onclick = (e) => {
            selected_author.innerText = e.target.innerText;
            selected_author.setAttribute('data-author_id', e.target.getAttribute('data-author-id'));
        }
    }


};


delete_author_form.onsubmit = (e) => {
    e.preventDefault();
};


const delete_book_search_input = document.querySelector('#delete_book_search_input');
const delete_book_search_body = document.querySelector('.delete_book_search_body');

delete_book_search_input.oninput = async () => {
    let input_value = delete_book_search_input.value.toLowerCase();

    delete_book_search_body.innerHTML = '';

    let res = await fetch('http://practic-book-service/books');
    res = await res.json();

    res.forEach(value => {
        let full =
            value.book_title + ' - ' +
            value.author_name + ' ' +
            value.author_surname + ' ' +
            value.author_patronymic;

        if (full.toLowerCase().match(input_value)) {

            delete_book_search_body.innerHTML += `
                <div data-book-id="${value.id}">
                    <b>${value.book_title}</b> - <span>
                ${
                value.author_name + ' ' + 
                value.author_surname + ' ' +
                value.author_patronymic
                    }</span>
                </div>
            `;

        }

    });


};





