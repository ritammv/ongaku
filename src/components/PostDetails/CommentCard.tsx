import React, { useEffect, useState } from 'react';
import moment from 'moment';
import * as apiclient from '../../helpers/apiClient';
import '../PostCard/Postcard.scss';

interface Props {
  comment: PostComment
}

const CommentCard: React.FC<Props>= ({ comment }) => {
  
  const [author, setAuthor] = useState<User>({
    id: 4920,
    username: 'nijssenmandy89',
    resourceUrl: 'http: hello',
    token:'',
    tokenSecret: '',
    posts: [],
    channels: [],
    createdAt: '42',
    updatedAt: '3829'
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
