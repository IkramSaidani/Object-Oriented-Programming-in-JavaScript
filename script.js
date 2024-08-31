// Store the properties for id, name, and price of the product.
class Product {
  constructor(id, name, price, img) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.img = img;
  }
}

// Store the properties for product and its quantity.
class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  // Calculate the total price of the item.
  getTotalPrice() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Get the total number of items inside the cart.
  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Add items
  addItem(product, quantity) {
    const existingItem = this.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const cartItem = new ShoppingCartItem(product, quantity);
      this.items.push(cartItem);
    }
  }

  // Remove items
  removeItem(product) {
    this.items = this.items.filter((item) => item.product.id !== product.id);
  }

  // Remove All Items
  removeAllItems() {
    this.items = [];
  }

  // Update item quantity
  updateItemQuantity(product, newQuantity) {
    const item = this.items.find((item) => item.product.id === product.id);
    if (item) {
      item.quantity = newQuantity;
      if (item.quantity <= 0) {
        this.removeItem(product);
      }
    }
  }

  // Calculate total price of all items in the cart.
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }

  // Display cart items
  displayCartItems() {
    this.items.forEach((item) => display(item, this));
  }
}

// Display cart items
function display(item,shoppingCart) {
  const existingItem = document.querySelector(
    `.cart-item[data-id='${item.product.id}']`
  );
  if (existingItem) {
    const quantityElem = existingItem.querySelector(".quantity");
      const productPriceElem = existingItem.querySelector(".product-price");
      quantityElem.textContent = item.quantity;
      productPriceElem.textContent = `${item.getTotalPrice().toFixed(2)} $`;
    } else {
    const cartItem = document.createElement("li");
    cartItem.classList.add("cart-item");
    cartItem.setAttribute("data-id", item.product.id);

    const productImage = document.createElement("img");
    productImage.classList.add("cart-img");
    productImage.src = item.product.img;
    productImage.alt = item.product.name;
    cartItem.appendChild(productImage);

    const productName = document.createElement("p");
    productName.textContent = item.product.name;
    cartItem.appendChild(productName);

    const likeIcon = document.createElement("div");
    likeIcon.classList.add("icon");
    likeIcon.innerHTML = `<i class="like fa-solid fa-heart"></i>`;
    cartItem.appendChild(likeIcon);
    likeIcon.addEventListener("click", () => {
        likeIcon.style.color = likeIcon.style.color === "red" ? "gray" : "red";
    });

    const eventsGroup = document.createElement("div");
    eventsGroup.classList.add("events-group");

    const subItem = document.createElement("button");
    subItem.classList.add("sub-item");
    subItem.textContent = "-";
    eventsGroup.appendChild(subItem);
    subItem.addEventListener("click", () => {
      if (item.quantity > 1) {
        shoppingCart.updateItemQuantity(item.product, item.quantity - 1);
      } else {
        shoppingCart.removeItem(item.product);
      }
      updateCart(shoppingCart);
    });

    const quantity = document.createElement("p");
    quantity.classList.add("quantity");
    quantity.textContent = item.quantity;
    eventsGroup.appendChild(quantity);

    const addItem = document.createElement("button");
    addItem.classList.add("add-item");
    addItem.textContent = "+";
    eventsGroup.appendChild(addItem);
    addItem.addEventListener("click", () => {
        shoppingCart.updateItemQuantity(item.product, item.quantity + 1);
      updateCart(shoppingCart);
    });

    const removeItem = document.createElement("button");
    removeItem.classList.add("remove");
    removeItem.textContent = "remove";
    eventsGroup.appendChild(removeItem);
    removeItem.addEventListener("click", () => {
        shoppingCart.removeItem(item.product);
      updateCart(shoppingCart);
    });

    const productPrice = document.createElement("p");
    productPrice.classList.add("product-price");
    productPrice.textContent = `${item.getTotalPrice()} $`;
    eventsGroup.appendChild(productPrice);

    cartItem.appendChild(eventsGroup);

    document.getElementsByClassName("cart-items")[0].appendChild(cartItem);
  }
}

function updateCart(shoppingCart) {
    const cartItemsContainer = document.querySelector(".cart-items");
    cartItemsContainer.innerHTML = "";
    shoppingCart.displayCartItems();
    
    document.getElementsByClassName("total-items")[0].textContent = `Total Items: ${shoppingCart.getTotalItems()}`;
    document.getElementsByClassName("total-price")[0].textContent = `Total Price: ${shoppingCart.getTotalPrice().toFixed(2)} $`;
  
    document.getElementById("cart").style.display = shoppingCart.getTotalItems() === 0 ? "none" : "block";
  }

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementsByClassName("container")[0];
  // Initialize shopping cart
  const shoppingCart = new ShoppingCart();
  // Create products
  const products = [
    new Product(
      1,
      "orange juice",
      2.99,
      "https://img.freepik.com/photos-gratuite/jus-orange-frais-froid_144627-11208.jpg?t=st=1718460541~exp=1718464141~hmac=3eee2136488ec21851783d6402905f94a6e5c4af653f5dde56939f0b52b6d90d&w=360"
    ),
    new Product(
      2,
      "apple juice",
      3.49,
      "https://img.freepik.com/photos-gratuite/jus-pomme-frais-froid_144627-11408.jpg?t=st=1718460623~exp=1718464223~hmac=7be40e62d1caef11749d9e9d94c397bc605b2d4a443518ee17cb4d264bf64882&w=360"
    ),
    new Product(
      3,
      "grape juice",
      3.99,
      "https://img.freepik.com/photos-gratuite/vue-laterale-du-jus-raisin-noir-tube-boire-verre-bol-raisins-rouges-feuilles-fond-blanc_141793-27321.jpg?t=st=1718460709~exp=1718464309~hmac=4740d59fe56c4a31dccabdb6f8bc92b1e0511133626c68575135fd8a1bd9d879&w=740"
    ),
  ];
  //add products to the cart with initial quantity of 1
  products.forEach((product) => shoppingCart.addItem(product, 1));
  //header-cart title and remove all button
  const cartHeader = document.createElement("div");
  cartHeader.classList.add("cart-header");
  const cartTitle = document.createElement("h1");
  cartTitle.classList.add("cart-title");
  cartTitle.textContent = "Shopping Cart";

  const removeAllButton = document.createElement("button");
  removeAllButton.classList.add("remove-all");
  removeAllButton.textContent = "Remove All";
  removeAllButton.addEventListener("click", () => {
    shoppingCart.removeAllItems();
    updateCart(shoppingCart);
  });

  cartHeader.appendChild(cartTitle);
  cartHeader.appendChild(removeAllButton);

  container.appendChild(cartHeader);

  //body-cart items: image,title, like buttons,remove buttons,add and subs buttons, quantity and price
  const cartItems = document.createElement("ul");
  cartItems.classList.add("cart-items");
  container.appendChild(cartItems);
  
  //display cart items
  shoppingCart.displayCartItems();

  //footer-cart totalprice, totalitems,validate button and cancel button
  const cartFooter = document.createElement("div");
  cartFooter.classList.add("cart-footer");
  container.appendChild(cartFooter);

  const totalItems = document.createElement("p");
  totalItems.classList.add("total-items");
  totalItems.textContent = `Total Items: ${shoppingCart.getTotalItems()}`;
  cartFooter.appendChild(totalItems);

  const totalPrice = document.createElement("h2");
  totalPrice.classList.add("total-price");
  totalPrice.textContent = `Total Price: ${shoppingCart.getTotalPrice().toFixed(2)} $`;
  cartFooter.appendChild(totalPrice);

  const validateButton = document.createElement("button");
  validateButton.setAttribute("id", "validate");
  validateButton.textContent = "Validate";
  cartFooter.appendChild(validateButton);
  validateButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      container.remove();
      const boxValidation = document.createElement("div");
      boxValidation.classList.add("boxValidation");
      boxValidation.innerHTML = `<h1>Your order has been validated</h1>`;
      document.body.appendChild(boxValidation);
    }
  });

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("id", "cancel");
  cancelButton.textContent = "Cancel";
  cartFooter.appendChild(cancelButton);
  cancelButton.addEventListener("click", () => {
    if (confirm("Are you sure?")) {
      container.remove();
      const boxCancel = document.createElement("div");
      boxCancel.classList.add("boxCancel");
      boxCancel.innerHTML = `<h1>Your order has been cancelled</h1>`;
      document.body.appendChild(boxCancel);
    }
  });
  updateCart(shoppingCart);
});
