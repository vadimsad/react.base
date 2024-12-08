class OrderManager {
    constructor() {
        this.orders = [];
    }
    createOrder(cart) {
        const order = new Order(cart);
        cart.clear();
        this.orders.push(order);
        console.log('Order created');
        return order.id;
    }
    payOrders(orderIds) {
        this.orders.forEach(order => {
            if (orderIds.includes(order.id)) {
                order.pay();
            }
        });
    }
    cancelOrders(orderIds) {
        this.orders.forEach(order => {
            if (orderIds.includes(order.id)) {
                order.cancel();
            }
        });
    }
}
class ProductManager {
    constructor() {
        this.products = [];
    }
    createProduct(id, name, price) {
        const product = new Product(id, name, price);
        this.products.push(product);
        console.log('Product created', product);
        return product;
    }
    updateProduct(productId, name, price) {
        var _a;
        return (_a = this.products.find(product => product.id === productId)) === null || _a === void 0 ? void 0 : _a.update(name, price);
    }
}
class Order {
    constructor(cart) {
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
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    update(name, price) {
        this.name = name;
        this.price = price;
        console.log('Product updated');
    }
}
class Cart {
    constructor(products) {
        this._products = products;
    }
    addProduct(product) {
        this.products.push(product);
        console.log('Product added to cart');
    }
    removeProduct(productId) {
        this._products = this.products.filter(product => product.id !== productId);
        console.log('Product removed from cart');
    }
    getProductByProp(prop, value) {
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
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Created"] = 0] = "Created";
    OrderStatus[OrderStatus["Paid"] = 1] = "Paid";
    OrderStatus[OrderStatus["Cancelled"] = 2] = "Cancelled";
})(OrderStatus || (OrderStatus = {}));
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
