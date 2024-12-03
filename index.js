
var mainData = [];

// Display phones function
const displayPhones = async () => {
    try {
        const response = await fetch('data.json'); 
        mainData = await response.json();
        const { products } = mainData;

        // iPhone display
        const iphone = products.filter((element) => element.category === "iphone");
        document.querySelector(".iphone").innerHTML = iphone.map((element, index) => {
            const { image, name, price } = element;
            return `
            <div class="items">
              <img src="${image}" onclick="showModal(${index}, 'iphone')" " alt="${name}"/>
              <h4>${name}</h4>
                   <button onclick="showCart(${index}, 'iphone')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
              </button>
            </div>
            `;
        }).join('');

        // Phone case display
        const phoneCase = products.filter((element) => element.category === "phonecase");
        document.querySelector(".phone-case").innerHTML = phoneCase.map((element, index) => {
            const { image, name, price } = element;
            return `
            <div class="items">
              <img src="${image}" onclick="showModal(${index}, 'phonecase')" " />
              <h4>${name}</h4>
                   <button onclick="showCart(${index}, 'phonecase')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
              </button>
            </div>
            `;
        }).join('');

        // Android display
        const android = products.filter((element) => element.category === "android");
        document.querySelector(".android").innerHTML = android.map((element, index) => {
            const { image, name, price } = element;
            return `
            <div class="items" ">
              <img src="${image}" onclick="showModal(${index}, 'android')" " />
              <h4>${name}</h4>
                   <button onclick="showCart(${index}, 'android')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
              </button>
            </div>
            `;
        }).join('');

        // Earbuds display
        const earbuds = products.filter((element) => element.category === "earbuds");
        document.querySelector(".Earbuds").innerHTML = earbuds.map((element, index) => {
            const { image, name, price } = element;
            return `
            <div class="items">
              <img src="${image}" onclick="showModal(${index}, 'earbuds')" " />
              <h4>${name}</h4>
                <button onclick="showCart(${index}, 'earbuds')"><ion-icon name="add-circle-outline" class="addToCartBtn"></ion-icon></button>
              </button>
            </div>
            `;
        }).join('');

    }catch(error){
        console.log(error);
    }
};


document.addEventListener('DOMContentLoaded', () => {
    displayPhones();

    const closeModalButton = document.getElementById('close-modal-btn');
    closeModalButton.addEventListener('click', closeModal);
});

function showModal(index, category) {
    const products = mainData.products.filter((product) => product.category === category);
    const product = products[index];

    document.getElementById("modal-image").src = product.image;
    document.getElementById("modal-name").innerText = product.name;
    document.getElementById("modal-price").innerText = product.price;
    document.getElementById("modal-storage").innerText = product.storage || "N/A";
    document.getElementById("modal-colors").innerText = product.colors?.join(", ") || "N/A";

    const modal = document.getElementById("product-modal");
    modal.style.display = "flex";

    window.onclick = function (event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

function closeModal() {
    const modal = document.getElementById("product-modal");
    modal.style.display = "none";
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
const profileBtn = document.getElementById("profile");
window.addEventListener('click', (e) => {
    if(e.target == homePage){
        pageLoaded.src = "homePage.html";
    }else if(e.target == aboutPage){    
        pageLoaded.src = "aboutus.html";
    }else if(e.target == contactPage){
        pageLoaded.src = "contactPage.html";
    }else if(e.target == cartBt){
        pageLoaded.src = "cart.html";
    }else if(e.target == profileBtn){
        pageLoaded.src = "profilePage.html";
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
let totalPrice = 0;

function removeCart(index){
    data.splice(index, 1); 
    localStorage.setItem("storage", JSON.stringify(data)); 
    cartRender(); 
   updateTotalPrice(data);
    
    
}
function updateTotalPrice(data){
    data.map((element)=>{
        totalPrice += element.price;
    });    
    document.getElementById("cartTotalPriceDisplay").innerHTML = "Total Price: ₱" + totalPrice;
    document.getElementById("cartTotalPriceDisplayRes").innerHTML = "Total Price: " + totalPrice;
    totalPrice = 0;
}
data.map((element)=>{
    totalPrice += element.price;
});    
document.getElementById("cartTotalPriceDisplay").innerHTML = "Total Price: ₱" + totalPrice;
totalPrice = 0;


const checkOutBtn = document.getElementById("checkOutBtn");

checkOutBtn.addEventListener('click', ()=>{
    showReceipt();
    document.getElementById("cartRecipt").style.display = "block";
});
const cartRecipt = document.getElementById("cartRecipt");
window.addEventListener('click', (event)=>{
    if(event.target == cartRecipt){
        cartRecipt.style.display = "none";
    }
})
cartRender();
function showReceipt(){
  document.getElementById("cartRecipt-content").innerHTML += data.map((element) =>{
     const {name, price} = element;
     return `
   <div class="receipt-content">
      <h3>${name}</h3>
      <h4> ₱${price}</h4>
      <br/>
    
     </div>
     `
  }).join(" ");
  data.splice(0, data.length);
  document.getElementById("cartProducts").innerHTML = "";
  document.getElementById("cartTotalPriceDisplay").innerHTML = "Total Price: ₱" + 0;

}

//btn para sa drop down menu

//login func


function submit(){
    window.location.href = "mainPage.html";
}

function showDropDown(){
    const profileMenu = document.getElementById("profile-menu");
    if(profileMenu.style.height == "8em"){
        profileMenu.style.height =  0;
        
       
    }else{
        profileMenu.style.height = "8em";
        
   
    }
}
// earphonesHeroSection phonecaseherosection