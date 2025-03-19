export type IListingCurrency  =  "ILS" | "USD";
export type IListingStatus = "available" | "sold" | "pending" | "expired";

export type ISearchCategory = "electronics" | "fashion" | "home" | "vehicles" | "other";


export interface IListing {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: IListingCurrency;
  images: string[];
  owner: {
    id: string;
    name: string;
    profile_image: string;
    verified: boolean;
    rating: number;
  };
  status: IListingStatus;
  location: {
    city: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}
