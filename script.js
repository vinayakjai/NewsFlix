const API_KEY="b0097b6125e94b1e9a81eb7238429f34";

const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=>fetchnews("India"));
function reload(){
    window.location.reload();//reloads website and get into its initial state
}
async function fetchnews(query){
    const res=await fetch(`${url}${query}&apikey=${API_KEY}`);/**FETCHING RESULTS OF API FROM NEWSAPI SERVER */
    const data=await res.json();
 
    console.log(data);
    bindData(data.articles); 
}
function bindData(articles){
//create template for each article and append it in card container
const cardsContainer=document.getElementById("cards-container");
const newsCardTemplate=document.getElementById("template-news-card");
cardsContainer.innerHTML="";
articles.forEach((article) => {
       if(!article.urlToImage) return;
        
       
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
        
});
}

function fillDataInCard(cardClone,article){
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    })
    newsSource.innerHTML=`${article.source.name} . ${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })
}

let curSelectedNav=null;
function onNavItemClick(id){
fetchnews(id);
const navItem=document.getElementById(id);
curSelectedNav?.classList.remove('active');
curSelectedNav=navItem;
curSelectedNav.classList.add('active');
 
}

const serachButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');
serachButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove('active');
})