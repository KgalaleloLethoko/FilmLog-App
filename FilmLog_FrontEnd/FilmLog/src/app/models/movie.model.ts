//holds info about movies, defines datastructure 

export interface Movie {
  id: string;
  movieTitle: string;
  releaseYear: string;
  poster: string;
  movieCast: string[];
  noOftimesWatched?: number;
}