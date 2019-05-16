var modalBg = document.querySelector('.modal-bg');

var modalClose = document.querySelector('.reg');
modalClose.addEventListener('click', function () {
    modalBg.classList.remove('bg-active');
});
var modalClose = document.querySelector('.regi');
modalClose.addEventListener('click', function () {
    modalBg.classList.add('bg-active');
});


