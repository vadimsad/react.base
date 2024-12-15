import { View } from "./shared/view/view";
import { ViewTemplate } from "./shared/view/viewTemplate";

interface IComponent {
    view: View;

    init(): void;
}

export abstract class BaseComponent implements IComponent {
    view: View;

    constructor(element: string) {
        this.view = new ViewTemplate(element).cloneView();
        
        Object.defineProperty(this, 'view', { enumerable: false });
    }

    init(...args: unknown[]) {}
}

export class EventEmitter<T> {
    listeners: { [eventName: string]: Array<(arg?: T, additionalData?: unknown) => void> } = {};

    subscribe(eventName: string, listener: (arg?: T, additionalData?: unknown) => void) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(listener);
    }

    unsubscribe(eventName: string, listener: (arg: T) => void) {
        if (!this.listeners[eventName]) {
            return;
        }
        this.listeners[eventName] = this.listeners[eventName].filter(l => l !== listener);
    }

    emit(eventName: string, arg?: T, additionalData?: unknown) {
        if (!this.listeners[eventName]) {
            return;
        }
        this.listeners[eventName].forEach(listener => listener(arg, additionalData));
    }
}

export function capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
}

export function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}