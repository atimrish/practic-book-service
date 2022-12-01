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

    if (res.status) {
        localStorage.setItem('user_id', res.id);
        localStorage.setItem('surname', res.surname);
        localStorage.setItem('name', res.name);
        localStorage.setItem('patronymic', res.patronymic);
        localStorage.setItem('avatar', res.avatar);
        window.location.href = 'http://practic-book-service/index.html';
    } else {
        pushNotice('error', res.message);
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