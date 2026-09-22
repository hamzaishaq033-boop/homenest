function toggleMenu() {

  const nav = document.getElementById("nav");

  nav.classList.toggle("open");

}


function subscribe(event) {

  event.preventDefault();

  const email =
    document.getElementById("email");

  alert(
    "Thanks for subscribing!"
  );

  email.value = "";

}
