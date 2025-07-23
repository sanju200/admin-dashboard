import React from 'react'
import { environments } from '../../../environment'
import { API_ENDPOINTS } from '../constant/endpoints'
import { UserType } from '../interface/userType'

const APIPATH = environments.apiUrl

export default function users() {}

export async function getUserData(): Promise<UserType[]>{
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETUSER}`);
    const data = await response.json();
    return data;
}

