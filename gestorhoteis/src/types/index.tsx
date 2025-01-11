
export type Hotel = {
    id: string;
    name: string;
    description: string;
    location: string;
    country: Country;
    cancellationPolicy: CancellationPolicy;
    rooms: Room[];
    amenities: string[];
    averageReview: number;
}

export type InfoUser = {
    id: string,
    name: string,
    email:  string,
    birthDate: string,
    country: Country;
  }

export type Reviews = {
    id: string;
    bookingId: string;
    rating: number;
    comment: string;
}


export type Country = {
    id: string;
    name: string;
}

export type CancellationPolicy = {
    id: string;
    name: string;
}

export type Room = {
    id: string;
    type: string;
    price: number;
    images: Images[],
    bookings: Booking[],
}

export type Images = {
    id: string;
    url: string;
}
export type Booking = {
    id: string,
    userId: InfoUser,
    roomId: Room,
    checkIn: string,
    checkOut: string,
    reviews: Reviews[],
}
