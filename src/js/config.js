/* ************************* CONFIGURATION ***************************
  constants and expressions based on constants
*/

const CONF = {
  MIN_TIME_BTW_REQS: 600, //Pixabay Rate Limit = 100 requests per minute (60000/100)
  INPUT_MAX_POS: 99, //Pixabay pattern value may not exceed 100 characters
  SCROLL_THRESHOLD: 0.5, //threshold for infinite scroll - 50% of screen height
  //Зроби так, щоб в кожній відповіді приходило 40 об'єктів(за замовчуванням 20).
  FETCH_PER_PAGE: 40,

  NO_INPUT_GOIT: 'Want to try your luck? Click GOIT button!',
  NO_IMGS:
    'Sorry, there are no images matching your search query. Please try again.',

  // NO_MORE_IMGS: "We're sorry, but you've reached the end of search results."
  getImgNumberStr(query, totalHits, loadedHits) {
    return totalHits <= loadedHits
      ? `Hooray! We found ${loadedHits} images for "${query}", loaded all of them.`
      : `Hooray! We found ${totalHits} images for "${query}", loaded ${loadedHits}.`;
  },

  getNoMoreImages(total) {
    return `We're sorry, but you've reached the end of search results. All of ${total} images are loaded`;
  },
};

export default CONF;
