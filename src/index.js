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
import getRandomWord from './js/words';

//create gallery manager object
const galleryMngr = new GalleryManager({
  onScrollThreshold: loadMore,
  onSuccess,
  onError,
});

//initialize notifications settings
show.init();
show.info(CONF.NO_INPUT_GOIT);

refs.btnGoIt.addEventListener('click', handleGoItClick);

refs.form.addEventListener(
  'submit',
  //to observe pixabay limitations
  throttle(handleSubmit, CONF.MIN_TIME_BTW_REQS)
);

//document.body.addEventListener('click', refs.handleButtons2FixSLB.bind(refs));

/* ************************ end of sync code *************************** */

function onSuccess(query, totalHits, loadedHits, hits) { //TODO: check SLB?
  show.success(CONF.getImgNumberStr(query, totalHits, loadedHits));
  refs.appendGallery(hits);
   // refs.showBtnLoadMore();
}

function onError(e) {
    //refs.hideBtnLoadMore();
  show.error(e.message);
}

// *** listener callback for submit
function handleSubmit(e) {
  e.preventDefault();

  const inputEl = e.target.elements.searchQuery;
  let query = inputEl.value.trim();
  if (query === '') {
    //clear input and output and gallery mngr data
    inputEl.value = '';
    galleryMngr.clear();
    refs.clearGalleryContent();
    show.info(CONF.NO_INPUT_GOIT);
    return;
  }

  if (galleryMngr.isNewSearch(query)) { // new search
    refs.clearGalleryContent();
    galleryMngr.startOver(query);
    return;
  }

  if (galleryMngr.isMoreToLoad()) {  //same search
    galleryMngr.nextPage();
    return;
  }

  //same search, and no more to load
  show.warning(CONF.getNoMoreImages(galleryMngr.totalHits));
  refs.scrollTillEnd();
  return;
}

// *** call-back for GOIT btn listener
function handleGoItClick() {
  function go(query) {
    refs.input.value = query;
    refs.clearGalleryContent();
    galleryMngr.startOver(query);
  }

  fetchRandomNoun()
    .then(r => {
      go(r);
    })
    .catch(e => {
      console.log('fetch Random:', e.message);
      // it's a substitution for random api - happens from time to time :(((
      const rand_noun = getRandomWord();
      go(rand_noun);
    });
}



// *** callback function for listeners forr infinite scroll and load-More btn
function loadMore() {
  galleryMngr.nextPage();
}
