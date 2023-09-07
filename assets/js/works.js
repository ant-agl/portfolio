(function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "../data/works.json");
  xhr.send();
  xhr.onload = () => {
    let works = JSON.parse(xhr.response);
    console.log(works);

    let filterList = document.querySelector(".filter-list");
    let selectList = document.querySelector(".select-list");
    let projects = document.querySelector(".project-list");
    let worksArr = [];

    for (let category in works) {
      if (works[category].length == 0) continue;

      // add filter
      let liFilter = document.createElement("li");
      liFilter.classList.add("filter-item");
      liFilter.innerHTML = `<button data-filter-btn>${category}</button>`;
      filterList.append(liFilter);

      // add select
      let liSelect = document.createElement("li");
      liSelect.classList.add("select-item");
      liSelect.innerHTML = `<button data-select-item>${category}</button>`;
      selectList.append(liSelect);

      works[category].forEach((work) => {
        let html = `
          <li class="project-item active" data-filter-item data-category="${category.toLocaleLowerCase()}">
            <a href="${work.link}">
              <figure class="project-img">
                <div class="project-item-icon-box">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img
                  src="./assets/images/works/${work.name}/0.png"
                  alt="${work.name}"
                  loading="lazy"
                >
              </figure>
              <h3 class="project-title">${work.name}</h3>
              <p class="project-category">${category}</p>
            </a>
          </li>
        `;

        worksArr.push({
          html,
          sort: work.sort || 10,
          json: { ...work, category },
        });
      });
    }

    worksArr.sort((a, b) => {
      if (a.sort > b.sort) return 1;
      if (a.sort < b.sort) return -1;
      return 0;
    });

    projects.innerHTML = worksArr.map((i) => i.html).join("");

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

    // modal
    let itemsWork = document.querySelectorAll(".project-item");
    let modal = document.querySelector("[data-modal-work]");
    let overlay = modal.querySelector("[data-overlay]");
    let closeBtn = modal.querySelector("[data-modal-close-btn]");

    let modalTitle = modal.querySelector("[data-modal-title]");
    let modalCategory = modal.querySelector("[data-modal-category]");
    let modalDesc = modal.querySelector("[data-modal-desc]");
    let modalSkills = modal.querySelector("[data-modal-skills]");
    let modalLink = modal.querySelector("[data-modal-link]");
    let modalSlider = modal.querySelector("[data-modal-slider]");

    let splide;

    console.log(itemsWork);
    itemsWork.forEach((item, i) => {
      item.addEventListener("click", function (e) {
        e.preventDefault();

        let work = worksArr[i].json;
        modalTitle.innerText = work.name;
        modalCategory.innerText = work.category;

        if (work.desc) {
          modalDesc.style.display = "";
          modalDesc.innerText = work.desc;
        } else {
          modalDesc.style.display = "none";
        }

        if (work.skills?.length) {
          modalSkills.style.display = "";
          let html = "";
          work.skills.forEach((skill) => {
            html += `<p class="modal-skill">${skill}</p>`;
          });
          modalSkills.innerHTML = html;
        } else {
          modalSkills.style.display = "none";
        }

        if (work.link) {
          modalLink.style.display = "";
          modalLink.setAttribute("href", work.link);
        } else {
          modalLink.style.display = "none";
        }

        let htmlSlider = "";
        let count = work.countImages || 1;
        for (let image = 0; image < count; image++) {
          if (image > 5) break;

          console.log(image);
          console.log(work.name.toLocaleLowerCase());
          htmlSlider += `
            <li class="splide__slide modal-slide">
              <img src="./assets/images/works/${work.name.toLocaleLowerCase()}/${image}.png">
            </li>
          `;
        }
        modalSlider.innerHTML = htmlSlider;

        splide?.destroy();
        splide = new Splide(".modal-slider", {
          arrowPath:
            "M13 2L27.4713 19.6327C27.7775 20.0059 27.7735 20.5446 27.4616 20.9131L13 38",
          breakpoints: {
            767: {
              arrows: false,
            },
          },
        });
        splide.mount();
        modalToggleFunc();
      });
    });

    const modalToggleFunc = function () {
      modal.classList.toggle("active");
      overlay.classList.toggle("active");
    };
    overlay.addEventListener("click", modalToggleFunc);
    closeBtn.addEventListener("click", modalToggleFunc);
  };
})();
