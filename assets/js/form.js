//Objekti forme
const addButton=document.querySelector("#add");
const cardField=document.querySelector("#cardNumber");
const paymentRadioButtons=document.getElementsByName("paymethod");
const nameField=document.querySelector("#fullname");
const mailField=document.querySelector("#mail");
const cityField=document.querySelector("#city");
const pay=document.querySelector("#pay");
const zipField=document.querySelector("#zip");
const addressField=document.querySelector("#address");
const privacyPolice=document.querySelector("#privacy");
window.onload=function(){
    document.querySelector("#cardNumber").classList.add("hide");
    document.querySelector("#creditCard").classList.add("hide");
    document.querySelector("#additional label").classList.add("hide");
    addButton.addEventListener("click",addMob);
    for(let i=0;i<paymentRadioButtons.length;i++){
    paymentRadioButtons[i].addEventListener("click",payMethods);
    }
    document.querySelector("#submit").addEventListener("click",finishOrder);
}
const form=[{input:"text",err:"Insert valid name!",label:"Name"},{input:"text",err:"Insert valid name!"},{input:"text",err:"Insert valid name!"}];
const cards=["Visa","MasterCard","Discover"];

//Funkcije za proveru unosa forme

function nameConstraint(){
    //Regex provera ime i prezime(moguce imati vise prezimena)
    const nameRegex=/^[A-Z][a-z]{2,}(\s[A-Z][a-z]{5,})+$/;
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
    const addresspRegex=/^[A-Z][a-z]{3,}(\s[A-z0-9]{1,})+$/;
    
    if(addresspRegex.test(addressField.value)){
        addressField.classList.remove("inputError");
        return 1;
    }
    else{
        addressField.classList.add("inputError");
        return 0;
    }
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
   if(!privacyPolice.checked){
       ok=0;
   }
   if(ok){
       console.log("Sve je u redu");
   }
   else{
        console.log("Nesto ne valja");
   }
    

}
function addMob(e){
    e.preventDefault();
    const div=document.querySelector(".mob");
    const newMobile=document.createElement("input");
    const label=document.createElement("label");
    label.innerHTML="Mobile";
    newMobile.setAttribute("type","text");
    newMobile.setAttribute("class","mobile");
    const addButton=document.querySelector("#add");
    div.insertBefore(label,addButton);
    div.insertBefore(newMobile,addButton);
}





