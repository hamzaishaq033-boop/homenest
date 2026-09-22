document.addEventListener("DOMContentLoaded", function () {

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  const links = document.querySelectorAll("a[href]");

  links.forEach(function (link) {
    const href = link.getAttribute("href");

    if (
      href &&
      (href.startsWith("http://") || href.startsWith("https://")) &&
      !href.includes(window.location.hostname)
    ) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

});
