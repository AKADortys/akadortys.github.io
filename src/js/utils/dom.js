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
        "col-lg-9",
        "col-sm-12",
        "fade",
        "p-2",
        "mt-3"
      );

      const topicsHtml = repo.topics
        ? repo.topics
          .map(
            (topic) =>
              `<span class="badge bg-secondary me-1">${topic}</span>`
          )
          .join("")
        : "";

      const updatedDate = new Date(repo.updated_at).toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      elDiv.innerHTML = `
        <div class="card h-100 bg-dark text-white shadow-lg border-secondary">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h3 class="card-title text-primary h5">${repo.name}</h3>
              <span class="badge bg-info text-dark">${repo.language || "N/A"
        }</span>
            </div>
            
            <p class="card-text flex-grow-1 text-light small">${repo.description || "Aucune description disponible."
        }</p>
            
            <div class="mb-3">
              ${topicsHtml}
            </div>

            <div class="d-flex justify-content-between align-items-center text-muted small mb-3">
              <div>
                <i class="bi bi-star-fill text-warning me-1"></i> ${repo.stargazers_count
        }
                <i class="bi bi-diagram-2-fill text-light ms-2 me-1"></i> ${repo.forks_count
        }
              </div>
              <div>
                Mis à jour le ${updatedDate}
              </div>
            </div>

            <div class="mt-auto d-flex gap-2">
              <a href="${repo.html_url
        }" target="_blank" class="btn btn-outline-primary btn-sm flex-grow-1">
                <i class="bi bi-github me-1"></i> Code
              </a>
              ${repo.homepage
          ? `<a href="${repo.homepage}" target="_blank" class="btn btn-outline-success btn-sm flex-grow-1">
                      <i class="bi bi-globe me-1"></i> Demo
                     </a>`
          : ""
        }
            </div>
          </div>
        </div>
      `;
      projetDetails.appendChild(elDiv);
    });
  };
}
