$(document).ready(function(){
    const loc=window.location.href;
    navWrite(menu);
    footWrite(menu);
    socialWrite(additional);
    socialWrite(social);
    $("#menu li").on("click",function(){
        $(this).find("ul").slideToggle();
    });
    $("#responsive").on("click",function(){
     $("#menu").slideToggle();
 });
    //Sprecava da meni prilikom promene velicine browser-a ostane display:none
    $(window).resize(function(){
        if($(this).width()>800 && $("#menu").css("display")=="none"){
            $("#menu").show();
        }
        if($(this).width()<800 && $("#menu").css("display")=="block"){
            $("#menu").hide();
        }
    })
 
     //Kod za contact.html stranu
     if(loc.indexOf("contact.html")>-1){
        //Objekti forme
        const cardField=document.querySelector("#cardNumber");
        const paymentRadioButtons=document.getElementsByName("paymethod");
        const nameField=document.querySelector("#fullname");
        const mailField=document.querySelector("#mail");
        const cityField=document.querySelector("#city");
        const termOfUse=document.querySelector("#terms");
        const termsMessage=document.querySelector("#finish p");
        const mobileFields=document.querySelectorAll(".mobile");
        const pay=document.querySelector("#pay");
        const zipField=document.querySelector("#zip");
        const addressField=document.querySelector("#address");
        const cards=["Visa","MasterCard","Discover"];
        $("#cardNumber").addClass("hide");
        $("#creditCard").addClass("hide");
        $("#additional label").addClass("hide");
        for(let i=0;i<paymentRadioButtons.length;i++){
            paymentRadioButtons[i].addEventListener("click",payMethods);
        }
        $("#submit").click(function(){
            finishOrder();
        });
        $("#add").click(function(event){
            event.preventDefault();
        })
        function nameConstraint(){
            //Regex provera ime i prezime(moguce imati vise prezimena)
            const nameRegex=/^[A-Z][a-z]{2,}(\s[A-Z][a-z]{3,})+$/;
            if(nameRegex.test(nameField.value)){
                nameField.classList.remove("inputError");
                return 1;
            }
            else{
                nameField.classList.add("inputError");
                return 0;
            }
        }
        function emailConstraint(){
            //Regex provera mejlove koji pripadaju gmail-u ili yahoo-u
            const mailRegex=/^[a-z\?\.\,\!\&0-9]{5,}\@(gmail|yahoo)\.com$/;
            if(mailRegex.test(mailField.value)){
                mailField.classList.remove("inputError");
                return 1;
            }
            else{
                mailField.classList.add("inputError");
                return 0;
            }
        }
        function cityConstraint(){
            //Regex dozvoljava unos grada od dve reci sa pocetnim velikim slovom prve reci
            const cityRegex=/^[A-Z][a-z]{2,}(\s[A-z]{3,})*$/;
            
            if(cityRegex.test(cityField.value)){
                cityField.classList.remove("inputError");
                return 1;
            }
            else{
                cityField.classList.add("inputError");
                return 0;
            }
        }
        function zipConstraint(){
            //Regex provera da li je kod unet u formatu AA9A 9AA ili A9 9AA
            const zipRegex=/^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s[0-9][A-Z]{1,2}$/;
            
            if(zipRegex.test(zipField.value)){
                zipField.classList.remove("inputError");
                return 1;
            }
            else{
                zipField.classList.add("inputError");
                return 0;
            }
        }
        function addressConstraint(){
            const addresspRegex=/^[A-Z][a-z]{3,}(\s[A-z0-9]{1,})*$/;
            
            if(addresspRegex.test(addressField.value)){
                addressField.classList.remove("inputError");
                return 1;
            }
            else{
                addressField.classList.add("inputError");
                return 0;
            }
        }
        function mobileConstraint(){
            //Regex vrsi prvoeru za brojeve mobilnih telefona vazecih za Englesku
            const mobileRegex=/^07[1-57-9]\s[0-9]{8,9}$/;
            for(let i=0;i<mobileFields.length;i++){
                if(mobileRegex.test(mobileFields[i].value)){
                    mobileFields[i].classList.remove("inputError");
                }
                else{
                    mobileFields[i].classList.add("inputError");
                    return 0;
                }
            }
            return 1;
        }
        function payMethods(){
            for(let i=0;i<paymentRadioButtons.length;i++){
                if(paymentRadioButtons[i].checked){
                    const select=document.querySelector("#creditCard");
                    if(paymentRadioButtons[i].id=="card"){
                        select.innerHTML=`<option value="">Choose your credit card</option>`
                        for(let i of cards){
                            select.innerHTML+=`<option value=${i.toLowerCase()}>${i}</option>`
                        }
                        select.addEventListener("change",creditCard);
                        select.classList.remove("hide"); 
                    }
                    else{
                        select.classList.add("hide");
                        document.querySelector("#cardNumber").classList.add("hide");
                        document.querySelector("#additional label").classList.add("hide");
                    }
                }
            }
        }
        function payConstraint(){
            const cardNumberRegex=/^([0-9]{4}\s){3}[0-9]{4}$/;
            for(let i=0;i<paymentRadioButtons.length;i++){
                if(paymentRadioButtons[i].checked){
                if(paymentRadioButtons[i].id=="card"){
                    if(creditCard()){
                        if(cardNumberRegex.test(cardField.value)){
                            cardField.classList.remove("inputError");
                            pay.classList.remove("pay");
                            return 1;
                        }
                        else{
                            cardField.classList.add("inputError");
                            return 0;
                        }
                    }
                   else{
                    pay.classList.add("pay");
                    return 0;
                   }
                }
                pay.classList.remove("pay");
                return 1;
            }
        }
            pay.classList.add("pay");
            return 0; 
        }
        function creditCard(){
            const creditCards=document.querySelector("#creditCard");
            if(creditCards.value!=""){
                document.querySelector("#cardNumber").classList.remove("hide");
                document.querySelector("#additional label").classList.remove("hide");
                return 1;
            }
            else{
                document.querySelector("#cardNumber").classList.add("hide");
                document.querySelector("#additional label").classList.add("hide");
                return 0;
            }
        }
        function finishOrder(){
           const finishMessage=document.querySelector("#finishMessage");
           const messageHeading=document.querySelector("#finishMessage h2");
           let ok=1;
           if(!nameConstraint()){
               ok=0;
           }
           if(!emailConstraint()){
            ok=0;
           }
           if(!addressConstraint()){
            ok=0;
           }
           if(!payConstraint()){
            ok=0;
           }
           if(!cityConstraint()){
            ok=0;
           }
           if(!zipConstraint()){
               ok=0;
           }
           if(!mobileConstraint()){
               ok=0;
           }
           if(!termOfUse.checked){
               ok=0;
                $(termsMessage).fadeIn();
           }
           else{
            $(termsMessage).fadeOut();
           }
           
           if(ok){
                messageHeading.innerHTML="Your order was successfully sent!";
                finishMessage.classList.remove("finishWrong");
                finishMessage.classList.add("finishCorrect");
                return 1;
           }
           else{
                messageHeading.innerHTML="Please,fill out the form correctly!";
                finishMessage.classList.remove("finishCorrect");
                finishMessage.classList.add("finishWrong");
           }
            
        }
    } //Kraj koda za contact.html
 //Kod za index.html stranu
    else{
        const bestSellers=[{name:"Cooper Discoverer All-Season",price:"190$",img:"assets/images/cuper1.png",type:"Tire",spec:{Performance:"Serious Off-Road Performance",Zones:"Linear Flex Zones",Season:"All-Season Tire",Type:"Light Truck/SUV/CUV",FuelEconomy:"C",Rain:"F",Sound:"85db",Warranty:"Two year."}},
        {name:"Roof Rack",price:"90$",img:"assets/images/nosac1.png",type:"Accessories",spec:{Material:"Steel",Brand:"MAXXHAUL",ItemWeight:"8kg",Type:"For all cars",Warranty:"Two year."}},
        {name:"BFGoodrich Mud-Terrain T/A KM3",price:"230$",img:"assets/images/bf2.png",type:"Tire",spec:{Performance:"Serious Off-Road Performance",Zones:"Linear Flex Zones",Season:"All-Season Tire",Type:"Light Truck/SUV/CUV",FuelEconomy:"F",Rain:"B",Sound:"74db",Warranty:"Two year."}}, {name:"Tow Rope",price:"30$",img:"assets/images/uze.png",type:"Accessories",spec:{CarType:"For small tractors and small truck", Capacity:"5000kg",Length:"10m",Warranty:"Two year."}}];

        const products=[{name:"Electric Winch",price:"160$",img:"assets/images/sajla.png",type:"Accessories",spec:{SizeName:"13000lbs NP Cable Winch",Info:"The OPENROAD NP series 13000lbs electric winch is specially designed for people who love off-road. It has strong pulling force and is suitable for most 4×4 vehicles, SUVs, trunks and trailers. No Matter what kind of road",Info1:"✔Powerful source of power: A 6.0 HP wound series motor, a full metal 3-stage planetary gear system and gear reduction ratio is 265：1. The perfect cooperation makes the winch more powerful and faster.",Info2:"✔Winch Diameter 2.5”(63.5mm)x length9.6”(224mm);Overall dimension (length x width x height) 20.8”x 6.3”x 8.6” (530x160x218mm);Mounting bolt pattern 10”x4.5”(254x114.3mm);Steel Cabe Size:9mm*26m",Warranty:"✔OPENROAD have 3 years of technical support & commercial 1 year warranty,please contact us when you have product problems, and we will promptly reply to your questions within 24 hours."}}
        ,{name:"BFGoodrich Mud-Terrain T/A KM2",price:"200$",img:"assets/images/bf1.png",type:"Tire",spec:{Performance:"Serious Off-Road Performance",Zones:"Linear Flex Zones",Season:"All-Season Tire",Type:"Light Truck/SUV/CUV",FuelEconomy:"F",Rain:"B",Sound:"74db",Warranty:"Two year."}},
        {name:"BFGoodrich Mud-Terrain T/A KM3",price:"230$",img:"assets/images/bf2.png",type:"Tire",spec:{Performance:"Serious Off-Road Performance",Zones:"Linear Flex Zones",Season:"All-Season Tire",Type:"Light Truck/SUV/CUV",FuelEconomy:"F",Rain:"B",Sound:"74db",Warranty:"Two year."}},
        {name:"Cooper Discoverer All-Season",price:"190$",img:"assets/images/cuper1.png",type:"Tire",spec:{Performance:"Serious Off-Road Performance",Zones:"Linear Flex Zones",Season:"All-Season Tire",Type:"Light Truck/SUV/CUV",FuelEconomy:"C",Rain:"F",Sound:"85db",Warranty:"Two year."}},
        {name:"Tow Rope",price:"30$",img:"assets/images/uze.png",type:"Accessories",spec:{CarType:"For small tractors and small truck", Capacity:"5000kg",Length:"10m",Warranty:"Two year."}},
        {name:"Towing Hook",price:"70$",img:"assets/images/kuka.png",type:"Accessories",spec:{Use:"Excellent for use on ATV's pick up trucks and more",Material:"Constructed from all forged steel with durable powder coat finish to resist rust and corrosion", Capacity:"Hook's gross trailer weight capacity is LIMITED to your hitch capacity",Warranty:"Two year."}},
        {name:"Roof Rack",price:"90$",img:"assets/images/nosac1.png",type:"Accessories",spec:{Material:"Steel",Brand:"MAXXHAUL",ItemWeight:"8kg",Type:"For all cars",Warranty:"Two year."}},
        {name:"Cooper Discoverer AT3",price:"170$",img:"assets/images/cuper3.png",type:"Tire",spec:{Performance:"Serious Off-Road Performance",Zones:"Linear Flex Zones",Season:"All-Season Tire",Type:"Light Truck/SUV/CUV",FuelEconomy:"C",Rain:"F",Sound:"89db",Warranty:"Two year."}}]

        const sliderImages=["assets/images/slider3.jpg","assets/images/slider1.jpg","assets/images/slider2.jpg","assets/images/slider.jpg","assets/images/slider4.jpg"];
        const messages=["Ford Raptor","Jeep Wrangler","Toyota","Toyota Tacoma","Land Rover Discovery"];
        const submessages=["2020 Pickup Truck","2018 Jeep","2019 Pickup Truck","2020 Pickup Truck","2000 Jeep"];
        const about=[{heading:"Off Road is?",text:"Company that is the main distributor of off road equipment for this passionate sport, with us you can find top equipment for everything you need for an amazing trip in nature."},
        {heading:"What we sell?",text:"Top brands of all types of Tires you need for off road, as well as Towing Hooks, Ropes, Electric Winch and Roof Rack"}];
       

        let slideIndex=-1;
        let k=1;
        let interval=setInterval(()=>{
            slider(1);
        },5000);
        const img=document.createElement("img");
        img.setAttribute("class","slika");
        document.querySelector("#slideImg").appendChild(img);
        function slider(n){
            const slideImage=document.querySelector(".slika");
            const slideMessage=document.querySelector(".message");
            if(n){
                slideIndex++;
                if(slideIndex>sliderImages.length-1){
                    slideIndex=0;
                }
            slideImage.setAttribute("src",sliderImages[slideIndex]);
            slideImage.setAttribute("alt",`slide ${slideIndex+1}`);
            slideMessage.querySelector("h1").innerHTML=messages[slideIndex];
            slideMessage.querySelector("h2").innerHTML=submessages[slideIndex];
            }
            else{
                slideIndex--;
                if(slideIndex<0){
                    slideIndex=sliderImages.length-1;
                }
            slideImage.setAttribute("src",sliderImages[slideIndex]);
            slideImage.setAttribute("alt",`slide ${slideIndex+1}`);
            slideMessage.querySelector("h1").innerHTML=messages[slideIndex];
            slideMessage.querySelector("h2").innerHTML=submessages[slideIndex];
            }
            slideImage.classList.add("slideFade");
            slideMessage.classList.add("slideMessage");
            setTimeout(function(){
                slideImage.classList.remove("slideFade");
                
            },801)
            setTimeout(function(){
                slideMessage.classList.remove("slideMessage");
            },1601)
            clearInterval(interval);
            interval=setInterval(()=>{
                slider(1);
            },5000);
        }
        function aboutWrite(array){
            let subIndex=4;
            const aboutDiv=document.querySelector("#textAbout");
            for(let i=0;i<array.length;i++){
            aboutDiv.innerHTML+=`<div class="textAbout"><h2><span class="colorHeading">${array[i].heading.substring(0,subIndex)}</span>${array[i].heading.substring(subIndex++)}</h2>
                <p>${array[i].text}</p>
                <span class="plus"><i class='fa fa-angle-down'></i></span>
            </div>`;
            }
        }
        function bestSellersWrite(target,array,identificator){
            const targetDiv=document.querySelector(target);
            for(let i in array){
                const article=document.createElement("article");
                article.setAttribute("class",identificator);
                article.setAttribute("data-type",array[i].type);
                article.innerHTML+=`<img src="${array[i].img}" alt="bestSeller" />
                <h3>${array[i].name}</h3>
                <span>${array[i].price}</span>`
                const div=document.createElement("div");
                div.setAttribute("class","options")
                div.innerHTML+=`<button class="buynow" onclick="window.location='contact.html'">Buy Now</button>
                <button class="details">Details</button>`
                article.appendChild(div);
                targetDiv.appendChild(article);
            }
            const elements=document.getElementsByClassName(identificator);  
            for(let i=0;i<elements.length;i++){
                elements[i].addEventListener("click",function(){
                    bodyOpacity().appendChild(detailsDiv(array,i));
                    close();
                })
            }
        }
        function bodyOpacity(){
            const coverDiv=document.createElement("div");
            coverDiv.setAttribute("id","coverDiv");
            document.querySelector("body").classList.add("bodyAcitve");
            document.querySelector("body").appendChild(coverDiv);
            return coverDiv;
        }
        function detailsDiv(array,i){
            var fixedDiv=document.createElement("div");
            fixedDiv.setAttribute("class","fixedDiv");
            fixedDiv.innerHTML+=`<div class="detaliName"><h2>${array[i].name}</h2>${specifications(array[i].spec)}<button class="buynow" onclick="window.location='contact.html'">Buy Now</button></div>
            <div class="detailImg"><img src="${array[i].img}" alt="Product image" /></div>
            <span class="close"><i class="fa fa-close"></i></span>`;
            return fixedDiv;
        }
        const filterButtons=document.querySelectorAll(".filterbtn");
        for(let i=0; i< filterButtons.length;i++){
            filterButtons[i].addEventListener("click",(e)=>{
                for(let i=0; i< filterButtons.length;i++){
                    filterButtons[i].classList.remove("filterActive");
                }
                e.target.classList.add("filterActive");
            })
        }
        function filter(con){
            const target=document.querySelectorAll(".product");
            for(let i=0;i<target.length;i++){
                if(con==""){
                    target[i].style.display="block";
                    continue;
                }
                if(target[i].dataset.type!=con){
                    target[i].style.display="none";  
                }
                else{
                    target[i].style.display="block";
                }
            }
        }
        function close(){
            const closeBtns=document.querySelector(".close");
            const fixedDiv=document.querySelector(".fixedDiv");
            const coverDiv=document.querySelector("#coverDiv");
                closeBtns.addEventListener("click",function(){
                    fixedDiv.remove();
                    coverDiv.remove();
                    document.querySelector("body").classList.remove("bodyAcitve");
                });
        }
        function newsLetter(){
            const input=document.querySelector("#mail");
            const message=document.querySelector("#newsMessage");
            const mailregex=/^[a-z][a-z\d]{4,}@(gmail|yahoo).com$/;
            if(mailregex.test(input.value)){
                message.innerHTML="Thanks for subscribing on our newsleter";
                return;
            }
            else{
                message.innerHTML="Please,enter mail in valid format";
                return;
            }
        }
        function specifications(array){
            let list=`<ul>`;
            for(let i in array){
                list+=`<li>${i}:${array[i]}</li>`;
            }
            list+=`</ul>`;
            return list;
        }
        slider(1);
        $("#next").click(function(){
            slider(1);
        })
        $("#prev").click(function(){
            slider(0);
        })
        aboutWrite(about);
        bestSellersWrite("#wrapper",bestSellers,"bestSeler");
        bestSellersWrite("#wrapperProduct",products,"product");
        $(".textAbout").on("click",function(){
            $(this).find("p").slideToggle();
            $(this).find(".plus").toggleClass("plusActive");   
        });
        $(window).scroll(function(){
            if($(this).scrollTop()>600){
                $("#scrollTop").fadeIn();
            }
            else{
                $("#scrollTop").fadeOut();
            }
        })
        $("#scrollTop").click(function(){
            $("html,body").animate({scrollTop:0},800);
        });
        $("#sign").click(function(){
            newsLetter();
        })
        $("#filterAll").click(function(){
            filter("");
        })
        $("#filterTire").click(function(){
            filter("Tire");
        })
        $("#filterWheel").click(function(){
            filter("Accessories");
        });
        $(".bestSeler").hover(function(){
            $(this).find(".options").toggleClass("optionsOpacity");
        })
        $(".product").hover(function(){
            $(this).find(".options").toggleClass("optionsOpacity");
        });
        
    } //Kraj koda za index.html stranu
  });

//Zajednicki podaci i funkcije za obe strane
const menu=[{title:"Home",link:"index.html"},{title:"About",link:"index.html#about"},{title:"Products",link:"#"},{title:"Contact",link:"index.html#contact"}];
const additional=[{link:"https://novakovicn.github.io/novakovic.nikola/",title:"Author"},{link:"Dokumentacija.pdf",title:"Documentation"}];
const submenu=[{title:"Best sellers",link:"index.html#bestSellers"},{title:"All Products",link:"index.html#products"}];
const social=[{title:'<i class="fa fa-facebook-official"></i>',link:"https://www.facebook.com/"},
{title:'<i class="fa fa-instagram"></i>',link:'https://www.instagram.com/'},
{title:'<i class="fa fa-twitter"></i>',link:'https://twitter.com/'},
{title:'<i class="fa fa-sitemap" aria-hidden="true"></i>',link:'sitemap.xml'}];
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
    for(let i in array){
        ul.innerHTML+=`<li><a href="${array[i].link}">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
function socialWrite(array){
    const target=document.querySelector("footer");
    const footnav=document.createElement("div");
    footnav.setAttribute("class","social");
    const ul=document.createElement("ul");
    for(let i in array){
        ul.innerHTML+=`<li><a href="${array[i].link}" target="_blank">${array[i].title}</a></li>`;
    }
    footnav.appendChild(ul);
    target.appendChild(footnav);
}
