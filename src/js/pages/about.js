initModule = () => {
  const divElements = document.querySelectorAll("section > div");

  divElements.forEach((n, i) => {
    setTimeout(
      () => {
        n.classList.add("show");
      },
      300 * (i / 2)
    );
  });
};
