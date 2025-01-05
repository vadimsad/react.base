import { ItemType } from "../mocks/types";

export function validateInventory(inventory: ItemType[], gridSize: number) {
    const unavaliablePositions = new Set();

    for (const item of inventory) {
        const position = item.position.join(',');
        const layoutPositions = getLayoutPositions(item.layout, item.position as [number, number]);
        // на одной клетке может быть только один элемент
        if (layoutPositions.some(pos => unavaliablePositions.has(pos))) {
            const errorText = `Invalid inventory: position ${position} is already taken`;
            alert(errorText);
            return false;
        }
        if (!isRectangularLayout(item.layout)) {
            const errorText = `Invalid inventory: layout of item ${item.name} (id: ${item.id}) is not rectangular`;
            alert(errorText);
            return false;
        }
        if (!isWithinBounds(item.layout, item.position, gridSize)) {
            const errorText = `Invalid inventory: position of item ${item.name} (id: ${item.id}) is out of bounds`;
            alert(errorText);
            return false;
        }
    
        getLayoutPositions(item.layout, item.position as [number, number]).forEach(pos => {
            unavaliablePositions.add(pos);
        });
    }

    return true;
}

function getLayoutPositions(layout: number[][], position: [number, number]) {
    return layout.flatMap((row, rowInd) => {
        return row.map((_, colInd) => {
            return `${rowInd + position[0]},${colInd + position[1]}`;
        })
    })
};

function isRectangularLayout(layout: number[][]) {
    const rowCount = layout.length;

    if (rowCount === 0) return false;

    const columnCount = layout[0].length;

    for (let i = 0; i < rowCount; i++) {
        if (layout[i].length !== columnCount) {
            return false; // Не прямоугольная раскладка
        }
        
        if (layout[i].includes(0)) {
            return false; // Не прямоугольная раскладка
        }
    }

    return true;
}

function isWithinBounds(layout: number[][], position: [number, number], gridSize: number) {
    const layoutPositions = getLayoutPositions(layout, position).map(pos => pos.split(',').map(Number));
    return layoutPositions.every(pos => pos[0] >= 0 && pos[0] <= gridSize - 1 && pos[1] >= 0 && pos[1] <= gridSize - 1);
}
