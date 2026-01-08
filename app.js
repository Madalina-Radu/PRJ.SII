// ===== Reviews slider (doar pe index.html) =====
document.addEventListener("DOMContentLoaded", () => {
  const reviews = document.querySelectorAll(".review");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  if (!reviews.length || !nextBtn || !prevBtn) return;

  let currentReview = 0;

  function showReview(index) {
    reviews.forEach(r => r.classList.remove("active"));
    reviews[index].classList.add("active");
  }

  nextBtn.addEventListener("click", () => {
    currentReview = (currentReview + 1) % reviews.length;
    showReview(currentReview);
  });

  prevBtn.addEventListener("click", () => {
    currentReview = (currentReview - 1 + reviews.length) % reviews.length;
    showReview(currentReview);
  });

  showReview(currentReview);
});

// ===== Cart (persistă între pagini) =====
let cart = JSON.parse(localStorage.getItem("mdr_cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price: Number(price) });
  localStorage.setItem("mdr_cart", JSON.stringify(cart));
  alert("Produs adăugat în coș!");
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("mdr_cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartTable = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  if (!cartTable || !totalEl) return;

  cart = JSON.parse(localStorage.getItem("mdr_cart")) || [];
  cartTable.innerHTML = "";

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartTable.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>1</td>
        <td>${item.price} RON</td>
        <td><button onclick="removeFromCart(${index})">X</button></td>
      </tr>
    `;
  });

  totalEl.textContent = "Total: " + total + " RON";
}

document.addEventListener("DOMContentLoaded", renderCart);
