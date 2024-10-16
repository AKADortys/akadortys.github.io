const list = document.querySelector("#list");
const sections = document.querySelectorAll(".Content");
const aside = document.querySelector("aside");
const main = document.getElementsByTagName("main")[0];
const loger = document.getElementById("loger");
let asideIsOpen = false;
let currentIndex = 0;
// Sauvegarde des styles initiaux des sections
sections.forEach((section) => {
  section.dataset.initialDisplay = section.style.display || "none"; // Sauvegarde l'état de display par défaut
  section.dataset.initialWidth = section.style.width || "1%"; // Sauvegarde la largeur initiale
  section.dataset.initialHeight = section.style.height || "1%"; // Sauvegarde la largeur initiale
  section.dataset.initialOpacity = section.style.opacity || "1"; // Sauvegarde l'opacité initiale
});

function ResetProgressBar(){
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach((progressBar) => {
    progressBar.style.width = "0";
  })
}


CacherSections();
function CacherSections() {
  sections.forEach((section) => {
    section.style.display = section.dataset.initialDisplay; // Cache la section
    section.style.width = "1%"; // Réinitialise la largeur à 1%
    section.style.height = "1%"; // Réinitialise la hauteur à 1%
    Array.from(section.children).forEach((child) => {
      child.style.opacity = "0"; // Réinitialise l'opacité à 0
      child.style.display = "none"; // Cache les éléments enfants
    });
  });
  ResetProgressBar();
}

// Survol de l'aside pour agrandir sa largeur
aside.addEventListener("click", function () {
  if (!asideIsOpen){
    asideIsOpen = true;
    aside.style.width = "25vw";
    aside.querySelector("ul").style.display = "block"; // Afficher la liste
    setTimeout(() => {
      document.getElementById("loger").style.display = "none";      
    });
  }else{
    asideIsOpen = false;
    aside.style.width = "2vw";
    aside.querySelector("ul").style.display = "none"; // Masquer la liste
    setTimeout(() => {
      document.getElementById("loger").style.display = "block";
    }, 300);
  }
});

// Boucle sur les éléments enfants de la liste pour gérer les événements
Array.from(list.children).forEach((child) => {
  child.addEventListener("mouseover", function () {
    child.style.color = "black";
    child.style.cursor = "pointer"; // Change le curseur sur l'élément pour le rendre cliquable
    child.style.backgroundColor = "white"; // Change la couleur de fond au survol
    child.style.left = "3px";
    child.style.borderLeft = "5px solid black";
  });

  child.addEventListener("mouseout", function () {
    child.style.color = "";
    child.style.cursor = ""; // Réinitialise le curseur
    child.style.backgroundColor = ""; // Réinitialise la couleur de fond
    child.style.position = "";
    child.style.left = ""; // Réinitialise la position de l'élément
    child.style.borderLeft = "";
  });

// Supposons que "child" soit un élément unique de la liste
child.addEventListener("click", function () {
  const id = this.getAttribute("data-section"); // Utilisation correcte de `this`
  const currentSection = document.getElementById(id);

  CacherSections(); // Cache toutes les sections et réinitialise leur contenu

  // Affiche la section actuelle
  currentSection.style.display = "flex";

  // Délai pour l'apparition des enfants
  setTimeout(() => {
    currentSection.style.width = "90%";
    currentSection.style.height = "90%";

    // Délai de 0.5s pour afficher le contenu
    setTimeout(() => {
      const children = Array.from(currentSection.children);
      children.forEach(function (child, index) {
        // Appliquer un délai progressif à chaque élément enfant
        setTimeout(() => {
          child.style.display = "block"; // Affiche d'abord les éléments enfants
          setTimeout(() => {
            child.style.opacity = "1"; // Applique ensuite l'opacité après un autre délai

// Rechercher toutes les barres de progression dans la section
const progressBars = currentSection.querySelectorAll('.progress');
progressBars.forEach(function (progressBar) {
  const progressValue = progressBar.getAttribute("data-progress");
  // Utiliser une animation différée pour bien initier la transition
  setTimeout(() => {
    progressBar.style.width = progressValue + "%"; // Augmenter la largeur selon la valeur de data-progress
  }, 400); // Petit délai avant de commencer l'animation pour que le changement soit visible
});

          }, 50); // Petit délai pour une transition fluide
        }, index * 50); // Décalage de 300ms entre l'apparition de chaque enfant
      });
    }, 100); // Délai avant l'affichage du contenu
  }, 0); // Applique la nouvelle largeur immédiatement
});
});