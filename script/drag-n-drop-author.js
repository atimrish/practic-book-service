const author_search_body = document.querySelector('.drag-n-drop-author-search-body');
const input_author = document.querySelector('#author_search');
const authorInsertBody = document.querySelector('.drag-n-drop-author-body');




insertAuthors();

input_author.oninput = async () => {
    author_search_body.innerHTML = '';
    let search = input_author.value.toLowerCase();

    let res = await fetch('http://practic-book-service/authors');
    res = await res.json();

    res.forEach(value => {
        let fio = value.surname + ' ' + value.name + ' ' + value.patronymic;
        if (fio.toLowerCase().match(search)) {

            author_search_body.innerHTML +=
            `
                <div id="author-${value.id}" data-id="${value.id}" draggable="true">
                    ${value.surname + ' ' + value.name + ' ' + value.patronymic}
                </div>
            `;

        }

    });

    const authors = author_search_body.children;

    for (const author of authors) {
        author.ondragstart = (e) => {
            e.dataTransfer.setData('id', e.target.id);
            console.log(e.target);
        }
    }


}








authorInsertBody.ondragover = (e) => {
    e.preventDefault();
}

author_search_body.ondragover = (e) => {
    e.preventDefault();
}

author_search_body.ondrop = (e) => {
    let itemId = e.dataTransfer.getData('id');
    author_search_body.appendChild(document.getElementById(itemId));
};

authorInsertBody.ondrop = (e) => {
    let itemId = e.dataTransfer.getData('id');
    authorInsertBody.appendChild(document.getElementById(itemId));
}


























async function insertAuthors() {
    try {
        let res = await fetch('http://practic-book-service/authors');
        res = await res.json();

        author_search_body.innerHTML = '';

        res.forEach(value => {
            author_search_body.innerHTML +=
                `
                <div id="author-${value.id}" data-id="${value.id}" draggable="true">
                    ${value.surname + ' ' + value.name + ' ' + value.patronymic}
                </div>
            `;
        });

        const authors = author_search_body.children;

        for (const author of authors) {
            author.ondragstart = (e) => {
                e.dataTransfer.setData('id', e.target.id);
                console.log(e.target);
            }
        }


    } catch (error) {
        pushNotice('error', error);
    }
}


function pushNotice(type, message) {

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