document.addEventListener("DOMContentLoaded", function () {

  const articlePages = {
    "article.html": {
      image: "https://images.unsplash.com/photo-1583845112203-454c84f5c6b6?auto=format&fit=crop&w=1400&q=85",
      alt: "Beautiful organized home interior"
    },

    "storage.html": {
      image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized storage space in a home"
    },

    "bathroom.html": {
      image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1400&q=85",
      alt: "Clean and organized bathroom"
    },

    "closet.html": {
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized bedroom and closet space"
    },

    "pantry.html": {
      image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized kitchen pantry"
    },

    "cleaning.html": {
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=85",
      alt: "Home cleaning supplies"
    },

    "bedroom.html": {
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
      alt: "Organized and comfortable bedroom"
    },

    "decor.html": {
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
      alt: "Stylish home interior decor"
    },

    "food-storage.html": {
      image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=1400&q=85",
      alt: "Kitchen food storage containers"
    }
  };

  const currentPage = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  if (!articlePages[currentPage]) {
    document.querySelectorAll("#year, [data-current-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
    return;
  }


  /* --------------------------------
     REMOVE ONLY VISIBLE CODE FENCES
     -------------------------------- */

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const textNodes = [];
  let currentNode;

  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  textNodes.forEach(function (textNode) {

    const parent = textNode.parentElement;

    if (!parent) return;

    if (
      parent.tagName === "SCRIPT" ||
      parent.tagName === "STYLE" ||
      parent.tagName === "NOSCRIPT"
    ) {
      return;
    }

    let text = textNode.nodeValue || "";

    text = text.replace(/```html/gi, "");
    text = text.replace(/```/g, "");

    textNode.nodeValue = text;
  });


  /* --------------------------------
     RESTORE / ADD ARTICLE MAIN IMAGE
     -------------------------------- */

  const main = document.querySelector("main");

  if (main) {

    const existingImage = main.querySelector(
      ".article-featured-image img"
    );

    if (existingImage) {

      existingImage.src = articlePages[currentPage].image;
      existingImage.alt = articlePages[currentPage].alt;

    } else {

      const figure = document.createElement("figure");

      figure.className = "article-featured-image";

      figure.style.width = "100%";
      figure.style.margin = "0 0 35px 0";
      figure.style.borderRadius = "18px";
      figure.style.overflow = "hidden";

      const image = document.createElement("img");

      image.src = articlePages[currentPage].image;
      image.alt = articlePages[currentPage].alt;
      image.loading = "eager";
      image.decoding = "async";

      image.style.display = "block";
      image.style.width = "100%";
      image.style.height = "auto";
      image.style.maxHeight = "560px";
      image.style.objectFit = "cover";
      image.style.borderRadius = "18px";

      figure.appendChild(image);

      const article =
        main.querySelector("article") || main;

      const heading = article.querySelector("h1");

      if (heading) {
        heading.insertAdjacentElement("afterend", figure);
      } else {
        article.insertBefore(figure, article.firstChild);
      }
    }
  }


  /* --------------------------------
     FOOTER YEAR
     -------------------------------- */

  document.querySelectorAll("#year, [data-current-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

});
