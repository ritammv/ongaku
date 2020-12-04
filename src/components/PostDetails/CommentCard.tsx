import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as apiclient from '../../helpers/apiClient';
import '../PostCard/Postcard.scss';

interface Props {
  comment: PostComment
}

const CommentCard: React.FC<Props>= ({ comment }) => {
  
  const [author, setAuthor] = useState<User>({
    id: 'c42a1eb1-129e-452e-9363-acea5f9b2d7c',
    username: 'nijssenmandy89',
    token:'',
    tokenSecret: '',
    posts: [],
    channels: [],
    comments: [],
  });

  useEffect(() => {
    async function getAuthor() {
      const result = await apiclient.getUser(comment.userId);
      setAuthor(result);
    }
    getAuthor();
  }, [comment.userId]);

  return (
    
    <>
    
      <div className='comment_body' key={comment.id}>
        <div className="comment_header">
          <p>{author.username}</p>
          <p>{moment(comment.createdAt).format('lll')}</p>
        </div> 
        {comment.body}
      </div>

    
    </>
  );
};

export default CommentCard;
