import './App.css';
import { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setName } from './features/user/userSlice.js';

import Login from './pages/Login/Login.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Home from './pages/Home/Home.jsx';

import NavBar from './components/NavBar/NavBar.jsx';

const App = () => {
  const user = useSelector((state) => state.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setName());
    console.log(user);
  }, [dispatch, user]);

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
        </Switch>
      </Router>
    </div>
  );
};

export default App;
