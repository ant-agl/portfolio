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
