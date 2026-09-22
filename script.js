document.addEventListener("DOMContentLoaded", function () {

  /*
   * Remove accidental Markdown code fences that were pasted
   * into HTML files and are appearing as visible text.
   */
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function (node) {
        const parent = node.parentElement;

        if (!parent) {
          return NodeFilter.FILTER_REJECT;
        }

        const tag = parent.tagName;

        if (
          tag === "SCRIPT" ||
          tag === "STYLE" ||
          tag === "PRE" ||
          tag === "CODE" ||
          tag === "TEXTAREA"
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  textNodes.forEach(function (node) {

    let text = node.nodeValue;

    text = text.replace(/```html/gi, "");
    text = text.replace(/```/g, "");

    if (text !== node.nodeValue) {
      node.nodeValue = text;
    }

  });


  /*
   * Make sure every page has a Home link in the main navigation.
   */
  document.querySelectorAll("nav").forEach(function (nav) {

    const links = Array.from(nav.querySelectorAll("a"));

    const hasHome = links.some(function (link) {

      const text = link.textContent.trim().toLowerCase();
      const href = (link.getAttribute("href") || "").toLowerCase();

      return (
        text === "home" ||
        href === "index.html" ||
        href === "./index.html" ||
        href.endsWith("/index.html")
      );

    });


    if (!hasHome) {

      const homeLink = document.createElement("a");

      homeLink.href = "index.html";
      homeLink.textContent = "Home";

      nav.insertBefore(homeLink, nav.firstChild);

    }

  });


  /*
   * Make sure footer always contains all main navigation links.
   */
  document.querySelectorAll(".site-footer").forEach(function (footer) {

    let footerLinks =
      footer.querySelector(".footer-links") ||
      footer.querySelector(".footer-main");

    if (!footerLinks) {
      footerLinks = footer.querySelector(".footer-inner");

      if (!footerLinks) {
        footerLinks = footer.querySelector(".container");
      }
    }


    if (!footerLinks) {
      return;
    }


    const requiredLinks = [
      {
        name: "Home",
        href: "index.html"
      },
      {
        name: "About",
        href: "about.html"
      },
      {
        name: "Contact",
        href: "contact.html"
      },
      {
        name: "Privacy Policy",
        href: "privacy.html"
      },
      {
        name: "Terms of Use",
        href: "terms.html"
      }
    ];


    requiredLinks.forEach(function (item) {

      const exists = Array.from(
        footer.querySelectorAll("a[href]")
      ).some(function (link) {

        const href = (link.getAttribute("href") || "").toLowerCase();

        return href === item.href.toLowerCase();

      });


      if (!exists) {

        const link = document.createElement("a");

        link.href = item.href;
        link.textContent = item.name;

        let targetContainer =
          footer.querySelector(".footer-links") ||
          footer.querySelector(".footer-column");

        if (!targetContainer) {
          targetContainer = footerLinks;
        }

        targetContainer.appendChild(link);

      }

    });

  });


  /*
   * Add image fallback for broken remote images.
   */
  const fallbackImage =
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85";


  document.querySelectorAll("img").forEach(function (image) {

    image.addEventListener("error", function () {

      if (!image.dataset.fallbackUsed) {

        image.dataset.fallbackUsed = "true";
        image.src = fallbackImage;

      }

    });

  });


  /*
   * Automatically update footer year.
   */
  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /*
   * Open external links safely in a new tab.
   */
  document.querySelectorAll("a[href]").forEach(function (link) {

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
