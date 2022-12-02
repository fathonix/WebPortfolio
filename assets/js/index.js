"use strict";

const head = document.getElementsByTagName("head")[0];
const aside = document.getElementsByTagName("aside")[0];
const sections = document.getElementById("sections");
const year = document.getElementById("year");

function setScrollMargin(id, height, target) {
  let style = document.getElementById(id);
  if (!style) {
    style = document.createElement("style");
    style.id = id;
    target.append(style);
  }

  style.innerHTML =
    `.scroll { scroll-margin-top: ${height}px !important; } `;
}

function removeElement(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

function onScrollStop(callback) {
  if (!callback || typeof callback !== "function") return;

  let isScrolling;

  window.addEventListener(
    "scroll",
    (event) => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 30);
    },
    false
  );
}

function toggleRef(refs, idx) {
  let matchRef;

  for (const ref of refs) {
    if (ref.id === refs[idx].id) {
      matchRef = ref;
    } else {
      ref.classList.remove("button");
      ref.classList.add("button-transparent");
    }
  }

  matchRef.classList.remove("button-transparent");
  matchRef.classList.add("button");
}

function setBarFocus(sections, refs) {
  const scroll = window.scrollY - (window.innerHeight / 3);
  let heightSum = 0;
  let heights = Array.from(sections)
    .map((item) => heightSum += item.offsetHeight);

  for (const idx in heights) {
    if (scroll <= heights[idx] && scroll > (heights[idx + 1] || 0)) {
      toggleRef(refs, idx);
      return;
    } else if (scroll < heights[idx]) {
      toggleRef(refs, 0);
      return;
    } else if (scroll > heights[idx]) {
      toggleRef(refs, refs.length - 1);
    }
  }
}

onload = () => {
  year.innerText = new Date().getFullYear().toString();
  
  if (window.innerWidth <= 970) {
    setScrollMargin(
      "sections-style",
      aside.offsetHeight,
      head
    );
  }
}

onScrollStop(() => {
  setBarFocus(sections.children, aside.children);
});

onresize = () => {
  if (window.innerWidth <= 970) {
    setScrollMargin(
      "sections-style",
      aside.offsetHeight,
      head
    );
  } else {
    removeElement("sections-style");
  }
};
