'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// skills variables terminal
(() => {
  const skillEl = document.getElementById("krmSkillOut");
  const projEl  = document.getElementById("krmProjectOut");
  if (!skillEl || !projEl) return;

  // ✅ Edita aquí
  const skills = [
    "HTML5", "CSS3", "JavaScript", "Bootstrap 5", "WordPress",
    "Vue 3", "React", "Figma", "Illustrator",
    "Google Analytics", "GSAP", "Visual Studio Code"
  ];

  const projects = [
    "via-design-system", "supplyhub", "almacenes", "materiales",
    "reservia", "reto365", "cgi", "pasteleria-lety", "dwonky"
  ];

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Si el usuario prefiere menos animación, lo dejamos fijo:
  if (reduceMotion) {
    skillEl.innerHTML = `<span class="t-skill">${skills.join(", ")}</span>`;
    projEl.innerHTML  = projects.map(p => `<span class="t-project">${p}</span><span class="t-slash"></span>`).join(" ");
    return;
  }

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  async function typeText(el, text, { speed = 22 } = {}) {
    el.textContent = "";
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await wait(speed);
    }
  }

  async function eraseText(el, { speed = 10 } = {}) {
    const text = el.textContent;
    for (let i = text.length; i >= 0; i--) {
      el.textContent = text.slice(0, i);
      await wait(speed);
    }
  }

  // Ciclo: Skills (una a una) + Projects (uno a uno)
  let si = 0;
  let pi = 0;

  async function loop() {
    while (true) {
      // Skills
      const skill = skills[si % skills.length];
      skillEl.innerHTML = ""; // reset
      const spanS = document.createElement("span");
      spanS.className = "t-skill";
      skillEl.appendChild(spanS);

      await typeText(spanS, skill, { speed: 24 });
      await wait(900);
      await eraseText(spanS, { speed: 12 });

      si++;

      // Projects / Clients
      const project = projects[pi % projects.length];
      projEl.innerHTML = "";
      const wrap = document.createElement("span");
      wrap.innerHTML = `<span class="t-project"></span><span class="t-slash"></span>`;
      projEl.appendChild(wrap);

      const pSpan = wrap.querySelector(".t-project");
      await typeText(pSpan, project, { speed: 20 });
      await wait(1000);
      await eraseText(pSpan, { speed: 11 });

      pi++;
      await wait(250);
    }
  }

  loop();
})();




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
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

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



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
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