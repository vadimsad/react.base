interface Account {
    isDebit: boolean;
    currency: string;
    id: number;
    maxCreditAmount?: number;

    deposit(amount: number): void;
    withdraw(amount: number): void;

    get balance(): number;
}

class DebitAccount implements Account {
    readonly isDebit = true;
    readonly currency: string;
    readonly id: number;

    private _balance: number = 0;

    constructor(id: number, currency: string) {
        this.id = id;
        this.currency = currency;
    }

    withdraw(amount: number): void {
        if (amount > this._balance) {
            console.log('Insufficient funds');
            return;
        }
        this._balance -= amount;
        console.log('Successfully withdrawn: %j %s', amount, this.currency);
    }

    deposit(amount: number): void {
        this._balance += amount;
        console.log('Successfully deposited: %j %s', amount, this.currency);
    }

    get balance(): number {
        return this._balance;
    }
}

class CreditAccount implements Account {
    readonly isDebit = false;
    readonly currency: string;
    readonly id: number;
    readonly maxCreditAmount: number;

    private _balance: number = 0;

    constructor(id: number, currency: string, maxCreditAmount: number) {
        this.id = id;
        this.currency = currency;
        this.maxCreditAmount = maxCreditAmount;
    }

    withdraw(amount: number): void {
        if (this._balance - amount < this.maxCreditAmount) {
            console.log('Insufficient funds');
            return;
        }
        this._balance -= amount;
        console.log('Successfully withdrawn: %j %s', amount, this.currency);
    }

    deposit(amount: number): void {
        this._balance += amount;
        console.log('Successfully deposited: %j %s', amount, this.currency);
    }

    get balance(): number {
        return this._balance;
    }
}

const debitAccount = new DebitAccount(1, 'USD');
debitAccount.deposit(1000);
debitAccount.withdraw(2000); // Insufficient funds
debitAccount.withdraw(1000);
console.log(debitAccount.balance); // 0

const creditAccount = new CreditAccount(1, 'USD', -5000);
creditAccount.deposit(1000);
creditAccount.withdraw(2000);
creditAccount.withdraw(1000);
console.log(creditAccount.balance); // -2000