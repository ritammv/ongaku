import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import ForLater from './components/ForLater/ForLater';
import Finalcreatepost from './components/CreatePost/FinalCreatePost/FinalCreatePost';
import Channel from './components/Channel/Channel';
import Dashboard from './components/Dashboard/Dashboard';
import Discover from './components/Discover/Discover';
import Home from './components/Home/Home';
import Authenticated from './components/Authenticated/Authenticated';
import Postcard from './components/PostCard/Postcard';
import { CheckAuthenticateAndPopulate } from './helpers/checkAuthenticateAndPopulate';
import DetailsPage from './components/ShowDetails/DetailsPage';

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
      <Route exact path="/later" component={ForLater} />
      <Route
        exact
        path="/details/:type/:route"
        render={(routeProps) => (
          <DetailsPage type={routeProps.match.params.type} route={routeProps.match.params.route} />
        )}
      />
      <Route
        exact
        path="/channels/:name"
        component={Channel}
      />
    </Switch>
  );
};

export default App;
