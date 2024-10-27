const list = document.querySelector("#list");
const sections = document.querySelectorAll(".Content");
const aside = document.querySelector("aside");
const loger = document.getElementById("loger");
let asideIsOpen = false;

sections.forEach((section) => {
  section.dataset.initialDisplay = section.style.display|| 'none';
});

function ResetProgressBar() {
  const progressBars = document.querySelectorAll('.progress');
  progressBars.forEach((progressBar) => {
    progressBar.classList.remove("progress-active"); // Réinitialise la classe
    progressBar.style.width = "0"; // Réinitialise la largeur
  });
}

CacherSections();
function CacherSections() {
  sections.forEach((section) => {
    section.style.display = section.dataset.initialDisplay;
    section.classList.remove("section-visible");
    section.classList.add("section-hidden");

    Array.from(section.children).forEach((child) => {
      child.classList.remove("child-visible");
      child.classList.add("child-hidden");
    });
  });
  ResetProgressBar();
}

aside.addEventListener("click", function () {
  if (!asideIsOpen) {
    asideIsOpen = true;
    aside.classList.add("aside-open");
    aside.classList.remove("aside-closed");
    aside.querySelector("ul").style.display = "block";
    setTimeout(() => {
      loger.style.display = "none";
    });
  } else {
    asideIsOpen = false;
    aside.classList.remove("aside-open");
    aside.classList.add("aside-closed");
    aside.querySelector("ul").style.display = "none";
    setTimeout(() => {
      loger.style.display = "block";
    }, 300);
  }
});

Array.from(list.children).forEach((child) => {
  child.addEventListener("mouseover", function () {
    child.classList.add("list-item-hover");
  });

  child.addEventListener("mouseout", function () {
    child.classList.remove("list-item-hover");
  });

  child.addEventListener("click", function () {
    const id = this.getAttribute("data-section");
    const currentSection = document.getElementById(id);

    CacherSections();

    currentSection.style.display = "flex";
    setTimeout(() => {
      currentSection.classList.remove("section-hidden");
      currentSection.classList.add("section-visible");

      setTimeout(() => {
        const children = Array.from(currentSection.children);
        children.forEach(function (child, index) {
          setTimeout(() => {
            child.classList.remove("child-hidden");
            child.classList.add("child-visible");

            const progressBars = currentSection.querySelectorAll('.progress');
            progressBars.forEach(function (progressBar) {
              const progressValue = progressBar.getAttribute("data-progress");
              setTimeout(() => {
                progressBar.classList.add("progress-active");
                progressBar.style.width = progressValue + "%";
              }, 400);
            });

          }, 50);
        });
      }, 100);
    }, 0);
  });
});
