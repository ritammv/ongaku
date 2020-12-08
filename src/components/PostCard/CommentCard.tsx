import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { IconButton } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { getUser } from '../../helpers/apiClientServer';
import './Postcard.scss';

interface Props {
  comment: PostComment;
  deleteComment: (commentId: string, commentAuthor: number) => void;
}

const CommentCard: React.FC<Props> = ({ comment, deleteComment }) => {

  const user = useSelector<State, User>((state) => state.user);
  const [author, setAuthor] = useState<User>({
    id: 4920,
    username: 'nijssenmandy89',
    resourceUrl: 'http: hello',
    token: '',
    tokenSecret: '',
    posts: [],
    channels: [],
    createdAt: '42',
    updatedAt: '3829',
  });

  useEffect(() => {
    async function getAuthor() {
      const result = await getUser(comment.userId);
      setAuthor(result);
    }
    getAuthor();
  }, [comment.userId]);

  return (
    <>
      <div className="comment_body" key={comment.id}>
        <div className="comment_header">
          <p>{author.username}</p>
          <p>{moment(comment.createdAt).format('lll')}</p>
          {
            (user && (user.id === comment.userId)) &&        
            <IconButton 
              m='0'
              size='sm' 
              aria-label="Search database" 
              icon={<MdDelete />}
              backgroundColor='inherit'
              onClick={() => deleteComment(comment.id, comment.userId)}
            />
          }
        </div> 
        <div className="comment_body">
          {comment.body}
        </div>
        <div className="comment_body">{comment.body}</div>
      </div>
    </>
  );
};

export default CommentCard;
