const form_container = document.querySelector('.form-container');
const form = form_container.querySelector('form');
let inputs = Array.from(form_container.querySelectorAll('input'));
let labels = form_container.querySelectorAll('label');
const formData = new FormData();
formData.append('login', '');
formData.append('password', '');

function inputFocusEvent() {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].onfocus = () => {
            labels[i].classList.add('input-focus');
        };
        inputs[i].addEventListener('focusout', () => {
            labels[i].classList.remove('input-focus');
        });
    }
}

inputFocusEvent();



form.onsubmit = async (e) => {
    e.preventDefault();
    let login =  inputs.find(value => value.getAttribute('name') === 'login').value;
    let password = inputs.find(value => value.getAttribute('name') === 'password').value;

    formData.set('login', login);
    formData.set('password', password);

    let res = await fetch('http://practic-book-service/login',{
        method: 'POST',
        body: formData
        });
    res = await res.json();
    console.log(res);

}


// getBooks();
// addUser();
async function getBooks() {
    try {
        let res = await fetch('http://practic-book-service/books');
        res = await res.json();
        console.log(res);
    }
    catch (error) {
        console.log(error);
    }
}


async function addUser() {

    let formData = new FormData();
    formData.append('surname', 'test_js');
    formData.append('name', 'test_js');
    formData.append('patronymic', 'test_js');
    formData.append('login', 'test_js');
    formData.append('password', 'test_js');
    formData.append('avatar', 'test_js');

    let res = await fetch('http://practic-book-service/users', {
        method: 'POST',
        body: formData
    });
    res = await res.json();
    console.log(res)
}