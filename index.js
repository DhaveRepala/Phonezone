var mainData = [];
const displayPhones = async () => {
    try{
        const respone = await fetch('data.json');
        mainData = await respone.json();
        const {products} = mainData;
        console.log(products);

       //iphone display
        const iphone = products.filter((element) => element.category == "iphone");
        console.log(iphone);
         document.querySelector(".iphone").innerHTML = iphone.map((element, index) => {
            const {image, name, price} = element;
            return`
            <div class="items">
              <img src="${image}" alt="${name}" />
              <h4>${name}</h4>
            <button onclick="showCart(${index}, 'iphone')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
            </div>
            `
         }).join('');
       
        //case display
        const phoneCase = products.filter((element) => element.category == "phonecase");
       document.querySelector(".phone-case").innerHTML = phoneCase.map((element, index) => { 
           const {image, name, price} = element;
              return`
                <div class="items">
                <img src="${image}" alt="${name}" />
                  <h4>${name}</h4>
                  <button onclick="showCart(${index}, 'phonecase')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
                 </div>
              `   
}).join('');

const android = products.filter((element) => element.category == "android");
console.log(iphone);
 document.querySelector(".android").innerHTML = android.map((element, index) => {
    const {image, name, price} = element;
    return`
    <div class="items">
      <img src="${image}" alt="${name}" />
      <h4>${name}</h4>
    <button onclick="showCart(${index}, 'android')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
    </div>
    `
}).join('');

        //EARBUDS DISPLAY
        const earbuds = products.filter((element) => element.category == "earbuds");
        document.querySelector(".Earbuds").innerHTML = earbuds.map((element, index) => { 
            const {image, name, price} = element;
               return`
                 <div class="items">
                 <img src="${image}" alt="${name}" />
                   <h4>${name}</h4>
                   <button onclick="showCart(${index}, 'earbuds')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
                  </div>
               `   
 }).join('');
        //HEADPHONES DISPLAY
    }catch(error){
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', displayPhones);

var cart = [];
//bali dito specific index ng specific category
function showCart(index, category) {
    const products = mainData.products.filter((element) => element.category == category);
    cart.push(products[index]);
    localStorage.setItem("storage",JSON.stringify(cart));
    
}


const homePage = document.getElementById("homePage");
const aboutPage = document.getElementById("aboutuspage");
const contactPage = document.getElementById("contactPage");
const pageLoaded = document.getElementById("pageLoaded");
const cartBt = document.getElementById("cartBtn");

window.addEventListener('click', (e) => {
    if(e.target == homePage){
        pageLoaded.src = "homePage.html";
    }else if(e.target == aboutPage){    
        pageLoaded.src = "aboutus.html";
    }else if(e.target == contactPage){
        pageLoaded.src = "contactPage.html";
    }else if(e.target == cartBt){
        pageLoaded.src = "cart.html";
    }
});
//cart part
const data = JSON.parse(localStorage.getItem("storage")) || [];

function cartRender(){
    if(data.length == 0){
        document.getElementById("cartProducts").innerHTML = "<h1>Cart is Empty</h1>";
        return;
    }
document.getElementById("cartProducts").innerHTML = data.map((element, index) => {
    const { image, name, price } = element;
    return `
        <div class="cartItems">
            <img src="${image}" alt="${name}" />
            <h4>${name}</h4>
            <p>Price: ${price}</p>
            <button  class="deleted-icon" onclick = "removeCart(${index})"><ion-icon name="trash-outline" class="btnIcon"></ion-icon></button>
        </div>
    `;
}).join('');
}

function removeCart(index){
    data.splice(index, 1); 
    localStorage.setItem("storage", JSON.stringify(data)); 
    cartRender(); 
}
cartRender();
