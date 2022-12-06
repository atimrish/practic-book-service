const genre_input = document.getElementById('genre_search');
const genre_body = document.querySelector('.drag-n-drop-genre-search-body');
const genreInsertBody = document.querySelector('.drag-n-drop-genre-body');

insertGenres();
insertUpdateBookGenres();



genre_input.oninput = async () => {
    let input_value = genre_input.value.toLowerCase();
    let res = await fetch('http://practic-book-service/genre');
    res = await res.json();

    genre_body.innerHTML = '';

    res.forEach(value => {
        if (value.title.toLowerCase().match('^' + input_value)) {
            genre_body.innerHTML +=
                `
                <div id="genre-${value.id}" data-genre-id="${value.id}" draggable="true">${value.title}</div>
           `;
        }
    });

    const genres = genre_body.children;

    for (const genre of genres) {
        genre.ondragstart = (e) => {
            e.dataTransfer.setData('id', e.target.id);
        }
    }


}


async function insertGenres() {
    let res = await fetch('http://practic-book-service/genre');
    res = await res.json();

    res.forEach(value => {
        genre_body.innerHTML +=
            `
           <div id="genre-${value.id}" data-genre-id="${value.id}" draggable="true">${value.title}</div>
           
           `;

    });

    const genres = genre_body.children;

    for (const genre of genres) {
        genre.ondragstart = (e) => {
            e.dataTransfer.setData('id', e.target.id);
        }
    }

}

genreInsertBody.ondragover = (e) => {
    e.preventDefault();
}

genre_body.ondragover = (e) => {
    e.preventDefault();
}

genre_body.ondrop = (e) => {
    let itemId = e.dataTransfer.getData('id');
    genre_body.appendChild(document.getElementById(itemId));

};

genreInsertBody.ondrop = (e) => {
    let itemId = e.dataTransfer.getData('id');
    genreInsertBody.appendChild(document.getElementById(itemId));
}










const update_book_genre_input = document.getElementById('update_genre_search');
const update_book_genre_search_body = document.querySelector('.update_book_genre_search_body');
const update_book_genre_insert_body = document.querySelector('.update_book_genre_insert_body');


update_book_genre_input.oninput = async () => {
    let input_value = update_book_genre_input.value.toLowerCase();
    let res = await fetch('http://practic-book-service/genre');
    res = await res.json();

    update_book_genre_search_body.innerHTML = '';

    res.forEach(value => {
        if (value.title.toLowerCase().match('^' + input_value)) {
            update_book_genre_search_body.innerHTML +=
                `
                <div id="update-genre-${value.id}" data-genre-id="${value.id}" draggable="true">${value.title}</div>
           `;
        }
    });

    const genres = update_book_genre_search_body.children;

    for (const genre of genres) {
        genre.ondragstart = (e) => {
            e.dataTransfer.setData('id', e.target.id);
        }
    }


}




update_book_genre_insert_body.ondragover = (e) => {
    e.preventDefault();
}

update_book_genre_search_body.ondragover = (e) => {
    e.preventDefault();
}

update_book_genre_search_body.ondrop = (e) => {
    let itemId = e.dataTransfer.getData('id');
    update_book_genre_search_body.appendChild(document.getElementById(itemId));

};

update_book_genre_insert_body.ondrop = (e) => {
    let itemId = e.dataTransfer.getData('id');
    update_book_genre_insert_body.appendChild(document.getElementById(itemId));
}




async function insertUpdateBookGenres() {
    let res = await fetch('http://practic-book-service/genre');
    res = await res.json();

    res.forEach(value => {
        update_book_genre_search_body.innerHTML +=
            `
           <div id="update-genre-${value.id}" data-genre-id="${value.id}" draggable="true">${value.title}</div>
           
           `;

    });

    const genres = update_book_genre_search_body.children;

    for (const genre of genres) {
        genre.ondragstart = (e) => {
            e.dataTransfer.setData('id', e.target.id);
        }
    }

}










