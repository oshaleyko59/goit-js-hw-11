class Refs{
  constructor() {
    console.log(document);
    this.input = document.getElementsByName('searchQuery')[0];
    this.form = this.input.form;
    this.btnSearch = this.input.nextElementSibling;
    this.gallery = this.form.nextElementSibling;
    this.btnLoadMore = this.gallery.nextElementSibling;
  }
}
const refs = new Refs();
export default refs;

