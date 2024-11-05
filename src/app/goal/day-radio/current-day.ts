export interface CurrentDay {
  day: string;
}

export interface FavouriteDay {
  username: string;
  day_favourite: string;
}

export interface FavouriteDayReturn {
  username: string;
  day_favourite: string;
  message: string;
  success: string;
}
