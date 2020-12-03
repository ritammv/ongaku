import React from 'react';
import './genreTags.scss';

type GenreTagsType = {
  genre: string;
  id: string;
  handleClick: (id: string, genre: string) => void;
};

const GenreTags: React.FC<GenreTagsType> = ({ id, genre, handleClick }) => {
  return (
    <button
      type="button"
      className="genre_tag_button"
      onClick={() => handleClick(id, genre)}
    >
      {genre}
    </button>
  );
};

export default GenreTags;
