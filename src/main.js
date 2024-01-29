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
    loadMoreBtn.classList.add("is-hidden"); //прибираємо кнопку loadMore
    messageFinishGallery.classList.add("is-hidden"); 
    
    gallery.innerHTML = "";

    const form = event.currentTarget;
    queryParams.query = form.elements.query.value.trim();
    queryParams.page = 1;
    
    if (!queryParams.query) {
    loaderEl.style.display = "none"; 
    return;
    }

    try {
        const resp = await fetchImages(queryParams.query);
        if (resp.data.hits.length === 0) {
                
                return iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                    backgroundColor: "red",
                    icon: "none",
                });
                
                
        } else {
            createMarkup(resp.data.hits);
            
            loadMoreBtn.classList.remove("is-hidden"); //показуємо кнопку loadMore

            queryParams.maxPage = Math.ceil(resp.data.total / queryParams.pageSize);      
           // рахуємо і записуємо в обʼєкт максимальну кількість сторінок в нашому запиті,
        }        

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

             loadMoreBtn.classList.add("is-hidden"); // ховаємо кнопку loadMore
        } 

        form.reset(); // скидуємо поля форми
        loaderEl.style.display = "none";
        
    }
    console.log(queryParams.page);
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
     
        //  робимо запит
     return axios.get(`${BASE_URL}/?${searchParams}`);
    
}

async function handleLoadMore(event) {
    queryParams.page += 1; // збільшуємо номер сторінки
    // перед початком запиту - показуємо лоадер і ховаємо кнопку
    loaderEl.style.display = "block"
    loadMoreBtn.classList.add("is-hidden"); //можна або ховати або морозити (loadMoreBtn.disabled = true;)

    try {
        const respNext = await fetchImages(queryParams.query);// робимо запит на наступну сторінку
        
        createMarkup(respNext.data.hits);//малюємо розмітку
    } catch (err) {
        iziToast.error({
            message: "Oops, server connection error!",
            position: "topRight",
            backgroundColor: "red",
            icon: "none",
                });
    } finally {
        
        loaderEl.style.display = "none";
       
        //  перевіряємо, якщо ми зараз знаходимось на останній сторінці - то ховаємо кнопку і додаємо повідомлення
        if (queryParams.page === queryParams.maxPage) {
            loadMoreBtn.classList.add("is-hidden");
            loadMoreBtn.removeEventListener("click", handleLoadMore);
            messageFinishGallery.classList.remove("is-hidden");
            
        } else {
            loadMoreBtn.classList.remove("is-hidden");
            const galleryCard = document.querySelector(".gallery-card").getBoundingClientRect();
        window.scrollBy(0, galleryCard.height * 2);
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


