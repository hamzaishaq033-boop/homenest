document.addEventListener("DOMContentLoaded", function () {

  /* ================================
     1. REMOVE ACCIDENTAL CODE FENCES
     ================================ */

  const walker = document.createTreeWalker(
    document.documentElement,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  textNodes.forEach(function (node) {

    const parent = node.parentElement;

    if (!parent) return;

    const tag = parent.tagName;

    if (tag === "SCRIPT" || tag === "STYLE") {
      return;
    }

    let text = node.nodeValue || "";

    /* Remove markdown opening fence */
    text = text.replace(/```html/gi, "");

    /* Remove markdown closing fence */
    text = text.replace(/```/g, "");

    /* Remove standalone "html" accidentally shown at page top */
    if (
      text.trim().toLowerCase() === "html" &&
      (
        parent === document.body ||
        parent === document.documentElement
      )
    ) {
      node.remove();
      return;
    }

    node.nodeValue = text;

    if (node.nodeValue.trim() === "") {
      node.remove();
    }
  });


  /* ================================
     2. UPDATE FOOTER YEAR
     ================================ */

  const yearElements = document.querySelectorAll(
    "#year, [data-current-year]"
  );

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });


  /* ================================
     3. ARTICLE FEATURED IMAGES
     ================================ */

  const page = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  const articleImages = {

    "storage.html": {
      src: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized storage space in a home"
    },

    "bathroom.html": {
      src: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=85",
      alt: "Clean and organized bathroom"
    },

    "closet.html": {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized home storage and closet space"
    },

    "pantry.html": {
      src: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized kitchen pantry"
    },

    "cleaning.html": {
      src: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
      alt: "Home cleaning supplies and tools"
    },

    "bedroom.html": {
      src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized and comfortable bedroom"
    },

    "decor.html": {
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
      alt: "Stylish home interior decor"
    },

    "food-storage.html": {
      src: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1400&q=85",
      alt: "Kitchen food storage and organization"
    }

  };


  if (articleImages[page]) {

    const main = document.querySelector("main");

    if (main && !main.querySelector(".article-featured-image")) {

      const imageData = articleImages[page];

      const figure = document.createElement("figure");
      figure.className = "article-featured-image";

      figure.style.margin = "0 0 36px 0";
      figure.style.width = "100%";
      figure.style.overflow = "hidden";
      figure.style.borderRadius = "18px";

      const image = document.createElement("img");

      image.src = imageData.src;
      image.alt = imageData.alt;
      image.loading = "eager";
      image.decoding = "async";

      image.style.display = "block";
      image.style.width = "100%";
      image.style.height = "auto";
      image.style.maxHeight = "560px";
      image.style.objectFit = "cover";
      image.style.borderRadius = "18px";

      figure.appendChild(image);


      const heading = main.querySelector("h1");

      if (heading) {
        heading.insertAdjacentElement("afterend", figure);
      } else {
        main.insertBefore(figure, main.firstChild);
      }
    }
  }


  /* ================================
     4. BROKEN IMAGE FALLBACK
     ================================ */

  document.querySelectorAll("img").forEach(function (img) {

    img.addEventListener("error", function () {

      img.style.display = "none";

      const parent = img.parentElement;

      if (
        parent &&
        parent.classList.contains("article-featured-image")
      ) {
        parent.style.display = "none";
      }

    });

  });


  /* ================================
     5. EXTERNAL LINKS
     ================================ */

  document.querySelectorAll("a[href]").forEach(function (link) {

    const href = link.getAttribute("href");

    if (
      href &&
      (href.startsWith("http://") || href.startsWith("https://")) &&
      !href.includes("hamzaishaq033-boop.github.io")
    ) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }

  });

});
