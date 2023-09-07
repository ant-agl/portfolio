(function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "../data/reviews.json");
  xhr.send();
  xhr.onload = () => {
    let reviews = JSON.parse(xhr.response);

    var reviewBlock = document.querySelector(".testimonials-list");
    reviews.forEach((review) => {
      let item = document.createElement("li");
      item.classList.add("testimonials-item");
      item.innerHTML = `
      <div class="content-card" data-testimonials-item>
        <figure class="testimonials-avatar-box">
          <img src="./assets/images/avatars/${review.image}" alt="${review.name}" width="60" data-testimonials-avatar>
        </figure>

        <h4 class="h4 testimonials-item-title" data-testimonials-title>${review.name}</h4>

        <div class="testimonials-text" data-testimonials-text>
          <p>${review.text}</p>
        </div>
      </div>
    `;

      reviewBlock.append(item);
    });

    // testimonials variables
    const testimonialsItem = document.querySelectorAll(
      "[data-testimonials-item]"
    );
    const modalContainer = document.querySelector("[data-modal-container]");
    const modalCloseBtn = modalContainer.querySelector(
      "[data-modal-close-btn]"
    );
    const overlay = modalContainer.querySelector("[data-overlay]");

    // modal variable
    const modalImg = modalContainer.querySelector("[data-modal-img]");
    const modalTitle = modalContainer.querySelector("[data-modal-title]");
    const modalText = modalContainer.querySelector("[data-modal-text]");

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
  };
})();
