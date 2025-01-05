import './App.css';
import Grid from '../Grid/Grid';
import { ItemType } from '../../mocks/types';
import inv_1 from '../../mocks/inv_1.json';
import inv_2 from '../../mocks/inv_2.json';
import inv_3 from '../../mocks/inv_3.json';

function App() {
  console.log(inv_1);
  console.log(inv_2);
  console.log(inv_3);
  return (
    <Grid inv={inv_2 as ItemType[]} />
  )
}

export default App
