// ********* infinite scroll
import throttle  from "lodash.throttle";

class InfScroll {
  #scrollThreshold = 0.5;
  #onThreshold;

  constructor(onScrollThreshold, scrollDelay, scrollThreshold) {
    this.scrollHandler = throttle(this.checkPosition, scrollDelay).bind(this);
    this.#onThreshold = onScrollThreshold;
    this.#scrollThreshold = scrollThreshold;
  }

  // *** enable when there is something to load
  enableInfScroll() {
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.scrollHandler);
  }

  // *** disable when there is nothing to load
  disableInfScroll() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.scrollHandler);
  }

  // *** scroll event handler
  checkPosition() {
    const screenHeight = window.innerHeight;
    // порог
    const threshold =
      document.body.offsetHeight - screenHeight * this.#scrollThreshold;

    // Отслеживаем, где находится низ экрана относительно страницы:
    if (window.scrollY + screenHeight >= threshold) {
      // Если мы пересекли полосу-порог, вызываем нужное действие
      this.#onThreshold();
    }
  }
}

export default InfScroll;
