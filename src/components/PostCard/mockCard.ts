interface Comment {
  username: string
  comment_body: string
  timestamp: string
}

interface PostCard {
  image: string
  title: string
  artists: {name:string}[]
  labels: {name:string}[]
  year: number
  message_title: string
  message_body: string
  username: string
  comments: Comment[]
}

const comment1: Comment = {
  username: 'Otoko',
  comment_body: 'Sick, I had no clue they were doing an Editors Remix! If it has the same feel as Warped it should be good 🤩',
  timestamp: 'Dec 2, 2020 12:57 AM'
};

const comment2: Comment =  {
  username: 'Laundry',
  comment_body: 'Have you heard their remix of Frankenstein by the Editors? I highly recommend to give it a listen',
  timestamp:'Dec 2, 2020 12:46 AM'
};

export const post = {
  image: 'https://img.discogs.com/Asuey6O9_gzzOUxgWPAks7kpSsM=/fit-in/600x593/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-12795201-1542094352-6938.jpeg.jpg',
  title: 'C166 EP',
  artists: [{ name: 'Joyhauser' }],
  labels:[{ name: 'Terminal M' }],
  year: 2018,
  message_title: 'Can\'t stop listening',
  message_body: 'I heard this song on the Monika Kruse Boiler Room Berlin 2016 set and after a little search I found out it was Joyhauser. It is no-nonsense techno and I can recommend to EP to everyone who loves Kruse or Amelie Lens',
  username: 'Manju',
  comments: [comment1, comment2]
};
