const genre_input = document.getElementById('genre_search');
const genre_body = document.querySelector('.drag-n-drop-genre-search-body');
const genreInsertBody = document.querySelector('.drag-n-drop-genre-body');


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
            console.log(e.target);
        }
    }


}

insertGenres();
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
            console.log(e.target);
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


