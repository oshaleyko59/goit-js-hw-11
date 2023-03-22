import fetchPictures from './fetchPictures';
import CONF from './config';
import InfScroll from './infiniteScroll';

//gallery manager object
class GalleryManager {
  #infScrollAllowed;
  #infScrollEnabled;
  #infScroll;
  #onSuccess;
  #onError;

  constructor({ onScrollThreshold, onSuccess, onError }) {
    this.#infScrollEnabled = false;
    this.#infScrollAllowed = false;

    if (onScrollThreshold) {
      this.#infScroll = new InfScroll(
        onScrollThreshold, CONF.MIN_TIME_BTW_REQS,
        CONF.SCROLL_THRESHOLD
      );
      this.#infScrollAllowed = true;
    }

    this.#onError = onError;
    this.#onSuccess = onSuccess;
  }

  #page = 1;
  #clue = 'cat';
  #previous_clue = '';
  #loadedHits = 0;
  #totalHits = 0;

  get totalHits() {
    return this.#totalHits;
  }

  get loadedHits() {
    return this.#loadedHits;
  }
  clear() {
    this.#previous_clue = '';
  }

  nextPage() {
    this.#page += 1;
    this.run();
  }

  startOver(clue) {
    this.#page = 1;
    this.#clue = clue.slice(0, CONF.INPUT_MAX_POS);
    this.#previous_clue = this.#clue;
    this.#totalHits = 0;
    this.#loadedHits = 0;
    this.run();
  }

  isMoreToLoad() {
    return this.#totalHits > this.#loadedHits;
  }

  isNewSearch(clue) {
    //check if input changed
    clue = clue.slice(0, CONF.INPUT_MAX_POS);
    return (
      this.#previous_clue.length !== clue.length ||
      !clue.startsWith(this.#previous_clue)
    );
  }

  processResponse(r) {
    if (r.hits.length === 0) {
      //empty hits array returned -> error
      throw new Error(CONF.NO_IMGS);
    }

    this.#totalHits = r.totalHits;
    this.#loadedHits += r.hits.length;

    // inform of result
    if (this.isMoreToLoad()) {
      //some more images to load
      if (this.#infScrollAllowed && !this.#infScrollEnabled) {
        this.#infScroll.enableInfScroll();
        this.#infScrollEnabled = true;
      }
    } else if (this.#infScrollEnabled) {
      //no more images to load
      this.#infScroll.disableInfScroll();
      this.#infScrollEnabled = false;
    }

    return r;
  }

  async run() {
    await fetchPictures(this.#clue, this.#page, CONF.FETCH_PER_PAGE)
      .then(r => {
        this.processResponse(r);
        if (this.#onSuccess) {
          this.#onSuccess(this.#clue, this.#totalHits, this.#loadedHits, r.hits);
        }
      })
      .catch(e => {
        if (this.#infScrollEnabled) {
          this.#infScroll.disableInfScroll();
          this.#infScrollEnabled = false;
        }
        if (this.#onError) {
          this.#onError(e);
        } else {
          console.log(e.message);
        }
      });
  }
}

export default GalleryManager;
