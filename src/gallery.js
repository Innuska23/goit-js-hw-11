import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.querySelector('.gallery');
const simpleLightbox = new SimpleLightbox('.gallery a', { caption: true, captionDelay: 250 });

const createPhotoCard = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `
        <div class="photo-card">
            <a class="photo__link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
                <div class="info">
                    <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                    </p>
                    <p class="info-item">
                    <b>Views</b>
                    ${views}
                    </p>
                    <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                    </p>
                    <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                    </p>
                </div>
        </div>`
};

export const resetGallery = () => galleryEl.innerHTML = '';

export const renderGallery = (listImages) => {
    const listCards = listImages.map(createPhotoCard).join('');;

    galleryEl.insertAdjacentHTML('beforeend', listCards)
    simpleLightbox.refresh();
}
