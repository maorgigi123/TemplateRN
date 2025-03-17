export interface IListing {
    id: string;
    title: string;
    description : string,
    category: string,
    price:Number
    location: string;
    images: string[];
    owner:string,
    available : Boolean,
  }