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

const infScrAllowed = true;

if (infScrAllowed) {
  refs.btnLoadMore.remove();
} else {
  refs.btnLoadMore.addEventListener('click', loadMore);
}

const galleryMngr = new GalleryManager({
  onScrollThreshold: infScrAllowed? loadMore : false,
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


/* ************************ end of sync code *************************** */

function onSuccess(clue, totalHits, loadedHits, hits) {
  show.success(CONF.getImgNumberStr(clue, totalHits, loadedHits));
  refs.appendGallery(hits);
  if (!infScrAllowed) {
    refs.showBtnLoadMore();
  }
}

function onError(e) {
  if (!infScrAllowed) {
    refs.hideBtnLoadMore();
  }
  show.error(e.message);
}

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
   // showSuccess();
    return;
  }

  //same search
  if (galleryMngr.isMoreToLoad()) {
    galleryMngr.nextPage();
   // showSuccess();
    return;
  }

  //same search, and no more to load
  show.warning(CONF.getNoMoreImages(galleryMngr.totalHits));
  refs.scrollTillEnd();
  return;
}

// *** call-back for GOIT btn listener
async function handleGoItClick() {
  let rand_noun;
  //console.time('randNoun');
  await  fetchRandomNoun()
      .then(r => (rand_noun = r.data.word))
    .catch(e => {
      console.log('fetchRandomNoun:', e.message);
      // it's a substitution for site failure - happens from time to time :(((
      rand_noun = getRandomWord();
      });
 // console.timeEnd('randNoun');  console.log(rand_noun);
  refs.input.value = rand_noun;
  refs.clearGalleryContent();
  galleryMngr.startOver(rand_noun.toLowerCase());
}

// *** callback function for listeners forr infinite scroll and load-More btn
function loadMore() {
  galleryMngr.nextPage();
}
