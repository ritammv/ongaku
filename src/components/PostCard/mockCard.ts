
const comment1: PostComment = {
  id:'2',
  postId: '7',
  userId: '87b4421a-437e-4ae7-81d7-d8a6dd94dbae',
  body: 'Sick, I had no clue they were doing an Editors Remix! If it has the same feel as Warped it should be good 🤩',
  createdAt: '2020-12-02 16:11:06.13+01'
};

const comment2: PostComment =  {
  id: '1',
  postId: '7',
  userId: 'a09364a3-d691-4435-a58b-d9d4b998e865',
  body: 'Have you heard their remix of Frankenstein by the Editors? I highly recommend to give it a listen',
  createdAt :'2020-12-02 16:11:06.13+01'
};


export const mockPost: Post = {
  id: 'ff1aa452-6bc5-41e8-ad10-edff8bbf7058',
  thumbnail: 'https://img.discogs.com/Asuey6O9_gzzOUxgWPAks7kpSsM=/fit-in/600x593/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12795201-1542094352-6938.jpeg.jpg',
  title: 'C166 EP',
  artist: 'JoyHauser',
  label:'Terminal M',
  year: 2018,
  url: '',
  postTitle: 'Can\'t stop listening',
  body: 'I heard this song on the Monika Kruse Boiler Room Berlin 2016 set and after a little search I found out it was Joyhauser. It is no-nonsense techno and I can recommend to EP to everyone who loves Kruse or Amelie Lens',
  userId: '3bcdd94b-d460-4d58-8050-c717005c025b',
  comments: [comment1, comment2],
  tags: [],
  createdAt: '2020-12-02 16:11:06.13+01',
  updatedAt: '',
  channelId: 'ef420411-97de-4fc8-9cf7-cfd5e3effd5e'
};
