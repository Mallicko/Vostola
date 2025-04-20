/* scripts.js – for fade-in animations and logo swap on scroll */

document.addEventListener("DOMContentLoaded", function() {
  // Fade-in animation for elements with .fade-in-start and .fade-in-element
  const fadeInParents = document.querySelectorAll(".fade-in-start");
  fadeInParents.forEach((parent, idx) => {
    setTimeout(() => {
      parent.classList.add("fade-in-visible");
      const children = parent.querySelectorAll(".fade-in-element");
      children.forEach((child, cidx) => {
        setTimeout(() => {
          child.classList.add("fade-in-visible");
        }, 200 * cidx);
      });
    }, 200 * idx);
  });
  
  // LOGO SWAP on scroll (if both logos are present)
  const logoLong = document.getElementById("logo-long");
  const logoShort = document.getElementById("logo-short");
  if (logoLong && logoShort) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        logoLong.classList.add("hide");
        logoShort.classList.add("show");
      } else {
        logoLong.classList.remove("hide");
        logoShort.classList.remove("show");
      }
    });
  }
});
