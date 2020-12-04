import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  IconButton,
  Textarea,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { HiOutlinePlus } from 'react-icons/hi';
import * as apiclient from '../../helpers/apiClient';
import CommentCard from './CommentCard';
import '../PostCard/Postcard.scss';

interface Props {
  postId: string;
}

const Postdetails: React.FC<Props> = ({ postId }) => {
  const user = useSelector<State, User>((state: State) => state.user);
  const channels = useSelector<State, Channel[]>((state: State) => state.user.channels);
  // change to channel where state is active
  const [channel, setChannel] = useState(channels[0]);


  const [post, setPost] = useState<Post>({
    id: 'ff1aa452-6bc5-41e8-ad10-edff8bbf7058',
    thumbnail:
      'https://img.discogs.com/Asuey6O9_gzzOUxgWPAks7kpSsM=/fit-in/600x593/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12795201-1542094352-6938.jpeg.jpg',
    title: 'C166 EP',
    artist: 'JoyHauser',
    label: 'Terminal M',
    year: 2018,
    url: '',
    postTitle: "Can't stop listening",
    body:
      'I heard this song on the Monika Kruse Boiler Room Berlin 2016 set and after a little search I found out it was Joyhauser. It is no-nonsense techno and I can recommend to EP to everyone who loves Kruse or Amelie Lens',
    userId: 245252,
    comments: [],
    tags: [],
    createdAt: '2020-12-02 16:11:06.13+01',
    updatedAt: '',
    channelId: 'ef420411-97de-4fc8-9cf7-cfd5e3effd5e',
  });
  const [savePost, setSavePost] = useState<boolean>(false);
  const [commentBody, setCommentBody] = useState<string>('');
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

  const history = useHistory();
  const date = moment(post.createdAt).format('lll');

  useEffect(() => {
    async function getCurrentPost() {
      const result = await apiclient.getPost(postId);
      result.comments = result.comments
        .sort((
          a: { createdAt: string | number | Date; }, 
          b: { createdAt: string | number | Date; }) =>
          new Date(b.createdAt).valueOf() -
          new Date(a.createdAt).valueOf()
        );
      setPost(result);
    }
    getCurrentPost();
    // async function getAuthor() {
    //   const result= await apiclient.getUser(post.userId);
    //   setAuthor(await result);
    // }
    // getAuthor();
  }, [post.userId, postId]);

  function handleSave() {
    if (!savePost) {
      apiclient.savePost(author.id, post.id);
    } else {
      apiclient.removeSavedPost(author.id, post.id);
    }
    setSavePost(!savePost);
  }

  function postComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    apiclient
      .createComment(post.id, user.id, commentBody)
      .then((newComment) => {
        setCommentBody('');
        setPost((prev) => {
          return { ...prev, comments: [newComment, ...prev.comments] };
        });
      });
  }

  function handleChange(
    e: React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) {
    const target = e.target as HTMLTextAreaElement;
    setCommentBody(target.value);
  }

  return (
    <Container w="90%" display="flex" flexDir="column" marginY="1.5rem">
      <div className="message_channel">#{channel.name}</div>
      <div className="message_date">{date}</div>
      <div className="message_tile">
        <div
          className="tile_image"
          onClick={() => history.push(`/post/${post.id}`)}
          aria-hidden="true"
        >
          <img src={post.thumbnail} alt="release" />
        </div>
        <div className="tile_info">
          {post.title && <Box isTruncated>Title: {post.title}</Box>}
          {post.artist && <Box isTruncated>Artist: {post.artist} </Box>}
          {post.label && <Box isTruncated>Label: {post.label}</Box>}
          {post.year && <Box isTruncated>Year: {post.year}</Box>}
        </div>
        {!savePost ? (
          <IconButton
            aria-label="Add to List"
            icon={<HiOutlinePlus />}
            position="relative"
            top="-10px"
            right="-15px"
            onClick={handleSave}
          />
        ) : (
          <IconButton
            aria-label="Add to List"
            icon={<BsFillBookmarksFill />}
            position="relative"
            top="-10px"
            right="-15px"
            onClick={handleSave}
          />
        )}
      </div>

      <div className="message_content">
        <div className="message_title">{post.title}</div>
        <Box className="message_body">{post.body}</Box>

        <div className="message_stats">
          <div className="stats_comments">{post.comments.length} comments</div>
          <div className="stats_author">
            Posted by <b>{author.username}</b>
          </div>
        </div>
      </div>

      <form className="comment_form" onSubmit={postComment}>
        <Text fontSize="0.8rem" color="#d3d3d3">
          Comment as <span className="comment_username">{user.username}</span>
        </Text>
        <Textarea
          onChange={(e) => handleChange(e, 'comment')}
          name="comment"
          value={commentBody}
          placeholder="Share your thoughts"
        />
        <Button type="submit" size="xs">
          Comment
        </Button>
      </form>

      {post.comments && post.comments.length ? (
        <>
          {post.comments
            .map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
        </>
      ) : (
        <Text>Be the first to comment</Text>
      )}
    </Container>
  );
};

export default Postdetails;
