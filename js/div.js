const closeButton_div = document.querySelectorAll(".close_section_btn");

closeButton_div.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.target.parentNode.style.display = "none";
  }); // Ajout d'un écouteur d'événement sur le bouton pour quand il est cliqué, la section parent sera cachée.
});
