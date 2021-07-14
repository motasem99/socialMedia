import './App.css';
import 'antd/dist/antd.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Home from './pages/Home/Home.jsx';
import UserPage from './pages/UserPage/UserPage.jsx';

import NavBar from './components/NavBar/NavBar.jsx';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <div>
          <NavBar />
        </div>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/userPage' exact component={UserPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
