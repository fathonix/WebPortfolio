"use strict";

const bg = document.getElementById("header-bg");
const header = document.getElementById("header-mini");
const things = document.getElementById("things");
const blog = document.getElementById("blog");
const aboutMe = document.getElementById("about-me");
const refThings = document.getElementById("ref-things");
const refBlog = document.getElementById("ref-blog");
const refAboutMe = document.getElementById("ref-about-me");
const year = document.getElementById("year");

const sectionH2Style = window.getComputedStyle(document.querySelector("section > h2"))

let bgHeight = bg.offsetHeight;
let headerHeight = header.offsetHeight;
let thingsHeight = bgHeight + things.offsetHeight;
let blogHeight = thingsHeight + blog.offsetHeight;
let aboutMeHeight = blogHeight + aboutMe.offsetHeight;
let topMargin = headerHeight + parseInt(sectionH2Style.marginBlockStart.replace('px', ''));

const style = document.createElement("style");

function onScrollStop(callback) {
  if (!callback || typeof callback !== "function") return;

  let isScrolling;

  window.addEventListener(
    "scroll",
    (event) => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        callback();
      }, 66);
    },
    false
  );
}

function toggleRef(el) {
  for (const item of [refThings, refBlog, refAboutMe]) {
    if (item !== el) {
      item.classList.remove("button");
      item.classList.add("button-transparent");
    } else {
      item.classList.remove("button-transparent");
      item.classList.add("button");
    }
  }
}

year.innerText = new Date().getFullYear().toString();

style.innerHTML = `.scroll { scroll-margin-top: ${topMargin}px !important; } `;
style.innerHTML += `.under-header { top: ${headerHeight}px !important; }`;
document.getElementsByTagName("head")[0].appendChild(style);
header.classList.remove("show");

onscroll = () => {
  if (window.scrollY >= bgHeight * 0.75) {
    header.classList.add("show");
  } else {
    header.classList.remove("show");
  }
};

onScrollStop(() => {
  if (window.scrollY <= thingsHeight) {
    toggleRef(refThings);
  } else if (window.scrollY <= blogHeight && window.scrollY > thingsHeight) {
    toggleRef(refBlog);
  } else if (window.scrollY > blogHeight) {
    toggleRef(refAboutMe);
  }
});

onresize = () => {
  bgHeight = bg.offsetHeight;
  headerHeight = header.offsetHeight;
  thingsHeight = bgHeight + things.offsetHeight;
  blogHeight = thingsHeight + blog.offsetHeight;
  aboutMeHeight = blogHeight + aboutMe.offsetHeight;
  topMargin = headerHeight + parseInt(sectionH2Style.marginBlockStart.replace('px', ''));

  style.innerHTML = `.scroll { scroll-margin-top: ${topMargin}px !important; } `;
  style.innerHTML += `.under-header { top: ${headerHeight}px !important; }`;
};
