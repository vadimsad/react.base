export class View {
    public root: HTMLElement;
    [name: string]: any;
    
    constructor(root: HTMLElement) {
        this.root = root;
    }
}