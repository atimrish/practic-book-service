const popular_books = document.querySelector('section.popular-books');
const popular_books_container = popular_books.querySelector('.book-container');
const best_rating_books = document.querySelector('section.new-books');
const best_rating_books_container = best_rating_books.querySelector('.book-container');

const left_pop_btn = popular_books.querySelector('.left-btn');
const right_pop_btn = popular_books.querySelector('.right-btn');

let pop_margin_left_value = 0;
left_pop_btn.onclick = () => {
    if (pop_margin_left_value < 0) {
        pop_margin_left_value += 15;
        popular_books_container.style.marginLeft = pop_margin_left_value + '%';
    }

};

right_pop_btn.onclick = () => {

    if (pop_margin_left_value > -70) {
        pop_margin_left_value -= 15;
        popular_books_container.style.marginLeft = pop_margin_left_value + '%';
    }
};



const left_best_btn = best_rating_books.querySelector('.left-btn');
const right_best_btn = best_rating_books.querySelector('.right-btn');

let best_margin_left_value = 0;

left_best_btn.onclick = () => {

    if (best_margin_left_value < 0) {
        best_margin_left_value += 15;
        best_rating_books_container.style.marginLeft = best_margin_left_value + '%';
    }
}

right_best_btn.onclick = () => {
    if (best_margin_left_value > -70) {
        best_margin_left_value -= 15;
        best_rating_books_container.style.marginLeft = best_margin_left_value + '%';
    }
};

