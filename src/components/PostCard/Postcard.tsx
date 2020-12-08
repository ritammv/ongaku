import {
  Container,
  Box,
  IconButton,
  Image,
  Text,
  Button,
  Textarea,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BsFillBookmarksFill, BsChevronDown } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import { TiDelete } from 'react-icons/ti';
import { MdDelete } from 'react-icons/md';
import * as apiclient from '../../helpers/apiClientServer';
import CommentCard from './CommentCard';
import './Postcard.scss';
import { addSavedPost, removeSavedPost } from '../../store/actionCreators';

interface Props {
  post: Post;
  deletePost: (postId: string, commentAuthor: number) => void;
  savedPosts: Post[]
}

const Postcard: React.FC<Props> = ({ post, deletePost, savedPosts }) => {
  const dispatch = useDispatch();

  const history = useHistory();

  const user = useSelector<State, User>((state) => state.user);

  const [postComments, setPostComments] = useState<PostComment[] | []>([]);
  const [commentBody, setCommentBody] = useState<string>('');
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);
  const [savePost, setSavePost] = useState<boolean>(false);
  const date = moment(post.createdAt).format('lll');
  const [author, setAuthor] = useState<User>({
    id: 59215829,
    username: 'Otoko',
    resourceUrl: 'http:hello',
    token: '',
    tokenSecret: '',
    createdAt: '',
    updatedAt: '',
    channels: [],
    posts: [],
  });

  useEffect(() => {
    function getPost() {
      apiclient
        .getPost(post.id)
        .then((result) =>
          setPostComments(
            result.comments.sort(
              (
                a: { createdAt: string | number | Date },
                b: { createdAt: string | number | Date }
              ) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf()
            )
          )
        );
    }
    getPost();
    async function getAuthor() {
      const result = apiclient.getUser(post.userId);
      setAuthor(await result);
    }
    getAuthor();
  }, [post.id, post.userId]);


  useEffect(() => {
    const result = savedPosts.find((p) => p.id === post.id);
    if (result) {
      setSavePost(true);
    }
  }, [post.id, savedPosts]);

  function postComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    apiclient
      .createComment(post.id, user.id, commentBody)
      .then((newComment) => {
        setCommentBody('');
        setPostComments((prev) => {
          return [newComment, ...prev];
        });
      });
  }

  function deleteComment(commentId: string, commentAuthor: number) {
    apiclient.removeComment(post.id, commentId, commentAuthor).then(() => {
      setPostComments((prev) =>
        postComments.filter((com) => com.id !== commentId)
      );
    });
  }

  function handleComments() {
    setIsShowingComments(!isShowingComments);
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    setCommentBody(target.value);
  }

  function handleSave() {
    if (!savePost) {
      apiclient.savePost(user.id, post.id)
        .then(() => {
          dispatch(addSavedPost(post));
          setSavePost((curr) => !curr);
        });
    } else {
      apiclient.removeSavedPost(post.id, user.id)
        .then(() => {
          dispatch(removeSavedPost(post));
          setSavePost((curr) => !curr);
        });
    }
  }

  return (
    <div className='postcard'>
      <>
        <div className="message_date">{date}</div>
        <div className='postcard_title_wrapper'>
          <div className="message_title">{post.postTitle}</div>
          <div>
            {user.id === post.userId && (
            <IconButton
              backgroundColor='inherit'
              aria-label="delete post"
              icon={<TiDelete />}
              onClick={() => deletePost(post.id, post.userId)}
            />
            )}
          </div>
        </div>
        <div className="message_tile">
          <div
            className="tile_image"
            onClick={() => history.push(`/details/${post.url.split('com/')[1]}`)}
            aria-hidden="true"
          >
            <img src={post.thumbnail} alt="release" />
          </div>
          {!savePost ? (
            <IconButton
              id='tile_button'
              aria-label="Add to List"
              icon={<HiOutlinePlus />}
              onClick={handleSave}
            />
          ) : (
            <IconButton
              id='tile_button'
              aria-label="Add to List"
              icon={<BsFillBookmarksFill />}
              onClick={handleSave}
            />
          )}
          {/* <div className="tile_info"> */}
          {/* {post.title && <Text isTruncated>{post.title}</Text>} */}
          {/* {post.artist && <Box isTruncated>Artist: {post.artist} </Box>}
            {post.label && <Box isTruncated>Label: {post.label}</Box>}
            {post.year && <Box isTruncated>Year: {post.year}</Box>} */}
          {/* </div> */}
        </div>

       
        <div className="message_content">
          {isShowingComments ? (
            <div className="message_body">{post.body}</div>
          ) : (
            <Box className="message_body" noOfLines={5}>
              {post.body}
            </Box>
          )}

          <div className="message_stats">
            <div className="stats_comments">
              <IconButton
                size="sm"
                aria-label="See comments"
                icon={<BsChevronDown />}
                backgroundColor='inherit'
                onClick={handleComments}
              />
              {postComments.length
                ? `${postComments.length} comments`
                : '0 comments'}
            </div>
            <div className="stats_author">
              Posted by <b>{author.username}</b>
            </div>
          </div>
        </div>
      </>

      {isShowingComments ? (
        <>
          <form className="comment_form" onSubmit={postComment}>
            <Text fontSize="0.9rem" color="rgba(6, 93, 194, 0.6)">
              Comment as{' '}
              <span className="comment_username">{user.username}</span>
            </Text>
            <Textarea
              onChange={(e) => handleChange(e)}
              name="comment"
              value={commentBody}
              placeholder="Share your thoughts"
            />
            <Button type="submit" size="xs">
              Comment
            </Button>
          </form>

          <div className='comment_wrapper'>
            {postComments && postComments.length ? (
              <>
                {(postComments as PostComment[]).map((comment) => (

                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    deleteComment={deleteComment}
                  />
               
                ))}
              </>
            ) : (
              <Text>Be the first to comment</Text>
            )}
          </div>

        </>
      ) : null}
    </div>
  );
};

export default Postcard;
