import React from 'react';
import './genreTags.scss';

type GenreTagsType = {
  genre: string;
};

const GenreTags: React.FC = ({ genre }: GenreTagsType) => {
  return <button type="button">{genre}</button>;
};

export default GenreTags;
