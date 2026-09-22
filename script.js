```javascript id="q3m8wa"
document.addEventListener("DOMContentLoaded", function () {
  // Keep the year in the footer automatically updated.
  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  // Add a small accessibility improvement to external links.
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
```
