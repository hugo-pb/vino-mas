export interface Review {
  id: string;
  name: string;
  nickname: string;
  type: "wine" | "beer" | "spirits" | "cocktail" | "other";
  rating: number;
  notes: string;
  imageUrl: string;
  date: string;
}
