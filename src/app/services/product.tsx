import React from 'react'
import { environments } from '../../../environment';
import { API_ENDPOINTS } from '../constant/endpoints';
import { AverageRatingType, ProductType, RatingType } from '../interface/productType';

const APIPATH =  environments.apiUrl;
const token =environments.bearedToken;

export async function getProductData(): Promise<ProductType[]> {
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETPRODUCTS}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

export async function getRatingsData(): Promise<RatingType[]>{
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETRATINGS}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}

export async function getAverageRatingData(): Promise<AverageRatingType[]>{
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.AVERAGERATINGS}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data;
}