import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Input, Textarea } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../../helpers/apiClientServer';
import './FinalCreatePost.scss';
import vinyl from '../../../assets/vinyl.jpg';

export default function Finalcreatepost() {
  const history = useHistory();

  const selected = useSelector<State, Release>(
    (state: State) => state.selected
  );
  const channel = useSelector<State, Channel>(
    (state: State) => state.currChannel
  );
  const user = useSelector<State, User>((state: State) => state.user);

  const [postForm, setPostForm] = useState<FinalPost>({
    card: selected,
    message_title: '',
    message_body: '',
  });

  type Event =
    | React.FormEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>;

  function handleChange(
    // eslint-disable-next-line max-len
    e: Event,
    name: string
  ) {
    const target = e.target as HTMLTextAreaElement;
    const newPost: FinalPost = { ...postForm };
    if (name === 'title') newPost.message_title = target.value;
    if (name === 'message') newPost.message_body = target.value;
    setPostForm(newPost);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createPost(
      channel.id,
      selected,
      user,
      postForm,
      user.token,
      user.tokenSecret
    ).then(() => {
      history.push(`/channels/${channel.name}`);
    });
  }

  return (
    <div className="FinalPostWrapper">
      <div className="FinalPost_Title">
        Review your post
        <Button className="FinalPost_close" onClick={() => history.goBack()}>
          X
        </Button>
      </div>

      <div className="FinalPost_Tile">
        {selected.image ? (
          <img src={selected.image} alt="release foto" />
        ) : (
          <img src={vinyl} alt="release foto" />
        )}
        <div className="Tile_Content">
          {selected.title && selected.title.length && (
            <Box isTruncated>Title: {selected.title}</Box>
          )}
          {selected.artists && selected.artists.length && (
            <Box isTruncated>Artist: {selected.artists[0].name} </Box>
          )}
          {selected.labels && selected.labels.length && (
            <Box isTruncated>Label: {selected.labels[0].name}</Box>
          )}
          {selected.year && <Box isTruncated>Year: {selected.year}</Box>}
        </div>
      </div>

      <form onSubmit={(e) => handleSubmit(e)} className="FinalPost_message">
        <Input
          variant="flushed"
          placeholder="Title"
          onChange={(e) => handleChange(e, 'title')}
          name="title"
          required
        />
        <Textarea
          placeholder="Message goes here.."
          name="message"
          onChange={(e) => handleChange(e, 'message')}
          required
        />
        <button className="genre_tag_button two" type="submit">
          POST
        </button>
      </form>
    </div>
  );
}
