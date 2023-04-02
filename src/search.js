
import axios from 'axios';
import Notiflix from 'notiflix';

import { renderGallery, resetGallery } from './gallery';

import { BASE_PIXABAY_URL, DEFAULT_SEARCH_PARAM } from './constant';

const formEl = document.querySelector('#search-form');
const loadMoreBtnEl = document.querySelector('#load_more');

const requestParam = DEFAULT_SEARCH_PARAM;

let maxPages = 0;
let isShowInfoFoundImages = false;

const getImages = async (requestParam) => {
    const searchParams = new URLSearchParams(requestParam);

    try {
        const { data } = await axios.get(`${BASE_PIXABAY_URL}?${searchParams}`);

        renderGallery(data.hits);

        if (data.totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } else {
            maxPages = Math.ceil(data.totalHits / requestParam.per_page);
            loadMoreBtnEl.classList.remove('hidden');

            if (!isShowInfoFoundImages) {
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
                isShowInfoFoundImages = true;
            }
        }

    } catch (e) {
        Notiflix.Notify.failure(e.message);
    }
}

const handleFormSubmit = (e, formEl) => {
    const formData = new FormData(formEl);
    const { searchQuery } = Object.fromEntries(formData);

    e.preventDefault();
    isShowInfoFoundImages = false;
    loadMoreBtnEl.classList.add('hidden');
    requestParam.q = searchQuery.trim();
    requestParam.page = 1;

    if (requestParam.q) {
        resetGallery();
        getImages(requestParam);
    }
}

const handleLoadMore = () => {
    requestParam.page += 1;
    console.log(requestParam, maxPages);

    if (requestParam.page > maxPages) {
        loadMoreBtnEl.classList.add('hidden');
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results");
    } else {
        getImages(requestParam);
    }
}

loadMoreBtnEl.addEventListener('click', handleLoadMore);

formEl.addEventListener('submit', (e) => handleFormSubmit(e, formEl));