'use strict';
console.log('SCRIPT LOADED');



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



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
if (modalCloseBtn) modalCloseBtn.addEventListener("click", testimonialsModalFunc);
if (overlay) overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
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
let lastClickedBtn = filterBtn[0] || null;

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    if (lastClickedBtn) lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
if (formInputs.length > 0) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form && form.checkValidity()) {
        if (formBtn) formBtn.removeAttribute("disabled");
      } else {
        if (formBtn) formBtn.setAttribute("disabled", "");
      }
    });
  }
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");
console.log('NAV: found', navigationLinks.length, 'links, pages:', pages.length);

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedLink = this;
    console.log('NAV click:', clickedLink.textContent.trim().toLowerCase());

    for (let j = 0; j < pages.length; j++) {
      if (clickedLink.textContent.trim().toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        clickedLink.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }

  });
}



// github contribution graph
const githubGraph = document.querySelector("[data-github-graph]");
const githubUsername = "Alik-V";
const githubProfileUrl = "https://github.com/" + githubUsername;

const renderGithubFallback = function () {
  githubGraph.innerHTML =
    '<p class="github-graph-status">Contribution data is unavailable right now — ' +
    '<a href="' + githubProfileUrl + '" target="_blank" rel="noopener">view on GitHub</a>.</p>';
};

const renderGithubGraph = function (data) {
  const days = data.contributions || [];
  if (!days.length) { renderGithubFallback(); return; }

  // GitHub weeks start on Sunday; pad the first column so weekdays line up.
  const firstDay = new Date(days[0].date + "T00:00:00").getDay();

  let cells = "";
  for (let i = 0; i < firstDay; i++) {
    cells += '<div class="github-graph-cell" data-level="0" style="visibility:hidden"></div>';
  }
  for (let i = 0; i < days.length; i++) {
    const d = days[i];
    const label = d.count + (d.count === 1 ? " contribution" : " contributions") + " on " + d.date;
    cells += '<div class="github-graph-cell" data-level="' + (d.level || 0) + '" title="' + label + '"></div>';
  }

  const total = days.reduce(function (sum, d) { return sum + d.count; }, 0);

  githubGraph.innerHTML =
    '<div class="github-graph-scroll"><div class="github-graph-grid">' + cells + '</div></div>' +
    '<div class="github-graph-footer">' +
      '<span class="github-graph-total">' + total.toLocaleString() + ' contributions in the last year</span>' +
      '<span class="github-graph-legend">Less' +
        '<i data-level="0"></i><i data-level="1"></i><i data-level="2"></i><i data-level="3"></i><i data-level="4"></i>' +
      'More</span>' +
    '</div>';
};

if (githubGraph) {
  fetch("https://github-contributions-api.jogruber.de/v4/" + githubUsername + "?y=last")
    .then(function (res) {
      if (!res.ok) throw new Error("Request failed: " + res.status);
      return res.json();
    })
    .then(renderGithubGraph)
    .catch(function (err) {
      console.warn("GitHub contributions unavailable:", err);
      renderGithubFallback();
    });
}



// splash screen with avatar morph (runs on every load / reload)
(function () {
  const splash = document.querySelector("[data-splash]");
  if (!splash) return;

  const splashAvatar = splash.querySelector("[data-splash-avatar]");
  const targetAvatar = document.querySelector("[data-avatar-target]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const HOLD = reduceMotion ? 600 : 2500; // time on screen before dismiss
  let finished = false;

  document.body.classList.add("splash-open");

  function finish() {
    if (finished) return;
    finished = true;
    if (targetAvatar) targetAvatar.style.visibility = "";
    document.body.classList.remove("splash-open");
    splash.remove();
  }

  function fadeOut() {
    // fallback dismiss with no morph (reduced motion or missing avatars)
    splash.classList.add("is-morphing");
    setTimeout(finish, 650);
  }

  function morph() {
    if (reduceMotion || !splashAvatar || !targetAvatar) { fadeOut(); return; }

    const first = splashAvatar.getBoundingClientRect();
    const last = targetAvatar.getBoundingClientRect();
    if (!last.width || !first.width) { fadeOut(); return; }

    // pin the splash avatar where it currently sits, then fly it to the target
    splashAvatar.style.position = "fixed";
    splashAvatar.style.margin = "0";
    splashAvatar.style.left = first.left + "px";
    splashAvatar.style.top = first.top + "px";
    splashAvatar.style.width = first.width + "px";
    splashAvatar.classList.add("is-flying");

    // hide the real avatar during the flight so there's no duplicate
    targetAvatar.style.visibility = "hidden";

    // fade backdrop + text to reveal the site underneath
    splash.classList.add("is-morphing");

    const dx = last.left - first.left;
    const dy = last.top - first.top;
    const scale = last.width / first.width;

    requestAnimationFrame(function () {
      splashAvatar.style.transform =
        "translate(" + dx + "px, " + dy + "px) scale(" + scale + ")";
    });

    splashAvatar.addEventListener("transitionend", finish, { once: true });
    setTimeout(finish, 1300); // safety net if transitionend never fires
  }

  setTimeout(morph, HOLD);
})();