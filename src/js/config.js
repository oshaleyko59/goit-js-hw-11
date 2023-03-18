/* ************************* CONFIGURATION ***************************
  constants and expressions based on constants
*/

export const CONF = {
  SIMPLE_L_BOX_OPTS: {
    captionPosition: 'top',
    captionsData: 'alt',
    captionDelay: 250,
    close: false,
    scrollZoom: false,
    history: false
  },

  MIN_TIME_BTW_REQS: 600, //Pixabay Rate Limit = 100 requests per minute (60000/100)
  INPUT_PLACEHOLDER: 'Type in your tags and press Enter',
  INPUT_MAX_POS: 99, //Pixabay pattern value may not exceed 100 characters

  //Зроби так, щоб в кожній відповіді приходило 40 об'єктів(за замовчуванням 20).
  FETCH_PER_PAGE: 40, // for test  //6,

  NO_IMGS:
    'Sorry, there are no images matching your search query. Please try again.',

  NO_MORE_IMGS: "We're sorry, but you've reached the end of search results.",

  getImgNumberStr(totalHits, loadedHits) {
    return totalHits === loadedHits
      ? `Hooray! We found ${totalHits} images, loaded all of them.`
      : `Hooray! We found ${totalHits} images, loaded ${loadedHits}.`;
  },

  getNoMoreImages(total) {
    return `We're sorry, but you've reached the end of search results. All of ${total} images are loaded`;
  }
};

