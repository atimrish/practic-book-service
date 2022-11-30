const books = document.querySelectorAll('.preloader-animation');

window.onload = () => {
    setTimeout(() => {
            books.forEach(value => value.classList.remove('preloader-animation'));
        },
        600);
}


if (localStorage.getItem('surname') !== null) {
    pushNotice('info', 'Добро пожаловать');

    const account_block = document.querySelector('.account-block');

    account_block.innerHTML =
        `
        <div>
            <div class="favourite_books"><img src="../images/izobrazhenie-3(1)-transformed%201.png" alt=""></div>
            <div class="profile"><img src="../images/izobrazhenie-3-transformed%201.png" alt=""></div>
        </div>
    `;

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


getBooks();


async function getBooks() {
    try {
        const popular_book_container = document.querySelector('#popular_book_container');
        const book_images = popular_book_container.querySelectorAll('img');
        const books_titles = popular_book_container.querySelectorAll('.book-title');
        let res = await fetch('http://practic-book-service/books');
        res = await res.json();

        res.forEach((value, index) => {
            book_images[index].setAttribute('src', 'uploads/' + value.book_image);
            book_images[index].setAttribute('data-id', value.id);
            books_titles[index].innerText = value.book_title;
        });



    }
    catch (error) {
        console.log(error);
    }
}
