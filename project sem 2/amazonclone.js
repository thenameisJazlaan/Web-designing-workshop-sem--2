
let cart = [];


document.addEventListener("DOMContentLoaded", () => {
  initCart();
  initSearch();
  initCartSidebar();
  initAddToCartButtons();
  animateProductCards();
});


function initCartSidebar() {
  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "cart-overlay";
  overlay.style.cssText = `
    display:none; position:fixed; inset:0;
    background:rgba(0,0,0,0.5); z-index:999;
  `;
  overlay.addEventListener("click", closeCart);
  document.body.appendChild(overlay);

  // Sidebar
  const sidebar = document.createElement("div");
  sidebar.id = "cart-sidebar";
  sidebar.innerHTML = `
    <div class="cart-header">
      <h2>🛒 Your Cart</h2>
      <button id="close-cart-btn" onclick="closeCart()">✕</button>
    </div>
    <div id="cart-items-container"></div>
    <div class="cart-footer" id="cart-footer" style="display:none;">
      <div class="cart-total">
        Total: <span id="cart-total-price">₹0</span>
      </div>
      <button class="checkout-btn" onclick="handleCheckout()">
        Proceed to Checkout
      </button>
    </div>
  `;
  sidebar.style.cssText = `
    position:fixed; top:0; right:-420px; width:400px; height:100vh;
    background:#fff; z-index:1000; box-shadow:-4px 0 20px rgba(0,0,0,0.15);
    transition:right 0.35s cubic-bezier(0.4,0,0.2,1);
    display:flex; flex-direction:column;
    font-family: 'Amazon Ember', Arial, sans-serif;
  `;
  document.body.appendChild(sidebar);

  
  const style = document.createElement("style");
  style.textContent = `
    #cart-sidebar .cart-header {
      display:flex; justify-content:space-between; align-items:center;
      padding:18px 20px; background:#131921; color:#fff;
    }
    #cart-sidebar .cart-header h2 { margin:0; font-size:1.2rem; }
    #cart-sidebar #close-cart-btn {
      background:none; border:none; color:#fff;
      font-size:1.4rem; cursor:pointer; line-height:1;
    }
    #cart-items-container {
      flex:1; overflow-y:auto; padding:16px;
    }
    .cart-item {
      display:flex; gap:12px; align-items:center;
      border-bottom:1px solid #eee; padding:12px 0;
    }
    .cart-item-info { flex:1; }
    .cart-item-name { font-weight:600; font-size:0.9rem; }
    .cart-item-price { color:#B12704; font-weight:700; margin-top:4px; }
    .cart-item-qty {
      display:flex; align-items:center; gap:8px; margin-top:8px;
    }
    .qty-btn {
      width:28px; height:28px; border:1px solid #ccc; background:#f0f0f0;
      border-radius:4px; cursor:pointer; font-size:1rem; line-height:1;
    }
    .qty-btn:hover { background:#e0e0e0; }
    .qty-display {
      min-width:24px; text-align:center; font-weight:600;
    }
    .remove-btn {
      color:#e53935; background:none; border:none;
      cursor:pointer; font-size:0.8rem; margin-left:4px;
    }
    .cart-footer {
      padding:16px 20px; border-top:2px solid #eee; background:#fafafa;
    }
    .cart-total {
      font-size:1.1rem; font-weight:700; margin-bottom:12px;
    }
    #cart-total-price { color:#B12704; }
    .checkout-btn {
      width:100%; padding:12px; background:#f0c14b;
      border:1px solid #a88734; border-radius:4px;
      font-size:1rem; font-weight:700; cursor:pointer;
      transition:background 0.2s;
    }
    .checkout-btn:hover { background:#e8b930; }
    .cart-empty {
      text-align:center; padding:40px 20px; color:#888;
    }
    /* Cart badge */
    #cart-badge {
      position:absolute; top:-6px; right:-10px;
      background:#e53935; color:#fff;
      border-radius:50%; width:18px; height:18px;
      font-size:0.7rem; font-weight:700;
      display:flex; align-items:center; justify-content:center;
    }
    /* Toast */
    #toast-container {
      position:fixed; bottom:24px; left:50%; transform:translateX(-50%);
      z-index:2000; display:flex; flex-direction:column; gap:8px;
    }
    .toast {
      background:#131921; color:#fff; padding:12px 24px;
      border-radius:8px; font-size:0.9rem; font-weight:500;
      box-shadow:0 4px 16px rgba(0,0,0,0.25);
      animation:toastIn 0.3s ease, toastOut 0.3s ease 2.5s forwards;
      white-space:nowrap;
    }
    .toast.success { border-left:4px solid #f0c14b; }
    .toast.error { border-left:4px solid #e53935; }
    @keyframes toastIn {
      from { opacity:0; transform:translateY(20px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes toastOut {
      from { opacity:1; transform:translateY(0); }
      to   { opacity:0; transform:translateY(20px); }
    }
    /* Product card hover */
    .product-card {
      transition:transform 0.2s, box-shadow 0.2s;
    }
    .product-card:hover {
      transform:translateY(-4px);
      box-shadow:0 8px 24px rgba(0,0,0,0.12);
    }
    /* Search highlight */
    .product-card.hidden {
      display:none;
    }
  `;
  document.head.appendChild(style);

  // Toast container
  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-container";
  document.body.appendChild(toastContainer);
}


function initCart() {
  // Add cart icon click to header
  const cartLink = document.querySelector('.header-link[href="#"]');
  const headerLinks = document.querySelectorAll(".header-link");
  headerLinks.forEach((link) => {
    if (link.textContent.trim() === "Cart") {
      link.style.position = "relative";
      const badge = document.createElement("span");
      badge.id = "cart-badge";
      badge.style.display = "none";
      link.appendChild(badge);
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openCart();
      });
    }
  });
}

function openCart() {
  document.getElementById("cart-sidebar").style.right = "0";
  document.getElementById("cart-overlay").style.display = "block";
  renderCartItems();
}

function closeCart() {
  document.getElementById("cart-sidebar").style.right = "-420px";
  document.getElementById("cart-overlay").style.display = "none";
}

function addToCart(name, price) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty++;
    showToast(`${name} quantity updated`, "success");
  } else {
    cart.push({ name, price, qty: 1 });
    showToast(`${name} added to cart! 🛒`, "success");
  }
  updateCartBadge();
  renderCartItems();
}

function removeFromCart(index) {
  const removed = cart[index].name;
  cart.splice(index, 1);
  updateCartBadge();
  renderCartItems();
  showToast(`${removed} removed from cart`, "error");
}

function changeQty(index, delta) {
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    removeFromCart(index);
    return;
  }
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;
  const total = cart.reduce((sum, i) => sum + i.qty, 0);
  badge.textContent = total;
  badge.style.display = total > 0 ? "flex" : "none";
}

function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  const footer = document.getElementById("cart-footer");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty">
      <p style="font-size:2.5rem;">🛒</p>
      <p>Your cart is empty</p>
    </div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  if (footer) footer.style.display = "block";

  container.innerHTML = cart
    .map(
      (item, i) => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString("en-IN")}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i}, +1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${i})">Remove</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalEl = document.getElementById("cart-total-price");
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;
}


function initAddToCartButtons() {
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const btn = card.querySelector(".add-to-cart");
    const nameEl = card.querySelector(".product-name");
    const priceEl = card.querySelector(".product-price");

    if (!btn || !nameEl || !priceEl) return;

    const name = nameEl.textContent.trim();
    
    const price = parseInt(priceEl.textContent.replace(/[₹,]/g, ""), 10);

    btn.addEventListener("click", () => {
      addToCart(name, price);

      
      btn.textContent = "✓ Added!";
      btn.style.background = "#4caf50";
      btn.style.color = "#fff";
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.style.background = "";
        btn.style.color = "";
      }, 1500);
    });
  });
}


function initSearch() {
  const searchInput = document.querySelector(".search-bar input");
  const searchBtn = document.querySelector(".search-btn");

  if (!searchInput || !searchBtn) return;

  function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = document.querySelectorAll(".product-card");
    let found = 0;

    cards.forEach((card) => {
      const name = card.querySelector(".product-name")?.textContent.toLowerCase() || "";
      if (query === "" || name.includes(query)) {
        card.classList.remove("hidden");
        found++;
      } else {
        card.classList.add("hidden");
      }
    });

    
    let noResults = document.getElementById("no-results-msg");
    if (!noResults) {
      noResults = document.createElement("p");
      noResults.id = "no-results-msg";
      noResults.style.cssText = `
        grid-column:1/-1; text-align:center;
        color:#888; font-size:1.1rem; padding:40px;
      `;
      document.querySelector(".products-grid")?.appendChild(noResults);
    }
    noResults.style.display = found === 0 && query !== "" ? "block" : "none";
    noResults.textContent = `No products found for "${searchInput.value.trim()}"`;
  }

  searchBtn.addEventListener("click", filterProducts);
  searchInput.addEventListener("input", filterProducts);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") filterProducts();
  });
}


function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => toast.remove(), 2900);
}


function animateProductCards() {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(24px)";
    card.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 + i * 80);
  });
}


function handleCheckout() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  showToast(`Order placed! Total: ₹${total.toLocaleString("en-IN")} 🎉`, "success");
  cart = [];
  updateCartBadge();
  renderCartItems();
  closeCart();
}