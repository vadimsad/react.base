var FuelType;
(function (FuelType) {
    FuelType[FuelType["GASOLINE"] = 0] = "GASOLINE";
    FuelType[FuelType["DIESEL"] = 1] = "DIESEL";
    FuelType[FuelType["ETHANOL"] = 2] = "ETHANOL";
    FuelType[FuelType["HYDROGEN"] = 3] = "HYDROGEN";
})(FuelType || (FuelType = {}));
var myCar = {
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
        start: function () {
            this.isEngineRunning = true;
            console.log("Engine started.");
        },
        accelerate: function () {
            console.log("Accelerating...");
        },
        stop: function () {
            this.isEngineRunning = false;
            console.log("Engine stopped.");
        }
    },
    transmission: {
        type: "Automatic",
        gears: 8,
        currentGear: 1,
        shiftUp: function () {
            if (this.currentGear < this.gears) {
                this.currentGear++;
                console.log("Shifted up to gear ".concat(this.currentGear, "."));
            }
        },
        shiftDown: function () {
            if (this.currentGear > 1) {
                this.currentGear--;
                console.log("Shifted down to gear ".concat(this.currentGear, "."));
            }
        }
    },
    brakingSystem: {
        type: "Disc",
        isBrakesApplied: false,
        applyBrakes: function () {
            this.isBrakesApplied = true;
            console.log("Brakes applied.");
        },
        releaseBrakes: function () {
            this.isBrakesApplied = false;
            console.log("Brakes released.");
        }
    },
    electricSystem: {
        batteryLevel: 100,
        currentElectricalLoad: 500,
        start: function () {
            console.log("Electric system: starting...");
        },
        stop: function () {
            console.log("Electric system: stopping...");
        },
        activateHeadlights: function (on) {
            console.log("Headlights ".concat(on ? "on" : "off", "."));
        }
    },
    safetySystem: {
        isLocked: false,
        lockCar: function () {
            this.isLocked = true;
            console.log("Car locked.");
        },
        unlockCar: function () {
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
