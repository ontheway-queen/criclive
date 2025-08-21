import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles/Header.css';
import '../src/Styles/Button.css';
import '../src/Styles/Login-Reg.css';
import '../src/Styles/Footer.css';
import '../src/Styles/Profile.css';
import '../src/Styles/VisitorProfile.css';
import '../src/Styles/EventList.css';
import { RouterProvider } from 'react-router-dom';
import { routers } from './Utils/Routers';

function App() {
  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
