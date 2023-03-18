/* ************************* NOTIFICATIONS **********************************
  * based on notiflix

  * init() changes notiflix.notify default options
  * error(err) displays err string as error message
  * warning(warn) displays warn string as warning message
  * info(txt) displays txt string as info message
*/

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export {
  init,
  setDefaultMsg as setDefault,
  showDefaultMsg as default,
  showWarning as warning,
  showError as error,
  showSuccess as success,
  showInfo as info
};

function showError(txt) {
  Notify.failure(txt);
}

function showWarning(txt) {
  Notify.warning(txt);
}

function showInfo(txt) {
  Notify.info(txt);
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
    closeButton: true,
    useIcon: false,
    showOnlyTheLastOne: true,
  });
}

// TODO: not used
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

