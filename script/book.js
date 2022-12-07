const form_comment = document.querySelector('#comment-form');
const description = document.querySelector('#comment_body');
const params = getSearchParams();
const comment_block = document.querySelector('.comments');
const rating_stars_container = document.querySelector('.user-rating-value');
const rating_stars = document.querySelectorAll('.star');

if (localStorage.getItem('user_id') !== null) {
    const account_block = document.querySelector('.account-block');

    account_block.innerHTML =
        `
        <div>
            <div class="profile"><img src="${'../uploads/' + localStorage.getItem('avatar')}" 
            onclick="window.location.href = 'http://practic-book-service/public/user.html'" alt="">
            </div>
        </div>
    `;

} else {
    const com = form_comment.parentElement;
    form_comment.remove();
    rating_stars_container.innerText = 'Войдите, чтобы оценить книгу';
    com.insertAdjacentHTML("afterbegin", '<div id="sign_in_message"><a href="/public/sign_in.html">Войдите</a>, чтобы оставлять комментарии</div>');


}


const preloader = document.querySelectorAll('.preloader-animation');

window.onload = () => {
    setTimeout(() => {
            preloader.forEach(value => value.classList.remove('preloader-animation'));
            getBook(params.id);
            getCommentByBookId(params.id);
            getRatingStarValue();
        },
        600);
}







form_comment.onsubmit = (e) => {
    e.preventDefault();

    let comment_value = description.value.trim();

    if (comment_value !== '') {
        const formData = new FormData();
        formData.append('book_id', params.id);
        formData.append('user_id', localStorage.getItem('user_id'));
        formData.append('description', comment_value);

        addComment(formData);
        description.value = '';

    } else {
        pushNotice('warning', 'Пустой текст комментария');
    }



};


getRatingByBookId(params.id);

const rating_block = document.querySelector('.rating-block');

async function getRatingByBookId(id) {
    try {
        let res = await fetch(`http://practic-book-service/rating?book_id=${id}`);
        res = await res.json();

        if (res.avg_book_rating !== null) {
            rating_block.innerHTML = `<div class="rating">${res.avg_book_rating}</div>`;
            rating_block.innerHTML += `<div class="rating-count">(${res.rating_count})</div>`;
        } else {
            rating_block.innerHTML = '<div class="rating">0.00</div>';
        }


    }
    catch (error) {
        console.log(error);
    }
}




for (let i = 0; i < rating_stars.length; i++) {

    rating_stars[i].onmouseover = () => {
        for (let j = 0; j <= i; j++) {
            rating_stars[j].classList.add('star-hover');
        }
    }

    rating_stars[i].onmouseleave = () => {
        for (let j = 0; j <= i; j++) {
            rating_stars[j].classList.remove('star-hover');
        }
    }

    rating_stars[i].onclick = async () => {
        for (let j = 0; j <= i; j++) {
            rating_stars[j].classList.add('star-checked');
        }

        for (let j = i + 1; j < rating_stars.length; j++) {
            rating_stars[j].classList.remove('star-checked');
        }

        let rating_value = rating_stars[i].getAttribute('data-rating-value');
        rating_stars_container.setAttribute('data-rating-total-value', rating_value);

        let res  = await fetch(`http://practic-book-service/rating?user_id=${localStorage.getItem('user_id')}&book_id=${params.id}`);
        res = await res.json();

        if (res == null) {
            const formData = new FormData();
            formData.append('user_id', localStorage.getItem('user_id'));
            formData.append('book_id', params.id);
            formData.append('value', rating_stars_container.getAttribute('data-rating-total-value'));

            await addRating(formData)

            await getRatingByBookId(params.id);

        }

    }

}





async function addRating(formData) {
    let res =
        await fetch(`http://practic-book-service/rating?user_id=${localStorage.getItem('user_id')}&book_id=${params.id}`,
{
        method: 'POST',
        body: formData
    });
    res = await res.json();

    if (res.status) {
        pushNotice('success', res.message);
    } else {
        pushNotice('error', res.message);
    }

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







async function getBook(id) {
    try {
        let res = await fetch(`http://practic-book-service/books/${id}`);
        res = await res.json();


        const book_image = document.querySelector('.book-image > img');
        const book_title = document.querySelector('.book-title');
        const description_body = document.querySelector('.description-body');
        const author = document.querySelector('.author');
        const genre = document.querySelector('.categories > ul');

        book_image.setAttribute('src', '/uploads/' + res.book_image);
        book_title.innerText = res.book_title;
        description_body.innerText = res.book_description;




        res = await fetch(`http://practic-book-service/genre/${params.id}`)
        res = await res.json();


        res.forEach(value => {
            genre.innerHTML += `<li><a href="/public/search.html?genre=${value.id}">${value.title}</a></li>`;
        });

        res = await fetch(`http://practic-book-service/authors-by-book/${params.id}`);
        res = await res.json();


        author.innerHTML = '';
        let full_name = '';
        res.forEach(value => {
            full_name = value.author_name + ' ' + value.author_surname + ' ' + value.author_patronymic;
            author.innerHTML += `
                <a href="/public/author.html?id=${value.author_id}">${full_name}</a>
            `;
        });


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


async function addComment(formData) {

    let res = await fetch('http://practic-book-service/comments', {
        method: 'POST',
        body: formData
    });

    res = await res.json();

    if (res.status) {
        pushNotice('success', res.message);

        await getCommentByBookId(params.id);

    } else {
        pushNotice('error', res.message);
    }


}


async function getCommentByBookId(id) {
    try {
        let res = await fetch(`http://practic-book-service/comments?book_id=${id}`);
        res = await res.json();

        if (res.length > 0) {
            comment_block.innerHTML = '';

            res.forEach(value => {

                if (value.user_id === localStorage.getItem('user_id')) {

                    comment_block.innerHTML += `
                <div class="comment" data-id="${value.comment_id}">
                    <div class="user-image"><img src="../uploads/${value.user_avatar}" alt=""></div>
                    <div class="comment-body">
                        <h3>${value.user_surname + ' ' + value.user_name}</h3>
                        <div class="comment-description">${value.comment_description}</div>
                        
                    </div>
                    
                    <div class="comment-buttons">
                        <ul>
                            <li class="update-comment" onclick="updateComment(${value.comment_id})">Редактировать</li>
                            <li class="delete-comment" 
                            onclick="
                            if(confirm('Подтвердите действие'))
                            {
                                deleteComment(${value.comment_id})
                            }
                            ">Удалить</li>
                        </ul>
                    </div>
                </div>
                
                `;

                } else {

                    comment_block.innerHTML += `
                    <div class="comment" data-id="${value.comment_id}">
                        <div class="user-image"><img src="../uploads/${value.user_avatar}" alt=""></div>
                        <div class="comment-body">
                            <h3>${value.user_surname + ' ' + value.user_name}</h3>
                            <div class="comment-description">${value.comment_description}</div>
                            
                        </div>
                    </div>
                    `

                }


            });
        } else {

            comment_block.innerHTML = '<div class="empty-comment">Комментариев под этой книгой пока нет</div>';

        }


    }
    catch (error) {
        pushNotice('error', 'Не удалось найти комментарии по этой книге');
    }
}


function logOut() {
    localStorage.clear();
    window.location.replace('http://practic-book-service/index.html');
}


async function deleteComment(id) {
    try {
        let res = await fetch(`http://practic-book-service/comments/${id}`, {
            method: 'DELETE'
        });
        res = await res.json();

        if (res.status) {
            console.log(getCommentByBookId(params.id));
            pushNotice('success', res.message);

        }

    } catch (e) {
        pushNotice('error', 'Не удалось удалить комментарий');
        console.log(e);
    }

}

async function updateComment(id) {

    const comment = comment_block.querySelector(`.comment[data-id="${id}"] > .comment-body > .comment-description`);

    const old_value = comment.innerText;

    comment.innerHTML = `
    <form action="" method="post">
    <label for="update_comment" style="display: none"></label>
    <input id="update_comment" name="update_comment" value="${old_value}">
    <div class="update-comment-buttons">
        <button type="submit">Готово</button>
        <button type="button" class="cancel_update">Отмена</button>
    </div>
    </form>
    
    `;

    const cancel_update = comment.querySelector('.cancel_update');
    cancel_update.onclick = () => {
        comment.innerText = old_value;
    }

    const form = comment.querySelector('form');
    form.onsubmit = async (e) => {
        e.preventDefault();
        let input_value = form.querySelector('input').value;

        let data = {
            description: input_value
        }

        try {
            let res = await fetch(`http://practic-book-service/comments/${id}`, {
                method: 'PATCH',
                body: JSON.stringify(data)
            });
            res = await res.json();

            if (res.status) {
                pushNotice('success', res.message);

                await getCommentByBookId(params.id);

            }

        } catch (e) {
            pushNotice('error', 'Не удалось изменить комментарий');
            console.log(e);
        }


    }


}







async function getRatingStarValue() {
    let res =
        await fetch(`http://practic-book-service/rating?user_id=${localStorage.getItem('user_id')}&book_id=${params.id}`);
    res = await res.json();

    rating_stars_container.children[res.value - 1].click();


}

