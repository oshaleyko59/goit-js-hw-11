// ********* infinite scroll
import throttle  from "lodash.throttle";

//const SCROLL_DELAY = 500;

class InfScroll {
  #onThreshold;
  constructor(scrollDelay) {
    this.scrollHandler = throttle(this.checkPosition, scrollDelay).bind(this);
    this.#onThreshold = null;
  }

  enableInfScroll() {
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  disableInfScroll() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  set onThreshold(func) {
    this.#onThreshold = func;
  }

  checkPosition() {
    // Нам потребуется знать высоту документа и высоту экрана:
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    // Записываем, сколько пикселей пользователь уже проскроллил:
    const scrolled = window.scrollY;
    // Обозначим порог - четверть экрана до конца страницы:
    const threshold = height - screenHeight / 4;
    // Отслеживаем, где находится низ экрана относительно страницы:
    const position = scrolled + screenHeight;

    if ((position >= threshold) && this.#onThreshold) {
      // Если мы пересекли полосу-порог, вызываем нужное действие
      this.#onThreshold();
    }
  }
}

export default InfScroll;
