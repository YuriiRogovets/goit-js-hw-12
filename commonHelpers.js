import{S as v,i as d,a as L}from"./assets/vendor-990f3500.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerpolicy&&(s.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?s.credentials="include":e.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const b=document.querySelector(".search-form"),u=document.querySelector(".gallery"),c=document.querySelector(".loader"),o=document.querySelector('[data-action="load-more"]'),p=document.querySelector(".finish-loader"),q=new v(".gallery a",{captionsData:"alt",captionDelay:250}),a={query:"",page:1,maxPage:0,pageSize:40};b.addEventListener("submit",S);o.addEventListener("click",y);async function S(i){i.preventDefault(),c.style.display="block",u.innerHTML="";const t=i.currentTarget;if(a.query=t.elements.query.value.trim(),!a.query){c.style.display="none";return}try{const r=await m(a.query);r.data.hits.length===0&&d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"red",icon:"none"}),f(r.data.hits),a.maxPage=Math.ceil(r.data.total/a.pageSize)}catch{d.error({message:"Oops, server connection error!",position:"topRight",backgroundColor:"red",icon:"none"})}finally{a.page===a.maxPage?p.classList.remove("is-hidden"):o.classList.remove("is-hidden"),t.reset(),c.style.display="none"}}async function m(i){const t="https://pixabay.com/api",r="41900218-778e908913d1efd90b8f97d56",l=new URLSearchParams({key:r,q:i,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:a.pageSize,page:a.page});return L.get(`${t}/?${l}`)}async function y(i){a.page+=1,c.style.display="block",o.disabled=!0,o.classList.add("is-hidden");try{const t=await m(a.query);f(t.data.hits)}catch(t){console.log(t)}finally{c.style.display="none",o.disabled=!1,o.classList.remove("is-hidden"),a.page===a.maxPage&&(o.classList.add("is-hidden"),o.removeEventListener("click",y),p.classList.remove("is-hidden"))}}function f(i){const t=i.map(({largeImageURL:r,webformatURL:l,tags:e,likes:s,views:n,comments:g,downloads:h})=>`<li class="gallery-card">
        <a class="gallery-link" href="${r}">
            <img 
                class="gallery-image"
                    src="${l}"
                    alt="${e}"/>
        </a>
        
        <div class="titles-box">
            <div class="title-element">
                <p class="title-text">Likes:</p>
                <p class="title-value">${s} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Views:</p>
                <p class="title-value">${n} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Comments:</p>
                <p class="title-value">${g} </p>
            </div>
            <div class="title-element">
                <p class="title-text">Downloads:</p>
                <p class="title-value">${h} </p>
            </div>
        </div>
    </li>`).join("");u.insertAdjacentHTML("beforeend",t),q.refresh()}
//# sourceMappingURL=commonHelpers.js.map
