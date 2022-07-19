import './App.css';
import MRouter from './router/index'
import { BrowserRouter } from 'react-router-dom'
import TabBar from './components/TabBar'

function App() {
  return (
   <BrowserRouter>
     <MRouter></MRouter>

     {/* 选项卡 */}
     <TabBar/>
   </BrowserRouter>
  );
}

export default App;
