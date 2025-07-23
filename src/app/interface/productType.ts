export interface ProductType {
    _id?: string,
    title: string,
    description: string,
    category: string,
    image: string | Blob | undefined,
    price: string,
    discountPercentage: number,
    rating: number,
    brand: string,
    sku: string,
    weight: number,
    dimensions: {
        width: number,
        height: number,
        depth: number
    },
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
}

export interface RatingType {
    reviews: [{
        rating: number,
        comment: string,
        date: Date,
        reviewerName: string,
        reviewerEmail: string
    }]
}

export interface AverageRatingType {
    _id: string,
    title: string,
    averageRating: number,
    totalReviews: number
}