interface IComponent {
    root: HTMLElement;

    init(): void;
}

export abstract class BaseComponent implements IComponent {
    root: HTMLElement;

    constructor(root: HTMLElement) {
        this.root = root;
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