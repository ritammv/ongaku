import React from 'react';
import './Redux.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { setAuthentication, setChannel, setIsLoading, setUser } from '../../store/actionCreators';

const Redux: React.FC = () => {

  // const currStateUser = useSelector((state: State) => state.user);
  const currStateLoading = useSelector((state: State) => state.isLoading);
  // const currStateChannel = useSelector((state: State) => state.channel);
  const currStateAuth = useSelector((state: State) => state.authentication);
  const dispatch: Dispatch = useDispatch();

  const handleClick = () => {
    // const user: User = {
    //   id: 3,
    //   username: 'eliiiii',
    //   resourceUrl: 'www.ongaku.com',
    //   token: 'this is my token',
    //   tokenSecret: 'secret',
    //   createdAt: '1994',
    //   updatedAt: '2020',
    //   channels: ['techno']
    // };
    // setUser(user)(dispatch);
  };

  const handleClickLoading = () => {
    setIsLoading(!currStateLoading)(dispatch);
  };

  const handleClickChannel = () => {
    const channel: Channel =     {
      'id': 'ef420411-97de-4fc8-9cf7-cfd5e3effd5e',
      'name': 'Electronic',
      'ownerId': null,
      'private': false,
      'parentId': null
    };
    setChannel(channel)(dispatch);
  };
  
  const handleClickAuth = () => {
    setAuthentication(!currStateAuth)(dispatch);
  };

  return (
    <div className="container-full">
      <button type="button" className="redux_button" onClick={handleClick}>
        Set User
      </button>
      {/* <div className="render_state">
        {
          Object.values(currStateUser)
            .map((value) => <h1 key={value}>{value}</h1>)
        }
      </div> */}
      <button type="button" className="redux_button" onClick={handleClickLoading}>
        Set Loading
      </button>
      <div className="render_state">
        {`${currStateLoading ? 'TRUE' : 'FALSE'}`}
      </div>
      <button type="button" className="redux_button" onClick={handleClickChannel}>
        Set Channel
      </button>
      {/* <div className="render_state">
        {currStateChannel}
      </div> */}
      <button type="button" className="redux_button" onClick={handleClickAuth}>
        Set Auth
      </button>
      <div className="render_state">
        {`${currStateAuth ? 'TRUE' : 'FALSE'}`}
      </div>
    </div>
  );
};

export default Redux;
