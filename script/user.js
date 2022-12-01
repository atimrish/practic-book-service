const profile = document.querySelector('.profile > img');
const big_profile = document.querySelector('.account-info > .account-image > img');
const fio = document.querySelectorAll('.account-name > h3');

profile.setAttribute('src', '../uploads/' + localStorage.getItem('avatar'));
big_profile.setAttribute('src', '../uploads/' + localStorage.getItem('avatar'));
fio[0].innerText = localStorage.getItem('surname') + ' ' + localStorage.getItem('name');
fio[1].innerText = localStorage.getItem('patronymic');


