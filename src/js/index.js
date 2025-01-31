import { App } from "./utils/app.js";
import { AppDom } from "./utils/dom.js";
import { AppStorage } from "./utils/storage.js";

const appDom = new AppDom();
const appStorage = new AppStorage();
const app = new App(appDom, appStorage);
app.init();

window.app = app;
