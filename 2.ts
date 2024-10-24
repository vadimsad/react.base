interface Car {
    model: string;
    price: number;
    color: string;
    manufactureDate: Date;
    isAutomatic: boolean;

    engine: Engine;
    transmission: Transmission;
    brakingSystem: BrakingSystem;
    electricSystem: ElectricSystem;
    safetySystem: SafetySystem;
}

interface Engine {
    type: string;
    power: number;
    volume: number;
    isEngineRunning: boolean;
    fuelType: FuelType;

    start(): void;
    accelerate(): void;
    stop(): void;
}

interface Transmission {
    type: string;
    gears: number;
    currentGear: number;

    shiftUp(): void;
    shiftDown(): void;
}

interface BrakingSystem {
    type: string;
    isBrakesApplied: boolean;

    applyBrakes(): void;
    releaseBrakes(): void;
}

interface ElectricSystem {
    batteryLevel?: number;
    currentElectricalLoad: number;

    start(): void;
    stop(): void;
    activateHeadlights(on: boolean): void;
}

interface SafetySystem {
    isLocked: boolean;

    lockCar(): void;
    unlockCar(): void;
}

enum FuelType {
    GASOLINE,
    DIESEL,
    ETHANOL,
    HYDROGEN
}

const myCar: Car = {
    model: "Toyota Camry",
    price: 30000,
    color: "Black",
    manufactureDate: new Date(2022, 0, 1),
    isAutomatic: true,

    engine: {
        type: "V6",
        power: 301,
        volume: 3.5,
        isEngineRunning: false,
        fuelType: FuelType.GASOLINE,

        start() {
            this.isEngineRunning = true;
            console.log("Engine started.");
        },
        accelerate() {
            console.log("Accelerating...");
        },
        stop() {
            this.isEngineRunning = false;
            console.log("Engine stopped.");
        }
    },

    transmission: {
        type: "Automatic",
        gears: 8,
        currentGear: 1,

        shiftUp() {
            if (this.currentGear < this.gears) {
                this.currentGear++;
                console.log(`Shifted up to gear ${this.currentGear}.`);
            }
        },
        shiftDown() {
            if (this.currentGear > 1) {
                this.currentGear--;
                console.log(`Shifted down to gear ${this.currentGear}.`);
            }
        }
    },

    brakingSystem: {
        type: "Disc",
        isBrakesApplied: false,

        applyBrakes() {
            this.isBrakesApplied = true;
            console.log("Brakes applied.");
        },
        releaseBrakes() {
            this.isBrakesApplied = false;
            console.log("Brakes released.");
        }
    },

    electricSystem: {
        batteryLevel: 100,
        currentElectricalLoad: 500,

        start() {
            console.log("Electric system: starting...");
        },
        stop() {
            console.log("Electric system: stopping...");
        },
        activateHeadlights(on: boolean) {
            console.log(`Headlights ${on ? "on" : "off"}.`);
        }
    },

    safetySystem: {
        isLocked: false,

        lockCar() {
            this.isLocked = true;
            console.log("Car locked.");
        },
        unlockCar() {
            this.isLocked = false;
            console.log("Car unlocked.");
        }
    }
};

// Пример использования
myCar.electricSystem.start();
myCar.engine.start();
myCar.electricSystem.activateHeadlights(true);
myCar.safetySystem.lockCar();
myCar.transmission.shiftUp();
myCar.engine.accelerate();
myCar.brakingSystem.applyBrakes();
myCar.electricSystem.activateHeadlights(false);
myCar.engine.stop();
myCar.electricSystem.stop();
myCar.safetySystem.unlockCar();