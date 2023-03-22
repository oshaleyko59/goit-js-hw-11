// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

import renderCards from './rendering';

const SIMPLE_L_BOX_OPTS = {
  captionPosition: 'top',
  captionsData: 'alt',
  captionDelay: 250,
  close: false,
  scrollZoom: false,
  history: false,
};

class Refs {
  constructor() {
    this.btnGoIt = document.querySelector('.goit');
    this.input = document.getElementsByName('searchQuery')[0];
    this.btnSubmit = this.input.nextElementSibling;
    this.form = this.input.form;
    this.gallery = this.form.nextElementSibling;
    this.btnLoadMore = this.gallery.nextElementSibling;
    this.hideBtnLoadMore();

    //initialize SimpleLightBox
    this.SLBGallery = new SimpleLightbox('.gallery a', SIMPLE_L_BOX_OPTS);
    //EVENTS IN SLB NOT WORKING :(((
    //  this.SLBGallery.on('show.simplelightbox', testSLB);
    /* function () {
      conso le.log('opened slb');
      this.btnGoIt.disabled = true;
      this.btnSubmit.disabled = true;
    } */
    //  this.SLBGallery.on('closed.simplelightbox', testSLB1);
    /* function () {
      cons ole.log('closed slb');
      this.btnGoIt.disabled = false;
      this.btnSubmit.disabled = false;
    } */
    /*
    this.SLBGallery.on('error.simplelightbox', function (e) {
      console.log(e); // some usefull information
    }); */
  }
  //EVENTS IN SLB NOT WORKING :((( - this is "kostyl"
  handleButtons2FixSLB() {
    if (refs.isSLBon()) {
      if (!this.btnGoIt.disabled) {
       // console.log('bts disabled');
        this.btnGoIt.disabled = true;
        this.btnSubmit.disabled = true;
        this.btnGoIt.classList.add('disabled');
        this.btnSubmit.classList.add('disabled');
      }
    } else if (this.btnGoIt.disabled) {
     // console.log('bts enabled');
      this.btnGoIt.disabled = false;
      this.btnSubmit.disabled = false;
      this.btnGoIt.classList.remove('disabled');
      this.btnSubmit.classList.remove('disabled');
    }
  }

  isSLBon() {
    return this.SLBGallery.isOpen || this.SLBGallery.currentImage;
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

  // ***** for load-more btn only
  // #loadMoreBtnShown;

  /*   showBtnLoadMore() {
    this.btnLoadMore.style.display = 'block';
    this.#loadMoreBtnShown = true;
  }
 */
  hideBtnLoadMore() {
    this.btnLoadMore.style.display = 'none';
    // this.#loadMoreBtnShown = false;
  }

  /*   get loadMoreBtnShown() {
    return this.#loadMoreBtnShown;
  } */

  /*
  #galleryLength;

  get galleryLength() {
    return this.gallery.childElementCount;
  }
 */
}

const refs = new Refs();
export default refs;
