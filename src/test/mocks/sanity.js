export const mockSongs = [
  {
    _id: 'song-1',
    title: 'Midnight Drive',
    artwork: { _type: 'image', asset: { _ref: 'image-abc123' } },
    releaseDate: '2024-06-15',
    spotifyUrl: 'https://open.spotify.com/track/1',
    appleMusicUrl: 'https://music.apple.com/track/1',
    youtubeUrl: 'https://youtube.com/watch?v=1',
    soundcloudUrl: 'https://soundcloud.com/track/1',
    featured: true,
  },
  {
    _id: 'song-2',
    title: 'Neon Lights',
    artwork: { _type: 'image', asset: { _ref: 'image-def456' } },
    releaseDate: '2024-03-01',
    spotifyUrl: 'https://open.spotify.com/track/2',
    appleMusicUrl: null,
    youtubeUrl: null,
    soundcloudUrl: null,
    featured: false,
  },
]

export const mockTourDates = [
  {
    _id: 'tour-1',
    venue: 'The Fillmore',
    city: 'San Francisco',
    country: 'USA',
    date: '2025-08-15T20:00:00Z',
    ticketUrl: 'https://tickets.com/show1',
    soldOut: false,
    notes: 'Doors at 7pm',
  },
  {
    _id: 'tour-2',
    venue: 'Brixton Academy',
    city: 'London',
    country: 'UK',
    date: '2025-09-20T19:30:00Z',
    ticketUrl: 'https://tickets.com/show2',
    soldOut: true,
    notes: null,
  },
  {
    _id: 'tour-3',
    venue: 'Secret Venue',
    city: 'Berlin',
    country: 'Germany',
    date: '2025-10-05T21:00:00Z',
    ticketUrl: null,
    soldOut: false,
    notes: null,
  },
]

export const mockMerchItems = [
  {
    _id: 'merch-1',
    title: 'Tour T-Shirt',
    image: { _type: 'image', asset: { _ref: 'image-merch1' } },
    price: 35.0,
    shopifyProductId: 'gid://shopify/Product/1',
    description: 'Official tour tee',
    featured: true,
  },
  {
    _id: 'merch-2',
    title: 'Vinyl LP',
    image: { _type: 'image', asset: { _ref: 'image-merch2' } },
    price: 25.99,
    shopifyProductId: 'gid://shopify/Product/2',
    description: 'Limited edition vinyl',
    featured: false,
  },
  {
    _id: 'merch-3',
    title: 'Poster',
    image: null,
    price: 15.0,
    shopifyProductId: null,
    description: null,
    featured: false,
  },
]

export const mockArtistBio = {
  _id: 'bio-1',
  name: 'Adam Klobi',
  bio: [
    {
      _type: 'block',
      _key: 'block1',
      style: 'normal',
      children: [
        { _type: 'span', _key: 'span1', text: 'Adam Klobi is a musician.' },
      ],
      markDefs: [],
    },
  ],
  pressPhoto: { _type: 'image', asset: { _ref: 'image-press1' } },
  pressPhotos: [
    { _type: 'image', asset: { _ref: 'image-gallery1' } },
    { _type: 'image', asset: { _ref: 'image-gallery2' } },
  ],
  contactEmail: 'adam@klobi.com',
  socialLinks: {
    instagram: 'https://instagram.com/adam.klobi',
    twitter: 'https://twitter.com/adamklobi',
    tiktok: 'https://tiktok.com/@adamklobi',
    youtube: 'https://youtube.com/@adamklobi',
    spotify: 'https://open.spotify.com/artist/adamklobi',
    appleMusic: 'https://music.apple.com/artist/adamklobi',
  },
}

export const mockVideos = [
  {
    _id: 'video-1',
    title: 'Official Music Video',
    youtubeUrl: 'https://youtube.com/watch?v=abc123',
    publishedAt: '2024-06-01',
    featured: true,
  },
  {
    _id: 'video-2',
    title: 'Live Performance',
    youtubeUrl: 'https://youtube.com/watch?v=def456',
    publishedAt: '2024-03-15',
    featured: false,
  },
]
