import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import Finalcreatepost from './components/CreatePost/FinalCreatePost/FinalCreatePost';
import Channel from './components/Channel/Channel';
import Dashboard from './components/Dashboard/Dashboard';
import Discover from './components/Discover/Discover';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Redux from './components/Redux/Redux';
import Postcard from './components/PostCard/Postcard';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/search" component={Postcard} />
      <Route exact path="/create" component={Finalcreatepost} />
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/discover" component={Discover} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/redux" component={Redux} />
      <Route exact path="/channels/:name" component={Channel} />
    </Switch>
  );
};

export default App;
