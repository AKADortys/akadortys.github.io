initModule = () => {
  const divElements = document.querySelectorAll("section>div>div");
  const skillsDetails = document.getElementById("skills-details");
  //gestion evenements click pour les cartes
  divElements.forEach((n, i) => {
    n.addEventListener("click", () => {
      skillsDetails.classList.remove("show");
      const data = n.getAttribute("data-section");
      app.appDom.displayDetails(data);
    });
    //animation lors de l'affichage
    setTimeout(
      () => {
        n.classList.add("show");
      },
      300 * (i / 2)
    );
  });
  app.appDom.displayDetails("mysql");
};
