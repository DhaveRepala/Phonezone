const mainData = [];
const displayPhones = async () => {
    try{
        const respone = await fetch('data.json');
        const data = await respone.json();
        
         document.querySelector(".products").innerHTML = data.products.map((element, index) => {
            const {image, name, price} = element;
            return`
            <div class="items">
              <img src="${image}" alt="${name}" />
              <h4>${name}</h4>
            <button><ion-icon name="add-outline"></ion-icon></button>
            </div>
            `
         }).join('');
       
    }catch(error){
        console.log(error);
    }
}
displayPhones();

const cart = [];
function showCart(index){};
function addCart(){};
function removeCart(){};

