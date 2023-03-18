
/* Створи фронтенд частину застосунку пошуку і перегляду
зображень за ключовим словом. */
/* Зробити плавне прокручування сторінки після запиту */
/* Нескінченний скрол //TODO:
Замість кнопки «Load more», можна зробити нескінченне
завантаження зображень під час прокручування сторінки.
Ми надаємо тобі повну свободу дій в реалізації, можеш
використовувати будь-які бібліотеки.
*/

import { CONF } from './js/config';

import throttle from 'lodash.throttle';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

import fetchPictures from './js/fetchPictures';
import renderCards from './js/rendering';
import * as show from './js/notifications';
import refs from './js/referrals';

console.log(refs.btnLoadMore);
refs.btnLoadMore.style.display = 'none';
refs.form.addEventListener(
  'submit',
  throttle(handleSubmit, CONF.MIN_TIME_BTW_REQS)
);
refs.btnLoadMore.addEventListener('click', handleLoadMore);
//initialize notifications settings
show.init();

//initialize SimpleLightBox
let gallery = new SimpleLightbox('.gallery a', CONF.SIMPLE_L_BOX_OPTS);

//vars
let page = 1; //Початкове значення параметра page повинно бути 1.
let saved_pattern = '';

//test input // TODO: remove
processInput('cat', page);

//TODO: animation on loading pictures ???
//TODO: rounded borders of cards to fix
//TODO: logo GOIT

/* ************************ end of sync code *************************** */

function handleSubmit(e) {
  e.preventDefault();

  const inputEl = e.target.elements.searchQuery;
  let pattern = inputEl.value.trim().toLowerCase(); //console.log('submitted', pattern, page);

  if (pattern === '') { //clear input and output
    saved_pattern = '';
    inputEl.value = '';
    refs.gallery.innerHTML = '';
    return;

  }

  pattern = pattern.slice(0, CONF.INPUT_MAX_POS);

  processInput(pattern);
}

function handleLoadMore() {
  processInput(saved_pattern);
}

/*
Додати відображення великої версії зображення з бібліотекою SimpleLightbox.
Викликати метод refresh() після додавання нової групи карток.
*/
function processInput(pattern) {
  if (saved_pattern.localeCompare(pattern) === 0) {
    if (refs.btnLoadMore.style.display === 'none') {//do not fetch if reached the end
      return;
    }

    page += 1; //    console.log('next page:', page);
  } else {
    //prepare for the new search
    page = 1;
    saved_pattern = pattern;
    refs.gallery.innerHTML = '';
    console.log('new search');
  }

  refs.btnLoadMore.style.display = 'none';
  fetchPictures(pattern, page, CONF.FETCH_PER_PAGE).then(r => {
      //Якщо бекенд повертає порожній масив -> повідомлення NO_IMGS.
      if (r.hits.length === 0) {
        throw new Error(CONF.NO_IMGS);
      }

      //save last child element to move scroll
      const lastElBeforeAdd = refs.gallery.lastElementChild;
      refs.gallery.insertAdjacentHTML('beforeend', renderCards(r.hits));
      gallery.refresh();

      //scroll till found images in the view
      if (lastElBeforeAdd) {
        lastElBeforeAdd.nextElementSibling.scrollIntoView({
          block: 'start',
          behavior: 'smooth',
        });
      }
/* const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
}); */
      /* Після першого запиту з кожним пошуком -> повідомлення з кількістю знайдених зображень
        (totalHits). Текст повідомлення - FOUND_MSG */
      const total = r.totalHits;
      const loaded = refs.gallery.childElementCount;
      show.success(CONF.getImgNumberStr(total, loaded));

      if (total !== loaded) { //some more images to load
        refs.btnLoadMore.style.display = 'block';
      } else { //no more images to load
        show.warning(CONF.getNoMoreImages(loaded));
      }
    })
    .catch(e => {
      show.error(e.toString());
    });
}
/*
HTML документ вже містить розмітку кнопки, по кліку на яку,
необхідно виконувати запит за наступною групою зображень
і додавати розмітку до вже існуючих елементів галереї (refs.btnLoadMore)

В початковому стані вона повинна бути прихована.
Після першого запиту кнопка з'являється в інтерфейсі під галереєю.
При повторному сабміті кнопка спочатку ховається, а після запиту відображається.

У відповіді бекенд повертає властивість totalHits - загальна кількість зображень,
які відповідають критерію пошуку (для безкоштовного акаунту).

Якщо користувач дійшов до кінця, ховай кнопку і виводь NO_MORE_IMGS */
