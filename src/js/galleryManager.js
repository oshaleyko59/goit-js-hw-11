import fetchPictures from './fetchPictures';
import CONF from './config';
import * as show from './notifications';
import InfScroll from './infiniteScroll';
import refs from './referrals';

//gallery manager object
class GalleryManager {
  #infScrollAllowed;
  #infScrollEnabled;
  #infScroll = null;

  constructor(onScrollThreshold) {
    this.#infScrollEnabled = false;
    this.#infScrollAllowed = false;

    if (onScrollThreshold) {
      this.#infScroll = new InfScroll(CONF.MIN_TIME_BTW_REQS);
      this.#infScroll.onThreshold = onScrollThreshold;
      this.#infScrollAllowed = true;
    }
  }

  #page = 1;
  #clue = 'cat';
  #previous_clue = '';
  #totalHits = 0;
  #loadedHits = 0;

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
    show.success(CONF.getImgNumberStr(this.#totalHits, this.#loadedHits));

    // inform of result
    if (this.isMoreToLoad()) {
      //some more images to load
      if (this.#infScrollAllowed && !this.#infScrollEnabled) {
        this.#infScroll.enableInfScroll();
        this.#infScrollEnabled = true;
      }

      if (!this.#infScrollAllowed) {
        refs.showBtnLoadMore();
      }
    } else if (this.#infScrollEnabled) {
      //no more images to load
      this.#infScroll.disableInfScroll();
      this.#infScrollEnabled = false;
    }

    refs.appendGallery(r.hits);
    return r;
  }

  async run() {
    await fetchPictures(this.#clue, this.#page, CONF.FETCH_PER_PAGE)
      .then(r => this.processResponse(r))
      .catch(e => {
        if (this.#infScrollEnabled) {
          this.#infScroll.disableInfScroll();
          this.#infScrollEnabled = false;
        }
        if (!this.#infScrollAllowed) {
          refs.hideBtnLoadMore();
        }
        show.error(e.message);
      });
  }

  // **** only for load-more btn
  endThisSearch() {
    show.warning(CONF.getNoMoreImages(this.#totalHits));
    refs.scrollTillEnd();
  }
}

export default GalleryManager;
