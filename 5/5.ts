type MyNode = {
    tag: string,
    attrs?: {[key: string]: string},
    children: MyNode[] | [string]
};

async function createDOMFromJSON(jsonPath: string) {
    let component: MyNode;
    try {
        component = await import(jsonPath);
    } catch {
        console.error('Unable to load component');
        return;
    }

    const root = createNode(component);
    const childrenStack: Array<{ parent: HTMLElement, children: MyNode[] | [string] }> = [];
    if (component.children) {
        childrenStack.push({ parent: root, children: component.children});
    }

    while (childrenStack.length) {
        const { parent, children } = childrenStack.pop() || {};

        if (children) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    parent?.append(document.createTextNode(child));
                } else {
                    const element = createNode(child);
                    parent?.append(element);
                    if (child.children) {
                        childrenStack.push({ parent: element, children: child.children });
                    }
                }
            });
        }
    }

    return root;
}

function createNode(node: MyNode) {
    const element = document.createElement(node.tag);
    if (node.attrs) {
        Object.entries(node.attrs).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    return element;
}

createDOMFromJSON('./component.json').then(console.log);
