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
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BsFillBookmarksFill, BsChevronDown } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import * as apiclient from '../../helpers/apiClientServer';
import CommentCard from './CommentCard';
import './Postcard.scss';

interface Props {
  post: Post;
  deletePost: (postId: string, commentAuthor: number) => void;
  savePost: boolean;
  setSavePost: React.Dispatch<React.SetStateAction<boolean>>;
}

const Postcard: React.FC<Props> = ({
  post,
  deletePost,
  savePost,
  setSavePost,
}) => {
  // const dispatch = useDispatch();
  // const isLoading = useSelector<State, boolean>((state) => state.isLoading);
  const user = useSelector<State, User>((state) => state.user);

  const [postComments, setPostComments] = useState<PostComment[] | []>([]);
  const [commentBody, setCommentBody] = useState<string>('');
  const [isShowingComments, setIsShowingComments] = useState<boolean>(false);

  // const [savePost, setSavePost] = useState<boolean>(false);
  const history = useHistory();
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
      apiclient.savePost(user.id, post.id);
    } else {
      apiclient.removeSavedPost(post.id, user.id);
    }
    setSavePost(!savePost);
  }

  return (
    <Container
      border="1px solid #d2d2d2"
      borderRadius="8px"
      w="95%"
      display="flex"
      flexDir="column"
      marginY="0.8rem"
    >
      <>
        <div className="message_date">{date}</div>
        <div className="message_tile">
          <div
            className="tile_image"
            onClick={() => history.push(`/post/${post.id}`)}
            aria-hidden="true"
          >
            <Image src={post.thumbnail} alt="release" />
          </div>
          <Box className="tile_info">
            {post.title && <Box isTruncated>Title: {post.title}</Box>}
            {post.artist && <Box isTruncated>Artist: {post.artist} </Box>}
            {post.label && <Box isTruncated>Label: {post.label}</Box>}
            {post.year && <Box isTruncated>Year: {post.year}</Box>}
          </Box>
          {!savePost ? (
            <IconButton
              aria-label="Add to List"
              icon={<HiOutlinePlus />}
              backgroundColor="inherit"
              position="relative"
              top="-20px"
              onClick={handleSave}
            />
          ) : (
            <IconButton
              aria-label="Add to List"
              backgroundColor="inherit"
              icon={<BsFillBookmarksFill />}
              position="relative"
              top="-20px"
              onClick={handleSave}
            />
          )}
        </div>

        <div className="message_content">
          <div className="postcard_header">
            <div className="message_title">{post.postTitle}</div>
            {user.id === post.userId && (
              <IconButton
                size="sm"
                aria-label="delete post"
                icon={<MdDelete />}
                backgroundColor="inherit"
                onClick={() => deletePost(post.id, post.userId)}
              />
            )}
          </div>
          {isShowingComments ? (
            <Box className="message_body">{post.body}</Box>
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
                backgroundColor="inherit"
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
            <Text fontSize="0.8rem" color="#d3d3d3">
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
        </>
      ) : null}
    </Container>
  );
};

export default Postcard;
