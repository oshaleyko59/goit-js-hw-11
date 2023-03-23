// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import renderCards from './rendering';

const SIMPLE_L_BOX_OPTS = {
  captionPosition: 'top', //
  scrollZoom: false,
  showCounter: false,
  nav: false,
  captionsData: 'alt',
  captionDelay: 250,
  close: false,
  history: false,
};

class Refs {
  constructor() {
    this.btnGoIt = document.querySelector('.goit');
    this.input = document.getElementsByName('searchQuery')[0];
    this.btnSubmit = this.input.nextElementSibling;
    this.form = this.input.form;
    this.gallery = this.form.nextElementSibling;
    //hide Btn LoadMore
    this.gallery.nextElementSibling.style.display = 'none';
    //initialize SimpleLightBox
    this.SLBGallery = new SimpleLightbox('.gallery a', SIMPLE_L_BOX_OPTS);
  }

  clearGalleryContent() {
    this.gallery.innerHTML = '';
    this.SLBGallery.refresh();
  }

  appendGallery(hits) {
    //save last child element to move scroll
    const lastElBeforeAdd = this.gallery.lastElementChild;

    this.gallery.insertAdjacentHTML('beforeend', renderCards(hits));
    this.SLBGallery.refresh();

    //scroll till first added images in the view
    if (lastElBeforeAdd) {
      lastElBeforeAdd.nextElementSibling.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    }
  }

  scrollTillEnd() {
    this.gallery.lastElementChild.scrollIntoView({
      block: 'end',
      behavior: 'smooth',
    });
  }
}

const refs = new Refs();
export default refs;


// ****************************************************
  // ***** for load-more btn only
  // #loadMoreBtnShown;

  /*   showBtnLoadMore() {
    this.btnLoadMore.style.display = 'block';
    this.#loadMoreBtnShown = true;
  }

  hideBtnLoadMore() {
    this.btnLoadMore.style.display = 'none';
    this.#loadMoreBtnShown = false;
  }
 */
  /*   get loadMoreBtnShown() {
    return this.#loadMoreBtnShown;
  } */

  /*
  #galleryLength;

  get galleryLength() {
    return this.gallery.childElementCount;
  }
 */

/*   isSLBon() {
    consol e.log(
      'SLBon',
      this.SLBGallery.isOpen ||
        this.SLBGallery.currentImage, document.body.classList.contains(
          'simple-lightbox'
        )
    );
    return this.SLBGallery.isOpen || this.SLBGallery.currentImage;
  } */
