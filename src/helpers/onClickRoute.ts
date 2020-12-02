
import { useHistory } from 'react-router-dom';

export const OnClickRoute = () => {
  const history = useHistory();
  
  const handleClick = (name: string) => {
    history.push(`/${name}`);
  };
  return handleClick;
};