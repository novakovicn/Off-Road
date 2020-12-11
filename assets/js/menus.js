$(document).ready(function(){
    navWrite(menu);
    footWrite(menu);
    socialWrite(social);
   $("#menu li:nth-child(3)").on("click",function(){
       $("#podmeni").slideToggle();
   });
   $("#responsive").on("click",function(){
    $("#menu").slideToggle();
    
});
  //$(".required").addClass("requiredColor");
  });
const menu=[{title:"Home",link:"index.html"},{title:"About",link:"index.html#about"},{title:"Products",link:"index.html#products"},{title:"Contact",link:"index.html#contact"}];
const submenu=[{title:"Best sellers",link:"index.html#bestSellers"},{title:"All Products",link:"index.html#products"}];
const social=[{title:'<i class="fa fa-facebook-official"></i>',link:"https://www.facebook.com/"},
{title:'<i class="fa fa-instagram"></i>',link:'https://www.instagram.com/'},
{title:'<i class="fa fa-twitter"></i>',link:'https://twitter.com/'},
{title:'<i class="fa fa-youtube-play"></i>',link:'https://www.youtube.com/'}];
function navWrite(array){
    for(let i=0;i<array.length;i++){
        const nav=document.querySelector("#menu");
        if(array[i].title=="Products"){
            nav.innerHTML+="<li><a href="+array[i].link+"'>"+array[i].title+" <i class='fa fa-angle-down'></i>"+"</a></li>";
            const li=document.querySelectorAll("li");
            const element=document.createElement("ul");
            element.setAttribute("id","podmeni");
            for(let i=0;i<submenu.length;i++){
                element.innerHTML+=`<li><a href="${submenu[i].link}">${submenu[i].title}</a></li>`;
    }
            li[i].appendChild(element);
        }
        else{
            nav.innerHTML+="<li><a href="+array[i].link+">"+array[i].title+"</a></li>";
        }
    }
}
function footWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("id","footnav");
    const ul=document.createElement("ul");
    for(let i in menu){
        ul.innerHTML+=`<li><a href="${array[i].link}">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
function socialWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("id","social");
    const ul=document.createElement("ul");
    for(let i in menu){
        ul.innerHTML+=`<li><a href="${array[i].link}" target="_blank">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}