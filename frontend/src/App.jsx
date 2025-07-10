/*import {Home} from "./pages/home/home";

const App = () => {
  return <Home />;
}

export default App;
*/
import { BrowserRouter } from 'react-router-dom'
import { Approutes } from './routes'
import './App.css'

const App = () => {
  return (
    
    
      <BrowserRouter>
        <Approutes />

      </BrowserRouter>

  )
}

export { App }

