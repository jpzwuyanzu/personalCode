import './App.css';
import MRouter from './router/index'
import { BrowserRouter } from 'react-router-dom'
import TabBar from './components/TabBar'

function App() {
  return (
   <BrowserRouter>
   {/* 选项卡 */}
   <TabBar/>
     <MRouter></MRouter>

     
   </BrowserRouter>
  );
}

export default App;
