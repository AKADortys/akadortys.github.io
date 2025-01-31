import { AppStorage } from "./storage.js";

export class AppDom {
  constructor() {
    this.contentElement = document.getElementById("content");
    this.appStorage = new AppStorage();
  }

  clearContent() {
    this.contentElement.innerHTML = "";
  }
  updateContent(html) {
    if (typeof html === "string") this.contentElement.innerHTML = html;
  }

  executeScript(scriptContent, page) {
    document
      .querySelectorAll(`[data-script="${page}"]`)
      .forEach((el) => el.remove());
    const scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    scriptElement.setAttribute("data-script", page);
    document.body.appendChild(scriptElement);

    if (typeof initModule === "function") {
      initModule();
    }
  }

  displayDetails = async (section) => {
    const skillsDetails = document.getElementById("skills-details");
    const skill = await this.appStorage.getSkill(section);
    console.log(skill);
    if (skill) {
      document.getElementById("skills-title").innerText = skill.title;
      document.getElementById("skills-description").innerText =
        skill.description;
      document.getElementById("skills-tools").innerText =
        skill.tools.join(", ");
      document.getElementById("skills-languages").innerText =
        skill.languages.join(", ");
      const list = document.getElementById("skills-list");
      list.innerHTML = "";
      skill.skills.forEach((skill) => {
        const listItem = document.createElement("li");
        listItem.innerText = skill;
        listItem.classList.add(
          "list-group-item-action",
          "list-group-item-dark",
          "list-group-item"
        );
        list.appendChild(listItem);
      });

      skillsDetails.classList.add("show");

      // Créer un graphique avec Chart.js
      this.createChart(skill.lvl);
    }
  };

  createChart = (level) => {
    const ctx = document.getElementById("skills-chart").getContext("2d");

    // Supprimer le graphique existant, si nécessaire
    if (window.skillChart) {
      window.skillChart.destroy();
    }

    // Créer un nouveau graphique
    window.skillChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Niveau actuel", "Reste à apprendre"],
        datasets: [
          {
            data: [level, 100 - level],
            backgroundColor: ["#4caf50", "#f44336"],
            hoverBackgroundColor: ["#66bb6a", "#ef5350"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  };

  displayProjet = async () => {
    const projetDetails = document.getElementById("projet-details");
    projetDetails.innerHTML = "";
    const projets = await this.appStorage.getRepos();
    projets.forEach((repo) => {
      const elDiv = document.createElement("div");
      elDiv.classList.add(
        "col-8",
        "bg-dark",
        "fade",
        "p-2",
        "mt-1",
        "rounded-2",
        "overflow-hidden",
        "shadow-lg",
        "square-container"
      );
      elDiv.innerHTML = `<h3 class="text-primary">${repo.name}</h3>
      <p class="text-white mb-2">${repo.description ? repo.description : "Aucune description"}</p>
      <span class="text-warning">Language utilisé: ${repo.language ? repo.language : "Aucuns laguages détecté"}</span>
      `;
      projetDetails.appendChild(elDiv);
      const elUrlDiv = document.createElement("div");
      elUrlDiv.classList.add("col-3", "text-center", "p-2", "fade");
      elUrlDiv.innerHTML = `<a class=" link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover p-2" href="${repo.html_url}" target="_blank">Lien ici!</a>`;
      projetDetails.appendChild(elUrlDiv);
    });
  };
}
