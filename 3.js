var DebitAccount = /** @class */ (function () {
    function DebitAccount(id, currency) {
        this.isDebit = true;
        this._balance = 0;
        this.id = id;
        this.currency = currency;
    }
    DebitAccount.prototype.withdraw = function (amount) {
        if (amount > this._balance) {
            console.log('Insufficient funds');
            return;
        }
        this._balance -= amount;
        console.log('Successfully withdrawn: %j %s', amount, this.currency);
    };
    DebitAccount.prototype.deposit = function (amount) {
        this._balance += amount;
        console.log('Successfully deposited: %j %s', amount, this.currency);
    };
    Object.defineProperty(DebitAccount.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    return DebitAccount;
}());
var CreditAccount = /** @class */ (function () {
    function CreditAccount(id, currency, maxCreditAmount) {
        this.isDebit = false;
        this._balance = 0;
        this.id = id;
        this.currency = currency;
        this.maxCreditAmount = maxCreditAmount;
    }
    CreditAccount.prototype.withdraw = function (amount) {
        if (this._balance - amount < this.maxCreditAmount) {
            console.log('Insufficient funds');
            return;
        }
        this._balance -= amount;
        console.log('Successfully withdrawn: %j %s', amount, this.currency);
    };
    CreditAccount.prototype.deposit = function (amount) {
        this._balance += amount;
        console.log('Successfully deposited: %j %s', amount, this.currency);
    };
    Object.defineProperty(CreditAccount.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    return CreditAccount;
}());
var debitAccount = new DebitAccount(1, 'USD');
debitAccount.deposit(1000);
debitAccount.withdraw(2000);
debitAccount.withdraw(1000);
console.log(debitAccount.balance); // 0
var creditAccount = new CreditAccount(1, 'USD', -5000);
creditAccount.deposit(1000);
creditAccount.withdraw(2000);
creditAccount.withdraw(1000);
console.log(creditAccount.balance); // 0
