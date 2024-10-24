class OrderManager {
    orders: Order[];

    constructor() {
        this.orders = [];
    }

    createOrder(cart: Cart) {
        const order = new Order(cart);
        cart.clear();
        this.orders.push(order);
        console.log('Order created');
        return order.id;
    }

    payOrders(orderIds: number[]) {
        this.orders.forEach(order => {
            if (orderIds.includes(order.id)) {
                order.pay();
            }
        })
    }

    cancelOrders(orderIds: number[]) {
        this.orders.forEach(order => {
            if (orderIds.includes(order.id)) {
                order.cancel();
            }
        })
    }
}

class ProductManager {
    products: Product[];

    constructor() {
        this.products = [];
    }

    createProduct(id:number, name: string, price: number) {
        const product = new Product(id, name, price);
        this.products.push(product);
        console.log('Product created', product);
        return product;
    }

    updateProduct(productId: number, name: string, price: number) {
        return this.products.find(product => product.id === productId)?.update(name, price);
    }
}

class Order {
    id: number;
    products: Product[];
    status: OrderStatus;

    constructor(cart: Cart) {
        this.id = Math.floor(Math.random() * 1000);
        this.products = cart.products;
        this.status = OrderStatus.Created;
    }

    pay() {
        this.status = OrderStatus.Paid;
        console.log('Order paid');
    }

    cancel() {
        this.status = OrderStatus.Cancelled;
        console.log('Order cancelled');
    }
}

class Product {
    id: number;
    name: string;
    price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    update(name: string, price: number) {
        this.name = name;
        this.price = price;
        console.log('Product updated');
    }
}

class Cart {
    private _products: Product[];

    constructor(products: Product[]) {
        this._products = products;
    }

    addProduct(product: Product) {
        this.products.push(product);
        console.log('Product added to cart');
    }

    removeProduct(productId: number) {
        this._products = this.products.filter(product => product.id !== productId);
        console.log('Product removed from cart');
    }

    getProductByProp(prop: keyof Product, value: any) {
        return this.products.find(product => product[prop] === value);
    }

    clear() {
        this._products = [];
        console.log('Cart cleared');
    }

    get products() {
        return this._products;
    }
}

enum OrderStatus {
    Created,
    Paid,
    Cancelled
}

const productManager = new ProductManager();
const orderManager = new OrderManager();

const tea = productManager.createProduct(1, 'Tea', 10);
const milk = productManager.createProduct(2, 'Milk', 20);
const bread = productManager.createProduct(3, 'Bread', 5);

const cart = new Cart([tea, milk, bread]); // 'Tea', 'Milk', 'Bread'

const mask = productManager.createProduct(4, 'Mask', 100);
cart.addProduct(mask);

console.log(cart.products); // 'Tea', 'Milk', 'Bread', 'Mask'
console.log(cart.getProductByProp('id', 4));
cart.removeProduct(3);
console.log(cart.products); // 'Tea', 'Milk', 'Mask'

const firstOrderId = orderManager.createOrder(cart);
orderManager.payOrders([firstOrderId]);

console.log(cart.products); // []
cart.addProduct(bread);
console.log(cart.products); // 'Bread'

const secondOrderId = orderManager.createOrder(cart);
orderManager.cancelOrders([secondOrderId]);

console.log(orderManager.orders);