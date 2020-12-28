let itemsInBag = localStorage.getItem("cart") == null ? []: localStorage.getItem("cart").split(",");

itemsInBag = itemsInBag.map(x => parseInt(x));

const add = id => {
  id = id.parentElement.parentElement.dataset.id;
  itemsInBag.push(id);

  cart.innerHTML += cartItem(data[id].name,data[id].img,data[id].price,(itemsInBag.length - 1));

  cart.scrollBy(0,10000);

  if ((itemsInBag.length * 80) > window.innerHeight) {
    cart.style.overflowY = "scroll";
  }

  const alertBox = document.querySelector(".alert") != null ? document.querySelector(".alert").remove() : "nothing";

  let totalPrice = [];

  for (let i = 0; i < itemsInBag.length; i++) {
    if (isNaN(itemsInBag[i]) == true) {
      itemsInBag.splice(i,1)
    } else {
      totalPrice.push(data[itemsInBag[i]].price)
    }
  }

  totalPrice = totalPrice == null ? [] : totalPrice.reduce((ac,cr) => ac + cr);

  if (itemsInBag.length === 1) {
    cart.appendChild(actions);
  }

  let btns = document.querySelector(".actions");

  btns.innerHTML = `
    <div class="subtotal">
      Cart subtotal <span>(${itemsInBag.length} item) </span>
      <span> $${totalPrice}</span>
    </div>
    <button onclick="clearCart()">
      Clear Cart
    </button>
    <button onclick="checkout()">
      Checkout
    </button>
  `;
  
  let i = itemsInBag.length - 1;
  cartContent.push({id: itemsInBag.length - 1, name: data[itemsInBag[i]].name, img: data[itemsInCart[i]].img, desc: data[itemsInCart[i]].desc, price: data[itemsInCart[i]].price})
}

const deleteItem = (el) => {
  let id = el.parentElement.dataset.id;
  el = el.parentElement;

  id = cartContent.findIndex((element) => element.id == id);
  if (cartContent.length === 1) {
    localStorage.removeItem("cart");
    cartContent = [];
    itemsInCart = [];
    itemsInBag = [];

    document.querySelector(".actions").classList.remove("details");
    cart.innerHTML = null;
    cart.appendChild(empty);

    itemsCount = 0;
    localStorage.setItem("itemsCount", itemsCount);
    items.textContent = itemsCount;
    el.remove();
  } else {
    cartContent.splice(id,1);
    itemsInCart.splice(id,1);
    itemsInBag.splice(id,1);
    localStorage.setItem("cart", itemsInCart)
    let totalPrice = [];

    for (let i = 0; i < itemsInBag.length; i++) {
      if (isNaN(itemsInBag[i]) == true) {
        itemsInBag.splice(i,1)
      } else {
        totalPrice.push(data[itemsInBag[i]].price)
      }
    }

    totalPrice = totalPrice == null ? [] : totalPrice === "" ? [] : totalPrice.reduce((ac,cr) => ac + cr);

    let btns = document.querySelector(".actions");

    btns.innerHTML = `
      <div class="subtotal">
        Cart subtotal <span>(${itemsInBag.length} item) </span>
        <span> $${totalPrice}</span>
      </div>
      <button onclick="clearCart()">
        Clear Cart
      </button>
      <button onclick="checkout()">
        Checkout
      </button>
    `;
  --itemsCount;
  localStorage.setItem("itemsCount", itemsCount);
  items.textContent = itemsCount;
  el.remove();
  }
}