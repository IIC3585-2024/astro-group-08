import { db, Series, Review, User } from 'astro:db';

export default async function seed() {
  // Seed user data
  await db.insert(User).values([
    {
      id: '1',
      username: 'admin',
      password: 'password' // Ensure to hash passwords in a real application
    },
    {
      id: '2',
      username: 'Lebron',
      password: 'password' // Ensure to hash passwords in a real application
    }
  ]);

  // Seed series data
  await db.insert(Series).values([
    {
      id: 1,
      title: "Breaking Bad",
      streamingService: "Netflix",
      episodesPerSeason: [7, 13, 13, 13, 16],
      description: "A high school chemistry teacher turned into a methamphetamine producer.",
      category: "Drama",
      image: "https://rukminim2.flixcart.com/image/850/1000/kdga1zk0/poster/2/p/i/large-breakingbad04-breaking-bad-poster-breaking-bad-series-original-imafuc2fvfjyackz.jpeg?q=20&crop=false",
      rating: 4.5,
      numberOfReviews: 2
    },
    {
      id: 2,
      title: "Arcane",
      streamingService: "Netflix",
      episodesPerSeason: [9],
      description: `Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions. Watch all you want. Hailee Steinfeld and Kevin Alejandro lend voices to this immersive series based on the lore of Riot Games' "League of Legends."`,
      category: "Violence",
      image: "https://i.pinimg.com/736x/ee/ec/bd/eeecbdf5f78130870ee2a9115af0b40f.jpg",
      rating: 5,
      numberOfReviews: 1
    },
    {
      id: 3,
      title: "Cyberpunk Edgerunners",
      streamingService: "Netflix",
      episodesPerSeason: [1],
      description: `In a dystopia riddled with corruption and cybernetic implants, a talented but reckless street kid strives to become a mercenary outlaw — an edgerunner. Watch all you want.`,
      category: "Inspiring",
      image: "https://http2.mlstatic.com/D_NQ_NP_776646-MLC52223341666_102022-O.webp",
      rating: 4,
      numberOfReviews: 1
    },
    {
      id: 4,
      title: "The Redeem Team",
      streamingService: "Netflix",
      episodesPerSeason: [1],
      description: `After their shocking performance at the 2004 Olympics, the US men's basketball team seeks redemption as they pursue Gold at the 2008 Beijing Games. Watch all you want. LeBron James, Kobe Bryant, Dwyane Wade, Carmelo Anthony, Carlos Boozer, Mike Krzyzewski and more appear in this film.`,
      category: "Violence",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkua4zc6vGKg6FGl5tqsmqbbva__CLi84gvQ&s",
      rating: 5,
      numberOfReviews: 1
    },
  ]);

  // Seed review data
  await db.insert(Review).values([
    {
      id: 1,
      seriesId: 1,
      userId: '1',
      userName: 'admin',
      rating: 5,
      comment: 'Amazing series!'
    },
    {
      id: 2,
      seriesId: 1,
      userId: '2',
      userName: 'Lebron',
      rating: 4,
      comment: 'Great series but a bit slow in the middle.'
    },
    {
      id: 3,
      seriesId: 2,
      userId: '1',
      userName: 'admin',
      rating: 5,
      comment: 'Loved every moment of it!'
    },
    {
      id: 4,
      seriesId: 3,
      userId: '2',
      userName: 'Lebron',
      rating: 4,
      comment: 'Really inspiring story.'
    },
    {
      id: 5,
      seriesId: 4,
      userId: '2',
      userName: 'Lebron',
      rating: 5,
      comment: 'Very motivational!'
    }
  ]);
}
