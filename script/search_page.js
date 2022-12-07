const search_genres_container = document.querySelector('.sidebar > .search-genres');
const search_genre_input = search_genres_container.querySelector('form > input');
const search_genres_result =  search_genres_container.querySelector('.search-genres-result');
const filters = document.querySelector('.filters');
const books = document.querySelector('.books');
const params = getSearchParams();
const search_input  = document.querySelector('#search');


if (params.params !== '') {
    searchWithParams(params.genre);

}



search_input.oninput = async () => {
     await searchWithParams();
}



if (localStorage.getItem('user_id') !== null) {

    const account_block = document.querySelector('.account-block');

    account_block.innerHTML =
        `
        <div>
            <div class="profile"><img src="${'/uploads/' + localStorage.getItem('avatar')}" 
            onclick="window.location.href = 'http://practic-book-service/public/user.html'" alt="">
            </div>
        </div>
    `;

}



search_genre_input.oninput = async () => {
    let input_value = search_genre_input.value.toLowerCase();
    search_genres_result.innerHTML = '';


    let res = await fetch('http://practic-book-service/genre');
    res = await res.json();

    res.forEach(value => {

        if (value.title.toLowerCase().match(input_value)) {

            search_genres_result.innerHTML += `
       <div id="genre-${value.id}" data-genre-id="${value.id}">${value.title}</div>
       `;

        }

    });

    for (const re of search_genres_result.children) {
        re.onclick = () => {
            re.innerHTML += '<div class="close">x</div>'
            filters.appendChild(re);
            searchWithParams();

            re.onclick = () => {};
            re.querySelector('.close').onclick = () => {
                re.remove();
                searchWithParams();
            }
        }
    }

}


async function searchWithParams(add_param = '') {
    let params = [];

    if (add_param !== '') {
        params.push(add_param);
    }

    let filters = document.querySelector('.filters').children;

    for (const filter of filters) {
        params.push(filter.getAttribute('data-genre-id'));
    }
    let params_string = params.join('/');
    let input_value = document.querySelector('#search').value;

    let res = await fetch(`http://practic-book-service/search?like=${input_value}&params=${params_string}`);
    res = await res.json();

    books.innerHTML = '';

    res.forEach(value => {

        books.innerHTML += `
        
        <div class="book" onclick="window.location.href = 'http://practic-book-service/public/book.html?id=${value.id}'">
            <div class="book_image">
                <img src="/uploads/${value.book_image}" alt="">
            </div>
            <div class="book_title">${value.book_title}</div>
            <div class="author" data-book-id="${value.id}"></div>
        </div>
        
        `;

    });

    const authors = document.querySelectorAll('.author');

    for (const author of authors) {
        res = await fetch(`http://practic-book-service/authors-by-book/${author.getAttribute('data-book-id')}`);
        res = await res.json();

        console.log(res);

        res.forEach(value => {
            let full = value.author_name + ' ' + value.author_surname + ' ' + value.author_patronymic;
            author.innerHTML += `<a href="/public/author.html?id=${value.author_id}">${full}</a>`
        });

    }


}

function logOut() {
    localStorage.clear();
    window.location.replace('http://practic-book-service/index.html');
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


function getSearchParams() {
    let search = window.location.search.substring(1);
    let new_search = {};
    search = search.split('&');

    for (let i = 0; i < search.length; i++) {
        search[i] = search[i].split('=');
        new_search[search[i][0]] = search[i][1];
    }

    return new_search;
}


