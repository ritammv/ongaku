import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import Createpost from './components/CreatePost/createPost';
import Dashboard from './components/Dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/create" component={Createpost} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default App;
