import './Grid.css';
import Item from '../Item/Item';
import { ItemType } from '../../mocks/types';
import { validateInventory } from '../../utils/validation';

const GRID_SIZE = 10;
const CELL_SIZE = 50;
const CELLS_ARRAY = new Array(GRID_SIZE).fill(null).map(() => new Array(GRID_SIZE).fill(null));

function Grid({ inv }: { inv: ItemType[] }) {
    const style = { '--cell-size': CELL_SIZE } as React.CSSProperties;

    if (!validateInventory(inv as ItemType[], GRID_SIZE)) {
        return 'Something went wrong...';
    }

    const inventoryItemsGroupedByPositions = inv.reduce((acc, curr) => {
        const position = curr.position.join(',');
        acc[position] = curr as ItemType;
        return acc;
    }, {} as {[key: string]: ItemType});

    return (
        <div className="grid" style={style}>
            {CELLS_ARRAY.map((row, rowInd) => {
                return (
                    <div key={rowInd} className="grid__row">
                        {row.map((_, colInd) => {
                            return <Item key={colInd} data={inventoryItemsGroupedByPositions[`${rowInd},${colInd}`]}/>
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Grid;