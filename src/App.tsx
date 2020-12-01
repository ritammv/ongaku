import React from 'react';
import './styles/App.scss';
<<<<<<< HEAD
import { Route, Switch } from 'react-router-dom';
import Createpost from './components/CreatePost/createPost';


const App: React.FC = () =>  {

  return (

    <Switch>
      <Route
        path='/create'
        component={Createpost}
      />
    </Switch>

=======
// import Home from './components/Home/Home';
import Login from './components/Login/Login';

const App: React.FC = () => {
  return (
    <Login />
>>>>>>> feat/landing-page
  );
};

export default App;
