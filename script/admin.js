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


update_author_form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        surname: update_author_form.querySelector('#author_update_surname').value,
        name: update_author_form.querySelector('#author_update_name').value,
        patronymic: update_author_form.querySelector('#author_update_patronymic').value,
    }


    let res = await fetch(`http://practic-book-service/authors/${update_author_id}`,{
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    if (update_author_id === '') {
        pushNotice('Не выбран автор');
    } else {
        if (res.status) {
            pushNotice('success', res.message);
            let input_surname = update_author_form.querySelector('#author_update_surname');
            input_surname.value = '';

            let input_name = update_author_form.querySelector('#author_update_name');
            input_name.value = '';

            let input_patronymic = update_author_form.querySelector('#author_update_patronymic');
            input_patronymic.value = '';

            update_author_id = '';
        } else {
            pushNotice('error', 'Не удалось изменить автора');
        }
    }

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

            update_author_id = e.target.getAttribute('data-author-id');

        }
    }
}


const delete_author_search_input = document.querySelector('#delete_author_search_input');
const delete_author_search_container_result = document.querySelector('.delete_author_search_container_result');
const selected_author = document.querySelector('.selected_author');
const delete_author_form = document.querySelector('#delete_author_form');

let delete_author_id = '';

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
            delete_author_id = e.target.getAttribute('data-author-id');
        }
    }


};


delete_author_form.onsubmit = async (e) => {
    e.preventDefault();

    if (delete_author_id === '') {
        pushNotice('warning', 'Не выбран автор');
    } else {

        let res = await fetch(`http://practic-book-service/authors/${delete_author_id}`, {
            method: 'DELETE'
        })
        res = await res.json();

        if (res.status) {
            pushNotice('success', res.message);
            delete_author_id = '';
            selected_author.innerHTML = '';
        } else {
            pushNotice('error', 'Не удалось удалить автора');
        }

    }



};

let delete_book_id = '';

const delete_book_search_input = document.querySelector('#delete_book_search_input');
const delete_book_search_body = document.querySelector('.delete_book_search_body');
const selected_book = document.querySelector('.selected_book');
const delete_book_form = document.querySelector('#delete_book');

delete_book_search_input.oninput = async () => {
    let input_value = delete_book_search_input.value.toLowerCase();

    delete_book_search_body.innerHTML = '';

    let res = await fetch('http://practic-book-service/books');
    res = await res.json();

    res.forEach(value => {

        if (value.book_title.toLowerCase().match(input_value)) {

            delete_book_search_body.innerHTML += `
                <div data-book-id="${value.id}">
                    ${value.book_title}
                </div>
            `;

        }

    });

    for(const book of delete_book_search_body.children) {

        book.onclick = (e) => {
            selected_book.innerHTML = '';
            selected_book.appendChild(e.target);
            delete_book_id = book.getAttribute('data-book-id');
        }

    }


};

delete_book_form.onsubmit = async (e) => {
    e.preventDefault();

    if (delete_book_id === '') {
        pushNotice('warning', 'Не выбрана книга');
    } else {

        let res = await fetch(`http://practic-book-service/books/${delete_book_id}`, {
            method: 'DELETE'
        });
        res = await res.json();

        if (res.status) {
            pushNotice('success', res.message);
            selected_book.innerHTML = '';
        } else {
            pushNotice('error', 'Не удалось удалить книгу');
        }

    }


}







const update_book_search_container = document.querySelector('.book_search_container');
const update_book_search_result = update_book_search_container.querySelector('.update_book_search_result');
const update_book_search_input = update_book_search_container.querySelector('form > input');
const update_book_form = document.querySelector('.update_book > form');
let update_book_id = '';


update_book_search_input.oninput = async () => {
    let input_value = update_book_search_input.value.toLowerCase();

    let res = await fetch('http://practic-book-service/books');
    res = await res.json();

    update_book_search_result.innerHTML = '';

    res.forEach(value => {

        if(value.book_title.toLowerCase().match(input_value)) {

            update_book_search_result.innerHTML += `
            
            <div 
            class="update_book_item" 
            data-update-book-id="${value.id}" 
            data-update-book-description="${value.book_description}"
            data-update-book-year-of-issue="${value.book_year_of_issue}"
            data-update-book-title="${value.book_title}"
            >
            ${value.book_title}</div>
            `;

        }

    });

    for (const re of document.querySelectorAll('.update_book_item')) {
        re.onclick = () => {

            update_book_form.querySelector('#update_book_title').value = re.getAttribute('data-update-book-title');
            update_book_form.querySelector('#update_book_year_of_issue').value = re.getAttribute('data-update-book-year-of-issue');
            update_book_form.querySelector('#update_book_description').value = re.getAttribute('data-update-book-description');
            update_book_id = re.getAttribute('data-update-book-id');
        }
    }

}



update_book_form.onsubmit = async (e) => {
    e.preventDefault();

    if (update_book_id === '') {
        pushNotice('warning', 'Не выбрана книга');

    } else {

        const data = {
            title: update_book_form.querySelector('#update_book_title').value,
            description: update_book_form.querySelector('#update_book_description').value,
            year_of_issue: update_book_form.querySelector('#update_book_year_of_issue').value
        };

        let res = await fetch(`http://practic-book-service/books/${update_book_id}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
        res = await res.json();

        if (res.status) {
            pushNotice('success', res.message);
             update_book_form.querySelector('#update_book_title').value = '';
             update_book_form.querySelector('#update_book_description').value = '';
             update_book_form.querySelector('#update_book_year_of_issue').value = '';

        } else {
            pushNotice('error', 'Не удалось изменить книгу');
        }

    }




}









const user_container = document.querySelector('.user_container');
const user_search_input = user_container.querySelector('.user_search > form > input');
const user_search_result = user_container.querySelector('.user_search_result');

user_search_input.oninput = async () => {
    let input_value = user_search_input.value;

    let res = await fetch(`http://practic-book-service/search-user?like=${input_value}`);
    res = await res.json();

    user_search_result.innerHTML = '';

    res.forEach(value => {
        user_search_result.innerHTML += `
            <div>
                <div>${value.name + ' ' + value.surname + ' ' + value.patronymic}</div>
                <button type="button" onclick="banUser(${value.id}, ${value.is_banned})">Бан</button>
            </div>
        `;
    });



}


async function banUser(id, is_banned) {

    const data = {
        ban: ''
    }

    if (is_banned === 0) {
        data.ban = 1;
    } else {
        data.ban = 0;
    }


    let res = await fetch(`http://practic-book-service/ban-user/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
    });
    res = await res.json();

    if (res.status) {
        pushNotice('success', res.message);
    } else {
        pushNotice('error', 'Не удалось выполнить действие');
    }

}


const search_comment_result = document.querySelector('.search_comment_result');
const search_comment_input = document.querySelector('#search_comment');

search_comment_input.oninput = async () => {
    let input_value = search_comment_input.value.toLowerCase();

    let res = await fetch('http://practic-book-service/comments');
    res = await res.json();
    search_comment_result.innerHTML = '';

    res.forEach(value => {
        let full = value.user_surname + ' ' + value.user_name + ' ' + value.book_title;
        if (full.toLowerCase().match(input_value)) {

            search_comment_result.innerHTML += `
            <tr>
                <td>${value.user_name + ' ' + value.user_surname}</td>
                <td>${value.comment_description}</td>
                <td>${value.book_title}</td>
                <td><button onclick="deleteComment(${value.comment_id})">Удалить</button></td>
            </tr>
            `;

        }

    });



}




async function deleteComment(id) {
    let res = await fetch(`http://practic-book-service/comments/${id}`, {
        method: 'DELETE'
    });
    res = await res.json();

    if (res.status) {
        pushNotice('success', res.message);
    } else {
        pushNotice('error', 'Не удалось удалить комментарий');
    }

}







