import { ItemType } from '../../mocks/types';
import './Item.css';

function Item({ data }: { data?: ItemType }) {
    let style = {};
    if (data) {
        style = { '--width': data.layout[0].length, '--height': data.layout.length, '--imageUrl': `url('${data.image}')` } as React.CSSProperties;
    }
    return <div className={`grid__cell ${data ? `grid__cell--rarity-${data.rarity} grid__cell--origin` : ''}`} style={style}></div>
}

export default Item;