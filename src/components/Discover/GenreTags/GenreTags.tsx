import React from 'react';
import './genreTags.scss';

type GenreTagsType = {
  genre: string;
};

const GenreTags: React.FC<GenreTagsType> = ({ genre }) => {
  return (
    <button className="genre_tag_button" type="button">
      {genre}
    </button>
  );
};

export default GenreTags;
