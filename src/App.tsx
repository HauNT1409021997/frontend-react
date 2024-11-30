import './App.css';
import UserComponent from "./component/User/UserComponent.tsx";
import {BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserDetail from "./component/User/UserDetail/UserDetail.tsx";


function App() {
  return (
      <BrowserRouter>
          <div className="App">
              <Routes>
                  <Route path="/edit-user-info" element={<UserDetail/>}/>
                  <Route path="/" element={<UserComponent/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
