import{S as f,i as d,a as v}from"./assets/vendor-990f3500.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const L=document.querySelector(".search-form"),p=document.querySelector(".gallery"),c=document.querySelector(".loader"),o=document.querySelector('[data-action="load-more"]'),u=document.querySelector(".finish-loader"),q=new f(".gallery a",{captionsData:"alt",captionDelay:250}),t={query:"",page:1,maxPage:0,pageSize:40};L.addEventListener("submit",b);o.addEventListener("click",S);async function b(i){i.preventDefault(),c.style.display="block",o.classList.add("is-hidden"),u.classList.add("is-hidden"),p.innerHTML="";const s=i.currentTarget;if(t.query=s.elements.query.value.trim(),t.page=1,!t.query)return c.style.display="none",d.error({message:"Enter a query value, please",position:"topRight",backgroundColor:"green",icon:"none"});try{const a=await g(t.query);if(a.data.hits.length===0)return d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",icon:"none"});m(a.data.hits),t.maxPage=Math.ceil(a.data.totalHits/t.pageSize),t.page===t.maxPage?(u.classList.remove("is-hidden"),o.classList.add("is-hidden")):o.classList.remove("is-hidden"),s.reset()}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{c.style.display="none"}}function g(i){const s="https://pixabay.com/api",a="41900218-778e908913d1efd90b8f97d56",n=new URLSearchParams({key:a,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:t.pageSize,page:t.page});return v.get(`${s}/?${n}`)}async function S(i){t.page+=1,c.style.display="block",o.classList.add("is-hidden");try{const s=await g(t.query);if(m(s.data.hits),t.page===t.maxPage)o.classList.add("is-hidden"),u.classList.remove("is-hidden");else{o.classList.remove("is-hidden");const a=document.querySelector(".gallery-card").getBoundingClientRect();window.scrollBy(0,a.height*2)}}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{c.style.display="none"}}function m(i){const s=i.map(({largeImageURL:a,webformatURL:n,tags:e,likes:r,views:l,comments:y,downloads:h})=>`<li class="gallery-card">
        <a class="gallery-link" href="${a}">
            <img 
                class="gallery-image"
                    src="${n}"
                    alt="${e}"/>
        </a>
        
        <div class="titles-box">
            <div class="title-element">
                <p class="title-text">Likes:</p>
                <p class="title-value">${r} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Views:</p>
                <p class="title-value">${l} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Comments:</p>
                <p class="title-value">${y} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${h} </p>
            </div>
        </div>
    </li>`).join("");p.insertAdjacentHTML("beforeend",s),q.refresh()}
//# sourceMappingURL=commonHelpers.js.map
