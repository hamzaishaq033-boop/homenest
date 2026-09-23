document.addEventListener("DOMContentLoaded", function () {

  // Remove accidental markdown code-fence text
  document.body.childNodes.forEach(function (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent.trim().toLowerCase();

      if (
        text === "html" ||
        text === "```html" ||
        text === "```"
      ) {
        node.remove();
      }
    }
  });

  // Remove code-fence text appearing inside normal elements
  document.querySelectorAll("body *").forEach(function (element) {
    element.childNodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const cleaned = node.textContent
          .replace(/```html/gi, "")
          .replace(/```/g, "");

        if (cleaned !== node.textContent) {
          node.textContent = cleaned;
        }
      }
    });
  });

  // Update footer year
  document.querySelectorAll("#year, [data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

});
