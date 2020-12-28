const data = [
  {id: 0, name: "Lenovo Lenovo Legion 5i (15) | 15-inch gaming laptop", img: "images/1.png", desc: "Offering a wide range of performance options for any level of gamer, and minimalist design. Powered by up to 10th Gen Intel® Core™ i7 H processors, optional NVIDIA® GeForce RTX™ graphics,", price: 1099},
  {id: 1, name: "HP 10th Gen Intel Core i3 15.6-inch Laptop", img: "images/2.jpg", desc: "HP 14 10th Gen Intel Core i3 14-inch FHD Laptop(i3-1005G1/8GB/512GB SSD/Win 10/MS Office/Win 10/Natural Silver/1.46 kg), 14s-dr1008tu", price: 656.90},
  {id: 2, name: "Avon 15\" Gaming Laptop", img: "images/3.jpg", desc: "Experience gaming the way it's meant to be with the Avon's ultra-fast 15\" 144Hz refresh rate display. No blurs and no ghosting.", price: 1799},
  {id: 3, name: "Lenovo Yoga Duet 7i", img: "images/4.jpg", desc: "Yoga Duet 7i (13”) 2 in 1 · A mode for every mood Weighing 2.56lbs / 1.16kg, the Yoga Duet 7i 2 in 1 laptop is light and versatile enough to be used anywhere.", price: 799},
  {id: 4, name: "HP Envy 13", img: "images/5.jpg", desc: "CPU: Intel Core i5/Core i7 | GPU: Intel UHD Graphics 620/Nvidia GeForce MX250 | RAM: 8GB/16GB | Storage: 256GB/512GB/1TB | Display: 13.3-inch, 1080p or 4K | Size: 12.1 x 8.3 x 0.6 inches | Weight: 2.8 pounds", price: 899},
];

// all project vars
let openCartBtn = document.querySelector(".cart-btn"),
    cartItemsCount = document.querySelector(".items"),
    cart = document.querySelector(".cart"),
    closeCart = document.querySelector(".close"),
    productsWrapp = document.querySelector(".products");

openCartBtn.addEventListener("click", () => {
  cart.classList.add("opened")
  closeCart.classList.add("opened");
  if (document.querySelector(".actions") != null) {
    document.querySelector(".actions").classList.add("details")
  }
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("opened")
  closeCart.classList.remove("opened");
  if (document.querySelector(".actions") != null) {
    document.querySelector(".actions").classList.remove("details");
  }
});

const product = (name,desc,img,price,id) => {
  return `
  <div class="item" data-id="${id}">
    <div class="product-img">
      <img src="${img}" alt="${name}">
    </div>
    <div class="max-width">
      <h2>${name}</h2>
      <span>$ <strong>${price}</strong></span>
      <span>
        ${desc.length > 65 ? desc.slice(0,65) + " ..." : desc + desc}
      </span>
      <div class="clear"></div>
      <button onclick="addToCart(this);add(this)">
        Add To Cart
      </button>
    </div>
  </div>
  `;
}

let itemsCount = localStorage.getItem("itemsCount") != null ? localStorage.getItem("itemsCount"): 0,
    nav = document.querySelector("nav"),
    items = document.createElement("span");


let itemsInCart = localStorage.getItem("cart") == null ? [] : localStorage.getItem("cart") == "" ? [] : localStorage.getItem("cart").split(",");


if (itemsInCart === []) {
  itemsInCart = itemsInCart.map(x => parseInt(x));
}

const addToCart = (el) => {
  el = el.parentElement.parentElement;

  ++itemsCount;
  localStorage.setItem("itemsCount", itemsCount);
  items.textContent = itemsCount;
  nav.appendChild(items)

  itemsInCart.push(parseInt(el.dataset.id))
  localStorage.setItem("cart", itemsInCart)

}


let cartContent = [],
    price = [],
    id = 0;

cartContent:
for (let i = 0; i < itemsInCart.length; i++) {
  if (isNaN(itemsInCart[0]) == false) {
    cartContent.push({id: i, name: data[itemsInCart[i]].name, img: data[itemsInCart[i]].img, desc: data[itemsInCart[i]].desc, price: data[itemsInCart[i]].price});
  } else {
    break cartContent;
  }
}

for (let i = 0; i < cartContent.length; i++) {
  price.push(data[[itemsInCart[i]]].price);
}


price = price[0] == null ? 0 : price.reduce((ac, cr) => ac + cr);
//=============
const cartItem = (name,img,price,id) => {
  return `
  <div id="cart-item" data-id="${id}">
    <div>
      <img src="${img}">
    </div>
    <span>
        ${name.length > 24 ? name.slice(0,24) + " ..." : name}
      <div>
        $${price}
      </div>
    </span>
    <button onclick="deleteItem(this)"><i class="icon-delete"></i></button>
  </div>
  `;
}

items.setAttribute("class", "items");
items.textContent = itemsCount;

let empty = document.createElement("div");
empty.setAttribute("class","alert")
empty.innerHTML = `<i class="icon-empty"></i>
  <span>you'r cart is empty !</span>`;

let actions = document.createElement("div"),
    completePayment = document.querySelector(".complete-payment");
actions.setAttribute("class", "actions");
actions.innerHTML = `
  <div class="subtotal">
    Cart subtotal <span>(${itemsCount} item) </span>
    <span> $${price}</span>
  </div>
  <button onclick="clearCart()">
    Clear Cart
  </button>
  <button onclick="checkout()">
    Checkout
  </button>
`;

window.onload = () => {
  for (let i = 0; i < data.length; i++) {
    productsWrapp.innerHTML += product(data[i].name,data[i].desc,data[i].img,data[i].price,data[i].id);
  }

  for (let i = 0; i < cartContent.length; i++){
    cart.innerHTML += cartItem(cartContent[i].name,cartContent[i].img,cartContent[i].price,cartContent[i].id);
  }

  nav.appendChild(items);
  if (itemsCount <= 0) {
    cart.appendChild(empty);
  } else {
    cart.appendChild(actions);
  }

  if ((cartContent.length * 90) > window.innerHeight){
    cart.style.overflowY = "scroll";
  }
}

const clearCart = () => {
  localStorage.removeItem("cart");
  itemsCount = 0;
  localStorage.setItem("itemsCount", itemsCount);
  items.textContent = itemsCount;
  localStorage.removeItem("cart");
  itemsInBag = [];
  cart.innerHTML = null;
  cart.appendChild(empty);
}

let close = completePayment.firstElementChild,
    closeCheckout = document.querySelector(".shadow");

const checkout = (img) => {
  closeCart.click();
  document.body.style.overflow = "hidden";
  localStorage.removeItem("cart");
  cart.classList.add("remove");

  completePayment.classList.add("checkout");

  closeCheckout.classList.add("opened");
  
  img = completePayment.lastElementChild;
  img.src = "";
  img.src = "images/animation_500_kj647805.gif";
  
  var anim = setTimeout(() => {
    img.src = "images/animation_500_kj64aw60.gif";
  }, 4800);

  var animation = setTimeout(() => {
    cart.classList.remove("remove");
    closeCheckout.click();
    document.body.style.overflow = "unset";
  }, 8620);
  closeCheckout.onclick = () => {
    clearTimeout(anim);
    clearTimeout(animation);
    document.body.style.overflow = "unset";
    completePayment.classList.remove("checkout");
    closeCheckout.classList.remove("opened");
    cart.classList.remove("remove");
  }
  itemsCount = 0;
  localStorage.setItem("itemsCount", itemsCount);
  items.textContent = itemsCount;
  localStorage.removeItem("cart");
  cartContent = [];
  itemsInCart = [];
  itemsInBag = [];
  cart.innerHTML = null;
  cart.appendChild(empty);
}



close.onclick = () => {
  closeCheckout.click();
}

// console.log(itemsInCart)