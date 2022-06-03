import React, { Fragment , useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddExperience from './components/profile-form/AddExperience';
import AddEducation from './components/profile-form/AddEducation';


// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utills/setAuthToken';


import './App.css';


if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () =>
{

  useEffect(() =>
  {
    store.dispatch(loadUser());
  }, []);

  return (

    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" element={<Landing />} />
          </Switch>
          <section className='container'>
            <Switch>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <PrivateRoute exact path="/dashboard" element={<Dashboard />} />
              <PrivateRoute exact path="/create-profile" element={<CreateProfile />} />
              <PrivateRoute exact path="/edit-profile" element={<EditProfile />} />
              <PrivateRoute exact path="/add-experience" element={<AddExperience />} />
              <PrivateRoute exact path="/add-education" element={<AddEducation />} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  
  );
}

export default App;
