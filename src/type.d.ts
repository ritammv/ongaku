interface Release {
  id: number;
  artists_sort?: string;
  year?: number;
  labels?: string[];
  title: string;
  genres?: string[];
  styles?: string[];
  url?: string;
  huge_thumb: string;
  data?: object;
}

interface Want {
  id: number;
  artists: {
    name?: string;
  }[];
  year?: number;
  labels?: string[];
  title: string;
  genres?: string[];
  styles?: string[];
  resource_url?: string;
  cover_image: string;
  data?: object;
}

interface SearchData {
  id?: number;
  title: string;
  artist: string;
  cover_image: string;
}

interface CreatePostForm {
  query: string;
  artist: string;
  title: string;
  label: string;
  year: string;
}
