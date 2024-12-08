import './style.css';
import { App } from "./app/app";

document.addEventListener('DOMContentLoaded', () => {
    const app = new App(document.querySelector('#app')!);
    app.init();
})