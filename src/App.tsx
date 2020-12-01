import React from 'react';
import './styles/App.scss';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Createpost from './components/CreatePost/createPost';
import Discover from './components/Discover/Discover';
import Home from './components/Home/Home';
import Login from './components/Login/Login';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/create" component={Createpost} />
      <Route exact path="/discover" component={Discover} />
    </Switch>
  );
};

export default App;
