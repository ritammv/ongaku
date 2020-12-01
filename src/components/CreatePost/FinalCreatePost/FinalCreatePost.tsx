import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Textarea } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import './FinalCreatePost.scss';


export default function Finalcreatepost() {

  const history = useHistory();
  const selected = useSelector<State, Release >(
    (state: State) => state.selected);

  const [post, setPost] = useState<FinalPost>({
    card: selected,
    message_title: '',
    message_body: '',
  });

  function handleChange(
    e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>, 
    name: string) {
    const target = e.target as HTMLTextAreaElement ;
    const newPost: FinalPost = { ...post };
    if (name === 'title') newPost.message_title = target.value;
    if (name === 'message') newPost.message_body = target.value;
    setPost(newPost);
  }

  function handleSubmit() {
    console.log('submitted new post');
    // TODO push to db + reroute to correct channel
    history.push('/channel/techno');
  }

  return (
    <div className='FinalPostWrapper'>
      <div className='FinalPost_Title'>
        Review your post
        <Button
          className='FinalPost_close'
          onClick={()=> (history.push('/channel/techno'))}
        >
          X
        </Button>
      </div>

      <div className="FinalPost_Tile">
        <img src={selected.image} alt='card foto' />
        <div className='Tile_Content'>
          {selected.title.length && <p>Title: {selected.title}</p>}
          {selected.artists.length && <p>Artist: {selected.artists[0].name} </p>}
          {selected.labels.length && <p>Label: {selected.labels[0].name}</p>}
          {selected.year && <p>Year: {selected.year}</p>}
        </div>
      </div>

      <form className='FinalPost_message'>
        <Input 
          variant="flushed" 
          placeholder="Title" 
          onChange={(e) => handleChange(e, 'title')}
          name='title'
          required 
        />
        <Textarea 
          placeholder="Share the love..." 
          name='message'
          onChange={(e) => handleChange(e, 'message')}
          required 
        />
        <Button
          className="button-default"
          backgroundColor="#0f0e0e"
          color="white"
          borderRadius="12px"
          padding="2% 5%"
          fontWeight="lighter"
          mr={3}
          onSubmit={handleSubmit}
        >
          POST
        </Button>
      </form>
      
    </div>
  );
}
