function e(e,t,n,o){Object.defineProperty(e,t,{get:n,set:o,enumerable:!0,configurable:!0})}function t(e){return e&&e.__esModule?e.default:e}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o={},r={},c=n.parcelRequire3a97;null==c&&((c=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var n={id:e,exports:{}};return o[e]=n,t.call(n.exports,n,n.exports),n.exports}var c=new Error("Cannot find module '"+e+"'");throw c.code="MODULE_NOT_FOUND",c}).register=function(e,t){r[e]=t},n.parcelRequire3a97=c),c.register("27Lyk",(function(t,n){var o,r;e(t.exports,"register",(()=>o),(e=>o=e)),e(t.exports,"resolve",(()=>r),(e=>r=e));var c={};o=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)c[t[n]]=e[t[n]]},r=function(e){var t=c[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),c("27Lyk").register(JSON.parse('{"6eg5j":"profile.9fad9e6a.js","fudG5":"cat.099c148c.png","S7XuS":"elephant.fa51bf24.png","cmZiW":"turtle.bbf3eac3.png","3gJ8R":"profile.5fc18753.js"}'));const a="https://slutprojekt-js2-default-rtdb.europe-west1.firebasedatabase.app/";async function s(){const e=a+".json",t=await fetch(e);return await t.json()}async function i(e,t,n){const o=`${a}${t}/posts/${n}.json`,r={method:"PUT",body:JSON.stringify(e),headers:{"Content-Type":"application/json; charset=UTF-8"}};await fetch(o,r)}async function l(e){const t=`${a}${e}.json`;await fetch(t,{method:"DELETE"})}const d=localStorage.getItem("loggedInUser");var u={};u=new URL("../"+c("27Lyk").resolve("fudG5"),import.meta.url).toString();var p={};p=new URL("../"+c("27Lyk").resolve("S7XuS"),import.meta.url).toString();var m={};function f(e,t,n){const o=document.createElement("div");o.classList.add("post");const r=document.createElement("div");r.classList.add("userNameAndPic");const c=document.createElement("img");let a;c.classList.add("profilepic"),a="profilepic"in t&&"cat.png"==t.profilepic?new URL(u):"profilepic"in t&&"elephant.png"==t.profilepic?new URL(p):new URL(m),c.src=a.href;const s=document.createElement("div");s.classList.add("username"),s.innerText=t.username,r.append(c,s);const i=document.createElement("div");i.classList.add("message"),i.innerText=e.message;const l=document.createElement("div");l.classList.add("timestamp");const d=new Date(e.timestamp);l.innerText=`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`,o.append(r,i,l),n.append(o)}m=new URL("../"+c("27Lyk").resolve("cmZiW"),import.meta.url).toString();const g=document.querySelector(".log-out-btn"),y=(document.querySelector(".profile-btn"),document.querySelector(".feed-btn"));function E(){localStorage.removeItem("loggedInUser"),location.assign("../index.html")}const w=localStorage.getItem("loggedInUser");var h=c("45fvw");async function L(){const e=document.querySelector("#my-posts");e.innerHTML="";(await s()).forEach((t=>{t&&t.username===w&&t.posts.reverse().forEach((n=>{f(n,t,e)}))}))}w?(!async function(){const e=document.querySelector(".userinfo");(await s()).forEach((t=>{if(t&&t.username===d){const n=document.createElement("p"),o=document.createElement("img");let r;e.append(n,o),n.innerText=t.username,r="cat.png"==t.profilepic?new URL(u):"elephant.png"==t.profilepic?new URL(p):new URL(m),o.src=r.href}}))}(),async function(e){const t=document.querySelector(".user-card");document.querySelector(".user-card h3").innerText=e,(await s()).forEach((n=>{if(n&&n.username===e){const e=document.createElement("img");let o;t.append(e),o="cat.png"==n.profilepic?new URL(u):"elephant.png"==n.profilepic?new URL(p):new URL(m),e.src=o.href}}))}(w),L()):location.assign("../index.html");const v=document.querySelector("#newPostForm");v&&v.addEventListener("submit",(async e=>{e.preventDefault();const n={message:document.querySelector("#new-post").value,timestamp:t(h)().format("YYYY-MM-DD HH:mm:ss")};(await s()).forEach(((e,t)=>{if(e&&e.username===w){const o=t,r=e.posts.length;i(n,o,r).then(L)}}))}));const S=document.getElementById("delete-account"),b=document.getElementById("confirm-delete"),R=document.getElementById("cancel-delete"),U=document.getElementById("confirm-delete-popup");S.addEventListener("click",(()=>{U.style.display="block"})),R.addEventListener("click",(()=>{U.style.display="none"})),b.addEventListener("click",(async()=>{(await s()).forEach(((e,t)=>{e&&e.username===w&&l(t).then(E)})),U.style.display="none"})),g.addEventListener("click",(()=>{E()})),y.addEventListener("click",(()=>{location.assign("./feed.html")}));
//# sourceMappingURL=profile.9fad9e6a.js.map