/* ************************* NOTIFICATIONS **********************************
  * based on notiflix

  * init() changes notiflix.notify default options
  * error(err) displays err string as error message
  * warning(warn) displays warn string as warning message
  * info(txt) displays txt string as info message
*/

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BIG_OPTS = {
  position: 'center-center',
  fontSize: '2rem',
  borderRadius: '2rem',
  width: '40vw',
};

export {
  init,
  setDefaultMsg as setDefault,
  showDefaultMsg as default,
  showWarning as warning,
  showError as error,
  showSuccess as success,
  showInfo as info
};

function showError(txt, isBig = true) {
  Notify.failure(txt, isBig ? BIG_OPTS : {});
}

function showWarning(txt) {
  Notify.warning(txt);
}

function showInfo(txt, isBig = true) {
  Notify.info(txt, isBig ? BIG_OPTS : {});
}

function showSuccess(txt) {
  Notify.success(txt);
}


function init() {
  Notify.init({
    width: '30vw',
    fontSize: '1.3rem',
    borderRadius: '1rem',
    position: 'right-top', //
    cssAnimationDuration: '800',
    cssAnimationStyle: 'zoom',
    closeButton: true,
    useIcon: false,
    showOnlyTheLastOne: true,
  });
}

