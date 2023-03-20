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
}

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
    width: '320px',
    fontSize: '1.3rem',
    borderRadius: '1rem',
    position: 'right-top', //'right-bottom',
    cssAnimationDuration: '800',
    cssAnimationStyle: 'zoom',
    closeButton: true,
    useIcon: false,
    showOnlyTheLastOne: true,
  });
}

// not used in HW11
/*
  * default() displays default message, which if empty by default
  * setDefault(txt) sets txt string as default message */
let defaultMsg = '';

function showDefaultMsg() {
  Notify.info(defaultMsg);
}

function setDefaultMsg(msg) {
  defaultMsg = msg;
}

