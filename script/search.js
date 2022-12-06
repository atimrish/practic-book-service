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

        let res = await fetch('http://practic-book-service/search-with-limit?like=' + input_value);
        res = await res.json();

        search_input.onkeydown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                window.location.href = 'http://practic-book-service/public/search.html?search=' + input_value;
            }
        }


        if (input_value !== '') {

            res.forEach(value => {
                    search_result.innerHTML += `
                <div class="result" 
                onclick="window.location.href = 'http://practic-book-service/public/book.html?id=${value.id}'
                        ">
                    <div class="result-image">
                        <img src="/uploads/${value.book_image}" alt="">
                    </div>
                    <div class="result-body">
                        <div class="book-title">
                        ${value.book_title}
                        </div>
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

            });

        }



    }



};

search_input.addEventListener('focusout', () => {
    setTimeout(() => {
        search_result.remove();
        focus_blur.remove();
    }, 100);

});