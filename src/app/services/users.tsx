import React from 'react'
import { environments } from '../../../environment'
import { API_ENDPOINTS } from '../constant/endpoints'

const APIPATH = environments.apiUrl

export default function users() {

  return (
    <div>
      
    </div>
  )
}

export async function getUserData(){
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETUSER}`);
    const data = await response.json();
    console.log(data);
    return data;
}

