const pricePerItem = 189;
let quantity = 1;
let itemsInBag = 0;
let toastTimer;

const productImage = document.getElementById("product-image");
const quantityNode = document.getElementById("quantity");
const totalPriceNode = document.getElementById("total-price");
const bagCountNode = document.querySelector(".bag-count");
const toastNode = document.getElementById("toast");
const bagButton = document.querySelector(".bag-button");
const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
    alt: "Over-ear wireless headphones in studio lighting"
  },
  {
    src: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    alt: "Close look at cushioned headphone design"
  },
  {
    src: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80",
    alt: "Wireless headphones in a lifestyle setting"
  }
];

function showToast(message) {
  toastNode.textContent = message;
  toastNode.classList.add("visible");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastNode.classList.remove("visible");
  }, 2200);
}

function updateTotalPrice() {
  quantityNode.textContent = quantity;
  totalPriceNode.textContent = `$${pricePerItem * quantity}`;
}

function adjustQuantity(step) {
  quantity = Math.min(9, Math.max(1, quantity + step));
  updateTotalPrice();
}

document.querySelectorAll(".qty-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    adjustQuantity(action === "increase" ? 1 : -1);
  });
});

document.querySelector(".primary-btn").addEventListener("click", () => {
  itemsInBag += quantity;
  bagCountNode.textContent = itemsInBag;
  bagButton.setAttribute(
    "aria-label",
    `Shopping bag, ${itemsInBag} ${itemsInBag === 1 ? "item" : "items"}`
  );

  showToast(
    `${quantity} ${quantity === 1 ? "pair" : "pairs"} added to your bag`
  );
});

document.querySelectorAll(".swatch").forEach((swatch) => {
  swatch.addEventListener("click", () => {
    document.querySelectorAll(".swatch").forEach((item) => {
      const isSelected = item === swatch;
      item.classList.toggle("selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    const selectedColor = swatch.dataset.color;
    document.getElementById("selected-color").textContent = selectedColor;
  });
});

document.querySelectorAll(".thumb").forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    document.querySelectorAll(".thumb").forEach((item, itemIndex) => {
      const isActive = itemIndex === index;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    productImage.style.opacity = "0.55";

    setTimeout(() => {
      productImage.src = galleryImages[index].src;
      productImage.alt = galleryImages[index].alt;
      productImage.style.opacity = "1";
    }, 110);
  });
});

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mainNav.classList.toggle("open", !isOpen);
  menuButton.setAttribute(
    "aria-label",
    !isOpen ? "Close menu" : "Open menu"
  );
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  });
});

bagButton.addEventListener("click", () => {
  const bagMessage = itemsInBag
    ? `Your bag has ${itemsInBag} ${itemsInBag === 1 ? "item" : "items"}`
    : "Your bag is ready for something good";

  showToast(bagMessage);
});

updateTotalPrice();
