"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]"
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]"
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
  elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    console.log(this, selectValue);
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    filterItems[i].classList.remove("active");
    setTimeout(() => {
      if (selectedValue === "все") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      }
    });
  }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// modal thanks
const modalThanks = document.querySelector("[data-modal-thanks]");
const modalThanksOverlay = modalThanks.querySelector("[data-overlay]");
const modalThanksCloseBtn = modalThanks.querySelector("[data-modal-close-btn]");
const checkmark = modalThanks.querySelector("[data-checkmark]");
const checkmarkСircle = modalThanks.querySelector("[data-checkmark-circle]");
const checkmarkСheck = modalThanks.querySelector("[data-checkmark-check]");

// close modal thanks
modalThanksOverlay.addEventListener("click", function () {
  modalThanks.classList.remove("active");
  modalThanksOverlay.classList.remove("active");

  checkmark.classList.remove("checkmark");
  checkmarkСircle.classList.remove("checkmark__circle");
  checkmarkСheck.classList.remove("checkmark__check");
});
modalThanksCloseBtn.addEventListener("click", function () {
  modalThanks.classList.remove("active");
  modalThanksOverlay.classList.remove("active");

  checkmark.classList.remove("checkmark");
  checkmarkСircle.classList.remove("checkmark__circle");
  checkmarkСheck.classList.remove("checkmark__check");
});

// send form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // send data
  const formData = new FormData(form);

  // const xhr = new XMLHttpRequest();
  // xhr.open("POST", "https://ant-agl.ru/test.php");
  // xhr.send(formData);

  // xhr.onload = () => {
  modalThanks.classList.add("active");
  modalThanksOverlay.classList.add("active");

  checkmark.classList.add("checkmark");
  checkmarkСircle.classList.add("checkmark__circle");
  checkmarkСheck.classList.add("checkmark__check");

  formInputs.forEach((input) => {
    input.value = "";
  });
  // };
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (
        this.getAttribute("data-link").toLowerCase() === pages[i].dataset.page
      ) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}
