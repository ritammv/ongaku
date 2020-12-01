import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import Createpost from './components/CreatePost/createPost';
import Discover from './components/Discover/Discover';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Redux from './components/Redux/Redux';

const App: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/create" component={Createpost} />
      <Route exact path="/discover" component={Discover} />
      <Route exact path="/redux" component={Redux} />
    </Switch>
  );
};

export default App;
