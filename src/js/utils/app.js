import {} from "../axios.min.js";

export class App {
  constructor(appDom, appStorage) {
    this.cachePages = new Map();
    this.defaultPage = "about";
    this.appDom = appDom;
    this.appStorage = appStorage;
  }

  async init() {
    location.href = `#${this.defaultPage}`;
    await this.loadPage(this.defaultPage);
    await this.appStorage.fetchData();

    window.addEventListener("hashchange", async (e) => {
      const url = new URL(e.newURL);
      const hash = url.hash.replace("#", "");
      if (hash) {
        await this.loadPage(hash);
      }
    });
  }

  async loadPage(page) {
    if (this.cachePages.has(page)) {
      const cachedPage = this.cachePages.get(page);
      this.appDom.updateContent(cachedPage.html);
      try {
        if (cachedPage.script) {
          this.appDom.executeScript(cachedPage.script, page);
        }
      } catch (error) {
        console.error(
          "Une erreur est survenue lors de l'exécution du script:",
          error
        );
      }
      return;
    }

    const htmlResponse = await axios
      .get(`src/pages/${page}.html`)
      .catch(() => null);
    const scriptResponse = await axios
      .get(`src/js/pages/${page}.js`)
      .catch(() => null);

    if (!htmlResponse) {
      location.href = "#404";
      return;
    }

    if (htmlResponse.status === 200) {
      const scriptContent = scriptResponse?.data || null;
      this.cachePages.set(page, {
        html: htmlResponse.data,
        script: scriptContent,
      });
      this.appDom.updateContent(htmlResponse.data);
      try {
        if (scriptContent) {
          this.appDom.executeScript(scriptContent, page);
        }
      } catch (error) {
        console.error(
          "Une erreur est survenue lors de l'exécution du script:",
          error
        );
      }
    }
  }
}
