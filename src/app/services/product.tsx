import React from 'react'
import { environments } from '../../../environment';
import { API_ENDPOINTS } from '../constant/endpoints';
import { AverageRatingType, ProductType, RatingType } from '../interface/productType';

const APIPATH =  environments.apiUrl;

export async function getProductData(): Promise<ProductType[]> {
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETPRODUCTS}`);
    const data = await response.json();
    return data;
}

export async function getRatingsData(): Promise<RatingType[]>{
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETRATINGS}`);
    const data = await response.json();
    return data;
}

export async function getAverageRatingData(): Promise<AverageRatingType[]>{
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.AVERAGERATINGS}`);
    const data = await response.json();
    return data;
}