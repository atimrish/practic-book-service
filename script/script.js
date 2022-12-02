const books = document.querySelectorAll('.preloader-animation');

window.onload = () => {
    setTimeout(() => {
            books.forEach(value => value.classList.remove('preloader-animation'));
            getBooks();



        },
        600);
}


if (localStorage.getItem('user_id') !== null) {
    pushNotice('info', 'Добро пожаловать');

    const account_block = document.querySelector('.account-block');

    account_block.innerHTML =
        `
        <div>
            <div class="favourite_books"><img src="../images/izobrazhenie-3(1)-transformed%201.png" alt=""></div>
            <div class="profile"><img src="${'uploads/' + localStorage.getItem('avatar')}" 
            onclick="window.location.href = 'http://practic-book-service/public/user.html'" alt="">
            </div>
        </div>
    `;

}


const search_input = document.querySelector('#search');
const main = document.querySelector('main');

const search_result = document.createElement('div');
search_result.classList.add('search_result');
const focus_blur = document.createElement('div');
focus_blur.classList.add('focus_blur');

search_input.onfocus = () => {

    main.appendChild(focus_blur);
    main.appendChild(search_result);


    search_input.oninput = async () => {
        let input_value = search_input.value.toLowerCase();
        search_result.innerHTML = '';

        let res = await fetch('http://practic-book-service/books');
        res = await res.json();



        if (input_value !== '') {

            res.forEach(value => {
                let full = value.book_title + ' - ' +
                    value.author_name + ' ' +
                    value.author_surname + ' ' +
                    value.author_patronymic;

                if (full.toLowerCase().match(input_value)) {

                    search_result.innerHTML += `
                <div class="result">
                    <div class="result-image">
                        <img src="uploads/${value.book_image}" alt="">
                    </div>
                    <div class="result-body">
                        <div class="book-title">${value.book_title}</div>
                        <div class="book_author">
                            ${
                        value.author_name + ' ' +
                        value.author_surname + ' ' +
                        value.author_patronymic
                    }
                        </div>
                    </div>
                </div>
                `;

                }


            });

        }



    }



};

search_input.addEventListener('focusout', () => {
    search_result.remove();
    focus_blur.remove();
});


















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





async function getBooks() {
    try {
        const popular_book_container = document.querySelector('#popular_book_container');
        popular_book_container.innerHTML = '';

        let res = await fetch('http://practic-book-service/books');
        res = await res.json();

        res.forEach((value) => {

            popular_book_container.innerHTML += `
                        <div class="book" onclick="window.location.href = 'http://practic-book-service/public/book.html?id=${value.id}'">
                            <div class="book-image">
                                <img src="uploads/${value.book_image}" alt="">
                            </div>
                            <div class="book-title">${value.book_title}</div>
                        </div>
            
            `;

        });



    }
    catch (error) {
        console.log(error);
    }
}




function logOut() {
    localStorage.clear();
    window.location.replace('http://practic-book-service/index.html');
}
