initModule = async () => {
  await app.appDom.displayProjet();

  const divElements = document.querySelectorAll("section>div>div>div");
  divElements.forEach((n, i) => {
    setTimeout(
      () => {
        n.classList.add("show");
      },
      300 * (i / 4)
    );
  });
};
