import{S as v,i as d,a as L}from"./assets/vendor-990f3500.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const q=document.querySelector(".search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".loader"),o=document.querySelector('[data-action="load-more"]'),p=document.querySelector(".finish-loader"),S=new v(".gallery a",{captionsData:"alt",captionDelay:250}),s={query:"",page:1,maxPage:0,pageSize:40};q.addEventListener("submit",b);o.addEventListener("click",y);async function b(i){i.preventDefault(),c.style.display="block",o.classList.add("is-hidden"),p.classList.add("is-hidden"),u.innerHTML="";const t=i.currentTarget;if(s.query=t.elements.query.value.trim(),s.page=1,!s.query){c.style.display="none";return}try{const a=await m(s.query);if(a.data.hits.length===0)return d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",icon:"none"});g(a.data.hits),o.classList.remove("is-hidden"),s.maxPage=Math.ceil(a.data.total/s.pageSize)}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{s.page===s.maxPage&&(p.classList.remove("is-hidden"),o.classList.add("is-hidden")),t.reset(),c.style.display="none"}console.log(s.page)}async function m(i){const t="https://pixabay.com/api",a="41900218-778e908913d1efd90b8f97d56",n=new URLSearchParams({key:a,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:s.pageSize,page:s.page});return L.get(`${t}/?${n}`)}async function y(i){s.page+=1,c.style.display="block",o.classList.add("is-hidden");try{const t=await m(s.query);g(t.data.hits)}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{if(c.style.display="none",s.page===s.maxPage)o.classList.add("is-hidden"),o.removeEventListener("click",y),p.classList.remove("is-hidden");else{o.classList.remove("is-hidden");const t=document.querySelector(".gallery-card").getBoundingClientRect();window.scrollBy(0,t.height*2)}}}function g(i){const t=i.map(({largeImageURL:a,webformatURL:n,tags:e,likes:r,views:l,comments:h,downloads:f})=>`<li class="gallery-card">
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
                <p class="title-value">${h} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${f} </p>
            </div>
        </div>
    </li>`).join("");u.insertAdjacentHTML("beforeend",t),S.refresh()}
//# sourceMappingURL=commonHelpers.js.map
