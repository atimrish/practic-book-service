const form_comment = document.querySelector('#comment-container > form');
const description = document.querySelector('#comment_body');


const params = getSearchParams();

getBook(params.id);


form_comment.onsubmit = (e) => {
    e.preventDefault();

    let comment_value = description.value;

    const formData = new FormData();
    formData.append('book_id', params.id);
    formData.append('user_id', localStorage.getItem('user_id'));
    formData.append('description', comment_value);

    console.log(formData);

};













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







async function getBook(id) {
    try {
        let res = await fetch(`http://practic-book-service/books/${id}`);
        res = await res.json();
        console.log(res);

        const book_image = document.querySelector('.book-image > img');
        const book_title = document.querySelector('.book-title');
        const description_body = document.querySelector('.description-body');
        const author = document.querySelector('.author > a');
        const genre = document.querySelector('.categories > ul');

        book_image.setAttribute('src', '../uploads/' + res.book_image);
        book_title.innerText = res.book_title;
        description_body.innerText = res.book_description;
        author.innerText = res.author_name + ' ' + res.author_surname;
        author.setAttribute('href', 'author.html?id=' + res.author_id);
        genre.innerHTML = `<li><a href="${res.genre_id}">${res.genre}</a></li>`;


    }
    catch (error) {
        pushNotice('error', error);
    }
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



