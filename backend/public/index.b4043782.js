function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,a={},s={},r=t.parcelRequirebbb8;null==r&&((r=function(e){if(e in a)return a[e].exports;if(e in s){var t=s[e];delete s[e];var r={id:e,exports:{}};return a[e]=r,t.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){s[e]=t},t.parcelRequirebbb8=r),(0,r.register)("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>a,set:e=>a=e,enumerable:!0,configurable:!0});var a,s=new Map;a=function(e,t){for(var a=0;a<t.length-1;a+=2)s.set(t[a],{baseUrl:e,path:t[a+1]})}}),r("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["4E3su","index.b4043782.js","53wIO","icons.d3157edb.svg"]'));var i={};i=new URL("icons.d3157edb.svg",import.meta.url).toString();class n{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let a=this._generateHTML();if(!t)return a;this._clear(),this._parentElement.insertAdjacentHTML("beforeend",a)}update(e){this._data=e;let t=this._generateHTML(),a=Array.from(document.createRange().createContextualFragment(t).querySelectorAll("*")),s=Array.from(this._parentElement.querySelectorAll("*"));a.forEach((e,t)=>{let a=s[t];e.isEqualNode(a)||e.firstChild?.nodeValue?.trim()===""||(a.innerHTML=e.innerHTML),e.isEqualNode(a)||Array.from(e.attributes).forEach(e=>{a.setAttribute(e.name,e.value)})})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let t=`
    <div class="spinner">
    <svg>
        <use href="${e(i)}#icon-loader"></use>
    </svg>
    </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("beforeend",t)}renderMessage(e=this._errorMessage){let t=`
    <div class="message">
        <div class="message-box">
            <span>${e}</span>
        </div>
    </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("beforeend",t)}}class o extends n{_parentElement=document.querySelector(".film-container");_errorMessage="We could not find any film for this query,please try another one!!!";addHandlerRender(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerStar(e){this._parentElement.addEventListener("click",function(t){let a=t.target.closest(".details-stars__star");a&&e(+a.id.split("--")[1])})}addHandlerBookmark(e){this._parentElement.addEventListener("click",function(t){t.target.closest(".bookmark-btn")&&e()})}_generateHTML(){return`
    <button class='bookmark-btn'>
        <svg>
            <use href="${e(i)}#icon-bookmark${this._data.bookmarked?"":"-outline"}"></use>
          </svg>
        </button>
    <figure class="film-image">
                <img
                src="${this._data.poster}"
                alt="${this._data.title}"
                class="film-image__photo"
                />
                <span class="film-image__name">${this._data.title}</span>
            </figure>
            <div class="film-details">
                <div class="film-details__detail">
                <svg>
                    <use href="${e(i)}#icon-star"></use>
                </svg>
                <span>${this._data.imdbRating}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${e(i)}#icon-calendar"></use>
                </svg>
                <span>${new Date(this._data.released).toISOString().substring(0,10)}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${e(i)}#icon-stopwatch"></use>
                </svg>
                <span>${this._data.runtime} min</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${e(i)}#icon-clapperboard"></use>
                </svg>
                <span>${this._data.genre}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${e(i)}#icon-video-camera"></use>
                </svg>
                <span>${this._data.director}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${e(i)}#icon-calendar"></use>
                </svg>
                <span>${this._data.year}</span>
                </div>
            </div>
            <div class="details-stars">
            ${Array.from({length:this._data.userReview||0},(e,t)=>t+1).map(t=>`<span class='details-stars__star' id='star--${t}'><svg>
        <use href="${e(i)}#icon-star"></use>
      </svg></span>`).join("")}
         ${Array.from({length:10-(this._data.userReview||0)},(e,t)=>t+(this._data.userReview||0)+1).map(t=>`<span class='details-stars__star' id='star--${t}'><svg>
        <use href="${e(i)}#icon-star-outlined"></use>
      </svg></span>`).join("")}
            </div>
            <div class="details-plot">
                <p>
                ${this._data.plot}
                </p>
            </div>
            <div class="details-actors">
            ${this._data.actors.map(t=>`<div class="details-actors__actor">
            <svg>
                <use href="${e(i)}#icon-person_pin_circle"></use>
            </svg>
            <span>${t}</span>
            </div>`).join("")}
            </div>
            <div class="details-button">
                <a href="https://www.imdb.com/title/${this._data.imdbID}" class="details-button__link">Get Details</a>
            </div>
    `}}var l=new o;const d="/api/v1/films",c="ZW5lc0BtYWlsLmlvZW5lcw==",u=function(e){return new Promise(function(t,a){setTimeout(function(){a(Error(`Request took too long! Timeout after ${e} second`))},1e3*e)})};async function m(e){try{let t=await Promise.race([fetch(e),u(10)]),a=await t.json();if("fail"===a.status)throw Error(a.message);return a}catch(e){throw e}}async function p(e,t){try{let a=fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),s=await Promise.race([a,u(10)]),r=await s.json();if("fail"===r.status)throw Error(r.message);return r}catch(e){throw e}}const _={film:{},search:{query:"",result:[],page:1,perPage:5},bookmarks:[]};function h(e){_.film={id:e._id,title:e.title,year:e.year,released:e.released,runtime:e.runtime,genre:e.genre.join(","),director:e.director,actors:e.actors,plot:e.plot,poster:e.poster,imdbRating:e.imdbRating,imdbID:e.imdbId}}async function g(e){try{let{film:t}=(await m(`${d}/${e}/?api_key=${c}`)).data;h(t),_.bookmarks.some(t=>t.id===e)?_.film.bookmarked=!0:_.film.bookmarked=!1,console.log(_.bookmarks,_.film.bookmarked)}catch(e){throw e}}async function f(e){try{_.query=e;let{films:t}=(await m(`${d}/?api_key=${c}&q=${e}`)).data;_.search.result=t.map(e=>({id:e._id,title:e.title,plot:e.plot,poster:e.poster}))}catch(e){throw e}}function v(e=_.search.page){_.search.page=e;let t=(e-1)*_.search.perPage,a=e*_.search.perPage;return _.search.result.slice(t,a)}const b=function(e){_.film.userReview=e,_.film.imdbRating=((e+parseFloat(_.film.imdbRating))/2).toFixed(1)};function k(){localStorage.setItem("bookmarks",JSON.stringify(_.bookmarks))}const y=function(e){_.bookmarks.push(e),e.id===_.film.id&&(_.film.bookmarked=!0),k()},w=function(e){let t=_.bookmarks.findIndex(t=>t.id===e);_.bookmarks.splice(t,1),e===_.film.id&&(_.film.bookmarked=!1),k()};async function $(e){try{e.actors=e.actors.replaceAll(" ","").split(","),e.genre=e.genre.replaceAll(" ","").split(",");let{film:t}=(await p(`${d}/?api_key=${c}`,e)).data;console.log(t,e),h(t)}catch(e){throw e}}!function(){let e=localStorage.getItem("bookmarks");e&&(_.bookmarks=JSON.parse(e))}();class E{_parentElement=document.querySelector(".search");getQuery(){let e=this._parentElement.querySelector(".search__input").value;return this._clearInput(),e}_clearInput(){this._parentElement.querySelector(".search__input").value=""}addHandlerSubmit(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e()})}}var S=new E;class H extends n{_parentElement=document.querySelector(".sidebar__list");_errorMessage="No films found for your query!!!";_generateHTML(){let e=window.location.hash.slice(1);return this._data.map(t=>`<li class="sidebar__item ${e===t.id?"sidebar__item--active":""}">
        <a href="#${t.id}" class="sidebar__link">
          <img
            src="${t.poster}"
            alt="${t.title}"
            class="sidebar__photo"
          />
          <div class="sidebar__details">
            <h2 class="sidebar__title">${t.title}</h2>
            <p class="sidebar__description">
              ${t.plot}
            </p>
          </div>
        </a>
      </li> `).join("")}}var L=new H;class M extends n{_parentElement=document.querySelector(".pagination");addHandlerRender(e){this._parentElement.addEventListener("click",t=>{let a=t.target.closest(".pagination__btn");a&&e(+a.dataset.goto)})}_generateHTML(){let e=Math.ceil(this._data.result.length/this._data.perPage),t=this._data.page;return 1===t&&e>1?this._generateNextButton(t):t===e&&e>1?this._generatePrevButton(t):t<e?[this._generatePrevButton(t),this._generateNextButton(t)].join(""):""}_generatePrevButton(t){return`
    <button data-goto="${t-1}" class="pagination__btn pagination__btn--prev">
        <svg>
          <use href="${e(i)}#icon-arrow-with-circle-left"></use>
        </svg>
        <span>Page ${t-1}</span>
      </button>
        `}_generateNextButton(t){return`
    <button data-goto="${t+1}" class="pagination__btn pagination__btn--next">
        <span>Page ${t+1}</span>
        <svg>
          <use href="${e(i)}#icon-arrow-with-circle-right"></use>
        </svg>
      </button>
        `}}var q=new M;class R extends n{_parentElement=document.querySelector(".sidebar__list--bookmarks");_errorMessage="No films found in watch list yet!!!";addHandlerRender(e){e()}_generateHTML(){let e=window.location.hash.slice(1);return this._data.map(t=>`<li class="sidebar__item ${e===t.id?"sidebar__item--active":""}">
        <a href="#${t.id}" class="sidebar__link">
          <img
            src="${t.poster}"
            alt="${t.title}"
            class="sidebar__photo"
          />
          <div class="sidebar__details">
            <h2 class="sidebar__title">${t.title}</h2>
            <p class="sidebar__description">
              ${t.plot}
            </p>
          </div>
        </a>
      </li> `).join("")}}var x=new R;class T extends n{_parentElement=document.querySelector(".add-form");_overlay=document.querySelector(".add-popup");_showButton=document.querySelector("#show-popup");constructor(){super(),this.addHandlerShow(),this.addHandlerClose()}_togglePopup(){this._overlay.classList.toggle("target"),this._parentElement.querySelector(".message").remove()}addHandlerShow(){this._showButton.addEventListener("click",this._togglePopup.bind(this))}addHandlerClose(){this._overlay.addEventListener("click",function(e){(!e.target.closest(".add-form")||e.target.classList.contains("add-form__close"))&&document.querySelector(".add-popup").classList.remove("target")})}addHandlerUpload(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e(Object.fromEntries([...new FormData(this)]))})}renderMessage(e=this._errorMessage){let t=`
    <div class="message">
        <div class="message-box">
            <span>${e}</span>
        </div>
    </div>
    <span class="add-form__close">&times;</span>
    `;this._parentElement.insertAdjacentHTML("beforeend",t),window.setTimeout(()=>{this._parentElement.querySelector(".message")?.remove()},2500)}}var A=new T;async function j(){try{let e=window.location.hash.slice(1);if(!e)return;l.renderSpinner(),x.update(_.bookmarks),L.update(v()),await g(e),l.render(_.film)}catch(e){console.error(e),l.renderMessage()}}async function P(){try{L.renderSpinner();let e=S.getQuery();await f(e),L.render(v()),q.render(_.search)}catch(e){L.renderMessage(e.message)}}async function N(e){try{await $(e),A.renderError("Uploaded successfully"),l.render(_.film),window.setTimeout(()=>{A._togglePopup()},2500)}catch(e){console.log(e),A.renderMessage(e.message)}}l.addHandlerRender(j),S.addHandlerSubmit(P),q.addHandlerRender(function(e){console.log(e),L.update(v(e)),q.render(_.search)}),l.addHandlerStar(function(e){b(e),l.update(_.film)}),l.addHandlerBookmark(function(){_.film.bookmarked?w(_.film.id):y(_.film),l.update(_.film),x.render(_.bookmarks)}),x.addHandlerRender(function(){x.render(_.bookmarks)}),A.addHandlerUpload(N);
//# sourceMappingURL=index.b4043782.js.map
