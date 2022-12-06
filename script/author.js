const params = getSearchParams();
const author_image = document.querySelector('.author_image');
const author_title = document.querySelector('.author_title');
const book_container = document.querySelector('.book_container');



const books = document.querySelectorAll('.preloader-animation');

window.onload = () => {
    setTimeout(() => {
            books.forEach(value => value.classList.remove('preloader-animation'));
            getAuthor(params.id);
            getBooksByAuthorId(params.id);
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





async function getAuthor(id) {
    try {
        let res = await fetch(`http://practic-book-service/authors/${id}`);
        res = await res.json();

        author_image.innerHTML = `<img src="/uploads/${res.author_image}" alt="">`;
        author_title.innerText = res.name + ' ' + res.surname + ' ' + res.patronymic;

    }
    catch (error) {
        console.log(error);
    }
}


async function getBooksByAuthorId(id) {
    try {
        let res = await fetch(`http://practic-book-service/author-books/${id}`);
        res = await res.json();

        res.forEach(value => {
            book_container.innerHTML += `
            <div class="book" onclick="window.location.href = 'http://practic-book-service/public/book.html?id=${value.book_id}'">
                 <div class="book-image">
                       <img src="/uploads/${value.book_image}" alt="">
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