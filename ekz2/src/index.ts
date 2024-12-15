import { App } from './components/app/app';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App(document.querySelector('#appContainer')!);
    app.init();
});