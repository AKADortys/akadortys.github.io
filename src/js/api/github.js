import {} from "../axios.min.js";

export class ApiRequest {
  constructor() {
    this.gitHubUrl = "https://api.github.com/users/AKADortys/repos";
  }

  async fetchRepos() {
    try {
      const response = await axios.get(this.gitHubUrl);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des repos :", error);
      return [];
    }
  }
}
