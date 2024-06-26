export interface Series {
    id: number;
    title: string;
    streamingService: string;
    episodesPerSeason: number[];
    description: string;
    category: string;
    image: string;
    ratings: number[];
    comments: string[]; 
  }
  
export interface Review {
    id: number;
    userId: number;
    userName: string;
    rating: number;
    comment: string;
}

export default Series;