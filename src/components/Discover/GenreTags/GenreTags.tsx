import React, { useState } from 'react';
import './genreTags.scss';

type GenreTagsType = {
  genre: string;
  id: string;
  handleClick: (id: string, genre: string) => void;
};

const GenreTags: React.FC<GenreTagsType> = (
  { id, genre, handleClick }) => {

  const [isSelected, setIsSelected] = useState<Boolean>(false);

  return (
    <button
      type="button"
      className={`genre_tag_button ${isSelected && 'selected_channel'}`}
      onClick={() => {
        setIsSelected(!isSelected);
        handleClick(id, genre);
      }}
    >
      {genre}
    </button>
  );
};

export default GenreTags;
