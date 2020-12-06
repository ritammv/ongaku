import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import Finalcreatepost from './components/CreatePost/FinalCreatePost/FinalCreatePost';
import Channel from './components/Channel/Channel';

import Dashboard from './components/Dashboard/Dashboard';
import Discover from './components/Discover/Discover';
import Home from './components/Home/Home';
import Authenticated from './components/Authenticated/Authenticated';
import Postcard from './components/PostCard/Postcard';
import { CheckAuthenticateAndPopulate } from './helpers/checkAuthenticateAndPopulate';


const App: React.FC = () => {
  CheckAuthenticateAndPopulate();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/authenticated" component={Authenticated} />
      <Route exact path="/discover" component={Discover} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/post" component={Postcard} />
      <Route exact path="/create" component={Finalcreatepost} />
      <Route
        exact
        path="/channels/:name"
        render={(routeProps) => <Channel name={routeProps.match.params.name} />}
      />
    </Switch>
  );
};

export default App;
