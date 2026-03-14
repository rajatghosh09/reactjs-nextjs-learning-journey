export interface ProductList {
  id: number;
  title: string;
  description: string;
  images: string[];
  review: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  tags: string[],
  brand: string,
  warrantyInformation?: string,
  shippingInformation?: string,
  availabilityStatus?: string,
  returnPolicy?: string,
  reviews?: Review[]
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface PostList {
  id?: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views?: number;
  userId?: number;
}

export interface weatherInterface {
  name?: string;
  main?: {
    feels_like?: number;
    grnd_level?: number;
    humidity?: number;
    pressure?: number;
    sea_level?: number;
    temp?: number;
    temp_max?: number;
    temp_min?: number;
  };
  sys?: {
    country?: string;
    sunrise?: number;
    id?: number;
    sunset?: number;
  };
   weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
}

export interface jokes {
  id?: number;
  setup?: string;
  punchline?: string;
  type?: string;
}
