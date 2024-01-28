import axios from "axios"

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery");
const loaderEl = document.querySelector(".loader");
const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const messageFinishGallery = document.querySelector(".finish-loader")


const lightboxEl = new SimpleLightbox('.gallery a', {
    captionsData: "alt",
    captionDelay: 250,    
});

const queryParams = {
  query: "",
  page: 1,
  maxPage: 0,
  pageSize: 40,
}; 

searchForm.addEventListener("submit", handleSerch);
loadMoreBtn.addEventListener("click", handleLoadMore);


async function handleSerch(event) {
    event.preventDefault();
    loaderEl.style.display = "block";
    gallery.innerHTML = "";

    const form = event.currentTarget;
    queryParams.query = form.elements.query.value.trim();
    
    
    if (!queryParams.query) {
    loaderEl.style.display = "none"; 
    return 
    }

    try {
        const resp = await fetchImages(queryParams.query);
        if (resp.data.hits.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                    backgroundColor: "red",
                    icon: "none",
                });
            }
        createMarkup(resp.data.hits);
        
        // console.log(resp.data);
        // console.log("Ура заработало!");
        // console.log(resp.data.total);
        queryParams.maxPage = Math.ceil(resp.data.total / queryParams.pageSize); 
        
        // рахуємо і записуємо в обʼєкт максимальну кількість сторінок в нашому запиті, для цього ділимо кількість результатів на кількість обʼєктів, які ми отримуємо за один запит + округляємо догори

    } catch (err) {
        iziToast.error({
            message: "Oops, server connection error!",
            position: "topRight",
            backgroundColor: "red",
            icon: "none",
                });
    } finally {
        
        if (queryParams.page === queryParams.maxPage) {

            messageFinishGallery.classList.remove("is-hidden"); // виводимо повідовлення про кінець галереї

        } else {

            loadMoreBtn.classList.remove("is-hidden"); //показуємо кнопку  load More
        }

        form.reset(); // зкидуємо поля форми
        loaderEl.style.display = "none";
        
    }
}

async function fetchImages(query) {

    const BASE_URL = "https://pixabay.com/api";
    const API_KEY = "41900218-778e908913d1efd90b8f97d56"

    const searchParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: queryParams.pageSize,
    page: queryParams.page,
    })
     
    // const responce = await axios.get(`${BASE_URL}/?${searchParams}`);
    // console.log(responce);

    //  робимо запит
     return axios.get(`${BASE_URL}/?${searchParams}`);
    
}

async function handleLoadMore(event) {
  queryParams.page += 1; // збільшуємо номер сторінки
    // перед початком запиту - показуємо лоадер і блокуємо кнопку
    loaderEl.style.display = "block"
    loadMoreBtn.disabled = true;
    loadMoreBtn.classList.add("is-hidden"); //можна або морозити або ховати

  try {
      const respNext = await fetchImages(queryParams.query);
      // робимо запит на наступну сторінку новин
      
     createMarkup(respNext.data.hits);//малюємо розмітку
  } catch (err) {
    console.log(err);
  } finally {
      
      // після запиту - ховаємо лоадер і розблоковуємо/показуємо кнопку
      loaderEl.style.display = "none";
      loadMoreBtn.disabled = false;
      loadMoreBtn.classList.remove("is-hidden");
    // buttonService.enable(refs.loadMoreBtn, refs.preloader);

    // після натискання на кнопку та закінчення запиту перевіряємо, якщо ми зараз знаходимось на останній сторінці - то ховаємо кнопку, видаляємо обробник подій і додаємо повідомлення
    if (queryParams.page === queryParams.maxPage) {
        loadMoreBtn.classList.add("is-hidden");
        loadMoreBtn.removeEventListener("click", handleLoadMore);
        messageFinishGallery.classList.remove("is-hidden");
        
    }
  }
}



function createMarkup(arr) {
    const markup = arr.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>     
    `<li class="gallery-card">
        <a class="gallery-link" href="${largeImageURL}">
            <img 
                class="gallery-image"
                    src="${webformatURL}"
                    alt="${tags}"/>
        </a>
        
        <div class="titles-box">
            <div class="title-element">
                <p class="title-text">Likes:</p>
                <p class="title-value">${likes} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Views:</p>
                <p class="title-value">${views} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Comments:</p>
                <p class="title-value">${comments} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${downloads} </p>
            </div>
        </div>
    </li>`
    ).join("");

    gallery.insertAdjacentHTML ("beforeend", markup);

    lightboxEl.refresh();
}


