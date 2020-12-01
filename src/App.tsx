import React from 'react';
import './styles/App.scss';
import { Route, Switch } from 'react-router-dom';
import Createpost from './components/CreatePost/createPost';
import Finalcreatepost from './components/CreatePost/FinalCreatePost';



const App: React.FC = () =>  {

  return (

    <Switch>
      <Route
        path='/search'
        component={Createpost}
      />
      <Route
        path='/create'
        component={Finalcreatepost}
      />
  
    </Switch>

  );
};

export default App;
