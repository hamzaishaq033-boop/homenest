document.addEventListener("DOMContentLoaded", function () {

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /*
   * Remove accidental Markdown code fences such as
   * ```html and ``` that may have been pasted into pages.
   */
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }

  textNodes.forEach(function (node) {
    if (node.nodeValue.includes("```")) {
      node.nodeValue = node.nodeValue
        .replace(/```html/gi, "")
        .replace(/```/g, "");
    }
  });


  /*
   * Make sure every page has a visible Home link
   * inside its navigation.
   */
  document.querySelectorAll("nav").forEach(function (nav) {

    const links = Array.from(nav.querySelectorAll("a"));

    const hasHomeLink = links.some(function (link) {
      const text = link.textContent.trim().toLowerCase();
      const href = (link.getAttribute("href") || "").toLowerCase();

      return text === "home" ||
             href === "index.html" ||
             href === "./index.html" ||
             href.endsWith("/index.html");
    });

    if (!hasHomeLink) {
      const homeLink = document.createElement("a");
      homeLink.href = "index.html";
      homeLink.textContent = "Home";
      nav.insertBefore(homeLink, nav.firstChild);
    }
  });


  /*
   * Open external links in a new tab.
   */
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
