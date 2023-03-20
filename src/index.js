/* Створи фронтенд частину застосунку пошуку і перегляду
зображень за ключовим словом. */
/*
HTML документ вже містить розмітку кнопки, по кліку на яку,
необхідно виконувати запит за наступною групою зображень
і додавати розмітку до вже існуючих елементів галереї (refs.btnLoadMore)

Після першого запиту кнопка з'являється в інтерфейсі під галереєю.
При повторному сабміті кнопка спочатку ховається, а після запиту відображається.

У відповіді бекенд повертає властивість totalHits - загальна кількість зображень,
які відповідають критерію пошуку (для безкоштовного акаунту).

Якщо користувач дійшов до кінця, ховай кнопку і виводь NO_MORE_IMGS
*/
/* Зробити плавне прокручування сторінки після запиту */
/* Нескінченний скрол
Замість кнопки «Load more», можна зробити нескінченне
завантаження зображень під час прокручування сторінки.
Ми надаємо тобі повну свободу дій в реалізації, можеш
використовувати будь-які бібліотеки.
*/
import throttle from 'lodash.throttle';
import CONF from './js/config';
import * as show from './js/notifications';
import refs from './js/referrals';
import GalleryManager from './js/galleryManager';
import fetchRandomNoun from './js/fetchRandomNoun';

const infScrAllowed = true;
const galleryMngr =
  infScrAllowed ? new GalleryManager(loadMore)
    : new GalleryManager();

if (infScrAllowed) {
  refs.btnLoadMore.addEventListener('click', handleLoadMoreClick);
} /*
 else {
  refs.btnLoadMore.remove();
} */

//initialize notifications settings
show.init();
show.info(CONF.NO_INPUT_GOIT);
refs.btnGoIt.addEventListener('click', handleGoItClick);

refs.form.addEventListener(
  'submit',
  //to observe pixabay limitations
  throttle(handleSubmit, CONF.MIN_TIME_BTW_REQS)
);


/* ************************ end of sync code *************************** */

// *** listener callback for submit
function handleSubmit(e) {
  e.preventDefault();

  const inputEl = e.target.elements.searchQuery;
  let clue = inputEl.value.trim().toLowerCase();

  if (clue === '') {
    //clear input and output and gallery mngr data
    galleryMngr.clear();
    inputEl.value = '';
    refs.clearGalleryContent();
    show.info(CONF.NO_INPUT_GOIT);
    return;
  }

  if (galleryMngr.isNewSearch(clue)) {
    // new search
    refs.clearGalleryContent();
    galleryMngr.startOver(clue);
    return;
  }

  //same search
  if (galleryMngr.isMoreToLoad()) {
    galleryMngr.nextPage();
    return;
  }

  //same search, and no more to load
  galleryMngr.endThisSearch();
  return;
}

// *** listener call-back for GOIT btn
async function handleGoItClick() {
  refs.clearGalleryContent();

  let rand_noun;
  await fetchRandomNoun()
      .then(r => (rand_noun = r.data.word))
      .catch(e => {
        refs.input.value = '';
        show.error('fetchRandomNoun: ' + e.message);
        return;
      });

  refs.input.value = rand_noun;

  galleryMngr.startOver(rand_noun.toLowerCase());
}

// *** callback function for infinite scroll
async function loadMore() {
  //console.log('@load more');
  galleryMngr.nextPage();
}

// *** listener callback for load-More btn
function handleLoadMoreClick() {
  galleryMngr.nextPage();
}
