import React from 'react';
import './styles/App.scss';
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

  );
};

export default App;
