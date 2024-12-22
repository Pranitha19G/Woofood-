// Update cart count on navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.querySelector(".cart-count").innerText = cartCount;
}

// Update order summary
function updateOrderSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderItemsContainer = document.getElementById("order-items");
    const subtotalElem = document.getElementById("subtotal");
    const deliveryFeeElem = document.getElementById("delivery-fee-container");
    const totalElem = document.getElementById("total");

    let subtotal = 0;
    orderItemsContainer.innerHTML = ''; // Clear existing items

    // Loop through cart items and populate the order summary
    cart.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toFixed(2)}</td>`;
        orderItemsContainer.appendChild(row);
        subtotal += item.price * item.quantity;
    });

    // Update subtotal and total
    subtotalElem.innerText = `$${subtotal.toFixed(2)}`;
    const deliveryFee = 5.00; // Static delivery fee
    deliveryFeeElem.style.display = 'block';
    document.getElementById("delivery-fee").innerText = `$${deliveryFee.toFixed(2)}`;

    // Check selected payment method and update total
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    if (paymentMethod && paymentMethod.value === "cash-on-delivery") {
        totalElem.innerText = `$${(subtotal + deliveryFee).toFixed(2)}`;
    } else {
        totalElem.innerText = `$${subtotal.toFixed(2)}`;
    }
}

// Handle order submission
function submitOrder(event) {
    event.preventDefault();
    const form = document.getElementById("checkout-form");

    // Check form validity
    if (!form.checkValidity()) {
        alert("Please fill all required fields.");
        return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Process the order and clear the cart
    localStorage.removeItem("cart");
    alert("Order placed successfully! Thank you for shopping.");
    updateCartCount();
}

// Initialize page
updateCartCount();
updateOrderSummary();

// Listen to changes in payment method
document.querySelectorAll('input[name="payment"]').forEach(input => {
    input.addEventListener('change', updateOrderSummary);
});

