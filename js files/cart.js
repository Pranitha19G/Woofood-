// Load cart data from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count in navbar
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  // Calculate the total quantity of items in the cart
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCountElement.textContent = totalItems; // Update the cart count
}

function renderCart() {
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
cartItemsContainer.innerHTML = "";

let total = 0;

cart.forEach((item, index) => {
const subtotal = item.price * item.quantity;
total += subtotal;

// Render each cart item as per the styles provided
cartItemsContainer.innerHTML += `
  <div class="cart-item">
        <div class="cart-item-header">

    <button onclick="removeItem(${index})" class="remove-btn">❌</button>
    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
        </div>

    <div class="cart-details">
      <div class="cart-info">
        <span class="cart-product-name">${item.name}</span>
        <span class="cart-price">$${item.price.toFixed(2)}</span>
      </div>
      <div class="cart-quantity">
        <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
        <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
        <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
      </div>
      <span class="cart-price">$${subtotal.toFixed(2)}</span>
    </div>
  </div>
`;
});

// Update total price
cartTotalElement.textContent = `$${total.toFixed(2)}`;
updateCartCount(); // Update cart count in the navbar
}

// Function to update item quantity
function updateQuantity(index, newQuantity) {
const quantity = parseInt(newQuantity);
if (quantity > 0) {
cart[index].quantity = quantity;
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
}
}

// Function to remove an item from the cart
function removeItem(index) {
cart.splice(index, 1);
localStorage.setItem("cart", JSON.stringify(cart));
renderCart();
}

// Function to proceed to checkout
function proceedToCheckout() {
alert("Proceeding to checkout...");
window.location.href = "checkout.html";
}

// Attach event listener to the checkout button
document.querySelector(".checkout-btn").addEventListener("click", proceedToCheckout);

// Render the cart on page load
renderCart();
updateCartCount();
