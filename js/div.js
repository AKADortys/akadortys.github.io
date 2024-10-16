const closeButton_div = document.querySelectorAll(".close_section_btn");
const closeButton_info = document.querySelector("#close_info_section");
let infoIsOpen = false;

closeButton_div.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    e.target.parentNode.style.display = "none";
  }); // Ajout d'un écouteur d'événement sur le bouton pour quand il est cliqué, la section parent sera cachée.
});

closeButton_info.addEventListener("click", function () {
  if (!infoIsOpen){
    document.querySelector("#infoPerso").style.transform = "translateX(0)";
    closeButton_info.innerHTML="X";
    closeButton_info.style.backgroundColor = "red";
    infoIsOpen = true;
  }
  else{
    document.querySelector("#infoPerso").style.transform = "translateX(95%)";
    closeButton_info.innerHTML="?";
    closeButton_info.style.backgroundColor = "";
    infoIsOpen = false;
  }
});


