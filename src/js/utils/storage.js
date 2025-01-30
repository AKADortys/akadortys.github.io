import {} from "../dexie.min.js";
import { ApiRequest } from "../api/github.js";
import { rawData } from "../data/data.js";

export class AppStorage {
  constructor() {
    this.apiRequest = new ApiRequest();
    this.db = new Dexie("CVApp");
    this.db.version(1).stores({
      skills: "++id, name, title, description, tools, langagues, skills, lvl",
      repos: "++id, name, description, html_url, language",
    });
    this.db.open();
    this.skills = this.db.skills;
    this.repos = this.db.repos;
  }

  async fetchData() {
    try {
      console.log("Fetching data");
      const repos = await this.apiRequest.fetchRepos();
      const actualRepos = await this.getRepos();
      if (repos.length === actualRepos.length) {
        console.log("Data is up to date");
        return;
      }
      this.repos.bulkAdd(repos);
      const actualSkils = await this.getSkills();
      if (actualSkils.length === rawData.length) {
        console.log("Skills are up to date");
        return;
      }
      this.skills.bulkAdd(rawData);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  }

  async getSkills() {
    try {
      return await this.skills.toArray();
    } catch (error) {
      console.error("Erreur lors de la récupération des compétences :", error);
      return [];
    }
  }

  async getSkill(name) {
    try {
      return await this.skills.where("name").equals(name).first();
    } catch (error) {
      console.error("Erreur lors de la récupération de la compétence :", error);
      return null;
    }
  }

  async getRepos() {
    try {
      return await this.repos.toArray();
    } catch (error) {
      console.error("Erreur lors de la récupération des repos :", error);
      return [];
    }
  }
}
