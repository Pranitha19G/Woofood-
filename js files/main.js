// Function to show the popup
function openMenuTabsPopup() {
  document.getElementById("uniqueMenuTabsPopup").style.display = "flex";
}

// Function to close the popup
function closeUniqueMenuTabsPopup() {
  document.getElementById("uniqueMenuTabsPopup").style.display = "none";
}

// Function to show tab content based on the tab clicked
function showUniqueTab(tabName) {
  const tabs = document.querySelectorAll('.unique-tab-content');
  const buttons = document.querySelectorAll('.unique-tab-button');

  // Hide all tabs
  tabs.forEach(tab => tab.classList.remove('active'));

  // Remove active class from all buttons
  buttons.forEach(button => button.classList.remove('active'));

  // Show selected tab
  document.getElementById(tabName).classList.add('active');
  
  // Make the clicked button active
  const activeButton = Array.from(buttons).find(button => button.innerText.toLowerCase() === tabName);
  activeButton.classList.add('active');
}

function openCartPage() {
  // Redirect to the cart page 
  window.location.href = 'cart.html';
}
///////////////////////////////////////////////////////////////////////body //////////////////////////
function toggleCard(button) {
  const card = button.closest('.card');
  const content = card.querySelector('.card-content');
  
  if (content.style.display === 'flex') {
    content.style.display = 'none';
    button.textContent = '+';
  } else {
    content.style.display = 'flex';
    button.textContent = '×';
  }
}

///////////////////////////////////////////////////////////////////////////////////select-popup1st//////////////////////////////////////

// Function to open the popup with item details
function openPopup(item) {
  const popup = document.getElementById('item-popup');

  // Set the details in the popup
  document.getElementById('popup-title').textContent = item.name;
  document.getElementById('popup-image').src = item.image;
  document.getElementById('popup-price').textContent = item.price;
  document.getElementById('popup-description').textContent = item.description;

  // Reset quantity to 1 when opening a new popup
  document.getElementById('quantity-input').value = 1;

  // Show the popup
  popup.style.display = 'flex';
}

// Function to close the popup
function closePopup() {
  document.getElementById('item-popup').style.display = 'none';
}

// Function to decrease quantity
function decreaseQuantity() {
  const quantityInput = document.getElementById('quantity-input');
  if (quantityInput.value > 1) {
    quantityInput.value--;
  }
}

// Function to increase quantity
function increaseQuantity() {
  const quantityInput = document.getElementById('quantity-input');
  quantityInput.value++;
}

// Attach event listeners to all 'Select' buttons dynamically
document.querySelectorAll('.select-btn').forEach((button) => {
  button.addEventListener('click', (event) => {
    const itemCard = event.target.closest('.item');
    const itemName = itemCard.querySelector('.details span:first-child').textContent;
    const itemPrice = itemCard.querySelector('.details span:nth-child(2)').textContent;
    const itemImage = itemCard.querySelector('img').src;

    // Call the openPopup function with the item's details
    openPopup({
      name: itemName,
      price: itemPrice,
      image: itemImage,
      description: `Enjoy our delicious ${itemName}!`, // Customize description
    });
  });
});
///////////////////////////////////////////////////////////////////////////////////////change the address/////////////////////////////////////////////////////////////////////////////////////////
 // Open the address popup
function openAddressPopup() {
  document.getElementById("popup-address-container").style.display = "flex";

  // Pre-fill the popup fields if an address already exists in localStorage
  const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));
  if (savedAddress) {
    document.getElementById("popup-name-input").value = savedAddress.name || "";
    document.getElementById("popup-address-input").value = savedAddress.address || "";
    document.getElementById("popup-city-input").value = savedAddress.city || "";
    document.getElementById("popup-zipcode-input").value = savedAddress.zip || "";
  }
}

// Close the address popup
function closeAddressPopup() {
  document.getElementById("popup-address-container").style.display = "none";
}

// Update the delivery address and save it to localStorage
function updateAddressInOrderBox() {
  const fullName = document.getElementById("popup-name-input").value;
  const address = document.getElementById("popup-address-input").value;
  const city = document.getElementById("popup-city-input").value;
  const zipCode = document.getElementById("popup-zipcode-input").value;

  // Validation: Ensure all fields are filled
  if (fullName && address && city && zipCode) {
    const addressDetails = {
      name: fullName,
      address: address,
      city: city,
      zip: zipCode,
    };

    // Save to localStorage
    localStorage.setItem("savedAddress", JSON.stringify(addressDetails));

    // Display the address dynamically
    renderSavedAddress(addressDetails);

    // Close the popup
    closeAddressPopup();
  } else {
    alert("Please fill out all fields!");
  }
}

// Render the saved address on the order box
function renderSavedAddress(addressDetails) {
  const deliveryAddress = document.getElementById("delivery-address");
  deliveryAddress.innerHTML = `
    <p><strong>Address:</strong> ${addressDetails.address}, ${addressDetails.city}, ${addressDetails.zip}</p>
    <button class="change-address-btn" onclick="openAddressPopup()">Change Address</button>
  `;
  deliveryAddress.style.display = "block";

  // Hide the note and the "Complete Your Address" button
  document.getElementById("address-note").style.display = "none";
  document.getElementById("address-btn").style.display = "none";
}

// Load saved address on page load
function loadSavedAddress() {
  const savedAddress = JSON.parse(localStorage.getItem("savedAddress"));
  if (savedAddress) {
    renderSavedAddress(savedAddress);
  }
}
document.addEventListener("DOMContentLoaded", loadSavedAddress);

///////////////////////////////////////////////////////////////////////////////////////////////////////add to cart////////////////////////////////////////////////////////////////////////
let cart = []; // Array to hold selected items

// Function to add an item to the cart
function addToCart() {
  const itemName = document.getElementById("popup-title").textContent;
  const itemPrice = parseFloat(
    document.getElementById("popup-price").textContent.replace("$", "")
  );
  const itemImage = document.getElementById("popup-image").src;
  const itemQuantity = parseInt(
    document.getElementById("quantity-input").value
  );

  // Check if item already exists in the cart
  const existingItem = cart.find((item) => item.name === itemName);
  if (existingItem) {
    existingItem.quantity += itemQuantity;
  } else {
    cart.push({
      name: itemName,
      price: itemPrice,
      image: itemImage,
      quantity: itemQuantity,
    });
  }

  // Update the cart count and order box
  updateCartCount();
  updateOrderBox();

  // Close the popup
  closePopup();
}

// Function to update the cart count in the navbar
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElement.textContent = totalItems;
}

// Function to update the "My Order" container
function updateOrderBox() {
  const orderItemsDiv = document.getElementById("order-items");
  const subtotalElement = document.getElementById("subtotal");
  orderItemsDiv.innerHTML = ''; // Clear existing items
  let subtotal = 0;

  if (cart.length === 0) {
    orderItemsDiv.innerHTML = '<p class="cart-empty">No products in the cart.</p>';
    subtotalElement.textContent = "$0.00";
    return;
  }

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("order-item");
    itemDiv.innerHTML = `
      <span class="remove-item" onclick="removeFromOrder('${item.name}')">❌</span>
      <span>${item.name}</span>
      <img src="${item.image}" alt="${item.name}" />
      <span>${item.quantity} × $${item.price.toFixed(2)}</span>
    `;
    orderItemsDiv.appendChild(itemDiv);
    subtotal += item.price * item.quantity;
  });

  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromOrder(itemName) {
  cart = cart.filter((item) => item.name !== itemName);
  updateCartCount(); // Update the cart count when an item is removed
  updateOrderBox(); // Update the order box
}

// Redirect to the cart page
function openCartPage() {
  localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  window.location.href = "cart.html";
}

// Redirect to the checkout page
function checkout() {
  localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
  window.location.href = "checkout.html";
}

// Attach event listener to the "Add to Cart" button
document.getElementById("add-to-cart").addEventListener("click", addToCart);

// Initialize the cart if already stored in localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedCart = JSON.parse(localStorage.getItem("cart"));
  if (savedCart) {
    cart = savedCart;
    updateCartCount();
    updateOrderBox();
  }
});
