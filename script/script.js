const books = document.querySelectorAll('.preloader-animation');

window.onload = () => {
    setTimeout(() => {
            books.forEach(value => value.classList.remove('preloader-animation'));
            getPopularBooks();
            getTopBooks();
            getPopularAuthors();
            getGenres();
        },
        600);
}


if (localStorage.getItem('user_id') !== null) {
    pushNotice('info', 'Добро пожаловать');

    const account_block = document.querySelector('.account-block');

    account_block.innerHTML =
        `
        <div>
            <div class="profile"><img src="${'uploads/' + localStorage.getItem('avatar')}" 
            onclick="window.location.href = 'http://practic-book-service/public/user.html'" alt="">
            </div>
        </div>
    `;

}



const sidebar = document.querySelector('.sidebar > ul');



async function getGenres() {
    let res = await fetch('http://practic-book-service/genre');
    res = await res.json();

    sidebar.innerHTML = '';

    res.forEach(value => {
        sidebar.innerHTML +=
            `
           <li><a href="/public/search.html?params=${value.id}">${value.title}</a></li>
           `;
    });

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





async function getPopularBooks() {
    try {
        const popular_book_container = document.querySelector('#popular_book_container');
        popular_book_container.innerHTML = '';

        let res = await fetch('http://practic-book-service/popular-books');
        res = await res.json();





        res.forEach((value) => {

            popular_book_container.innerHTML += `
                        <div class="book" onclick="window.location.href = 'http://practic-book-service/public/book.html?id=${value.book_id}'">
                            <div class="book-image">
                                <img src="uploads/${value.book_image}" alt="">
                            </div>
                            <div class="book-title">${value.book_title}</div>
                            <div class="author" data-book-id="${value.book_id}"></div>
                        </div>
            
            `;

        });


        const authors = popular_book_container.querySelectorAll('.author');

        for (const author of authors) {
            res = await fetch(`http://practic-book-service/authors-by-book/${author.getAttribute('data-book-id')}`);
            res = await res.json();

            res.forEach(value => {
                let full = value.author_name + ' ' + value.author_surname + ' ' + value.author_patronymic;
                author.innerHTML += `<a href="/public/author.html?id=${value.author_id}">${full}</a>`
            });

        }




    }
    catch (error) {
        console.log(error);
    }
}




















async function getPopularAuthors() {

    let res = await fetch('http://practic-book-service/popular-authors');
    res = await res.json();

    const popular_author_container = document.querySelector('.popular-author-container');
    popular_author_container.innerHTML = '';


    res.forEach(value => {
        let full_name = value.name + ' ' + value.surname;
        popular_author_container.innerHTML +=
            `
                    <div class="popular-author"
                    onclick="window.location.href =
                    'http://practic-book-service/public/author.html?id=${value.author_id}'
                    ">
                        <div class="author-image">
                            <img src="/uploads/${value.author_image}" alt="">
                        </div>
                        <div class="author-title">${full_name}</div>
                        <div class="author-title-bottom">${value.patronymic}</div>
                    </div>
            `;
    });


}



async function getTopBooks() {
    try {
        const top_book_container = document.querySelector('#top-book-container');
        top_book_container.innerHTML = '';

        let res = await fetch('http://practic-book-service/top-books');
        res = await res.json();

        console.log(res);

        // const authors = [];
        //
        // for (const author of res) {
        //     let author_res = await fetch(`http://practic-book-service/authors/${author.author_id}`);
        //     author_res = await author_res.json();
        //     let data = {
        //         surname: author_res.surname,
        //         name: author_res.name,
        //         patronymic: author_res.patronymic
        //     }
        //     authors.push(data);
        // }



        res.forEach((value, index) => {

            // let full_name = authors[index].name + ' ' + authors[index].surname + ' ' + authors[index].patronymic;

            top_book_container.innerHTML += `
                        <div class="book" onclick="window.location.href = 'http://practic-book-service/public/book.html?id=${value.book_id}'">
                            <div class="book-image">
                                <img src="uploads/${value.book_image}" alt="">
                            </div>
                            <div class="book-title">${value.book_title}</div>
                            <div class="author" data-book-id="${value.book_id}"></div>
                        </div>
            `;
        });


        const authors = top_book_container.querySelectorAll('.author');

        for (const author of authors) {
            res = await fetch(`http://practic-book-service/authors-by-book/${author.getAttribute('data-book-id')}`);
            res = await res.json();

            res.forEach(value => {
                let full = value.author_name + ' ' + value.author_surname + ' ' + value.author_patronymic;
                author.innerHTML += `<a href="/public/author.html?id=${value.author_id}">${full}</a>`
            });

        }






    } catch (e) {
        console.log(e);
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





function logOut() {
    localStorage.clear();
    window.location.replace('http://practic-book-service/index.html');
}
