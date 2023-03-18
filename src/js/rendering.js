/*
У відповіді буде масив зображень, що задовольнили критерії запиту.
Кожне зображення описується об'єктом. Following keys shall be used:
  * webformatURL - посилання на маленьке зображення для списку карток.//TODO:
  * largeImageURL - посилання на велике зображення.
  * tags - рядок з описом зображення. Підійде для атрибуту alt.
  * likes - кількість лайків.
  * views - кількість переглядів.
  * comments - кількість коментарів.
  * downloads - кількість завантажень.
 */
/* Розмітка картки одного зображення для галереї */
function renderCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<a  href="${largeImageURL}">
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>${likes}
          </p>
          <p class="info-item">
            <b>Views</b>${views}
          </p>
          <p class="info-item">
            <b>Comments</b>${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>${downloads}
          </p>
        </div>
      </div>
    </a>`;
}

export default function renderCards(hitsArr) {
  return hitsArr.map(hit => renderCard(hit)).join('');
}
