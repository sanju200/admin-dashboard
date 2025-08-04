import React from 'react'
import { environments } from '../../../environment'
import { API_ENDPOINTS } from '../constant/endpoints'
import { UserLogin, UserType } from '../interface/userType'

const APIPATH = environments.apiUrl;
const token = environments.bearedToken;

export default function users() {}

export async function getLoginUser(user: UserLogin): Promise<UserType | undefined>{
  try{
  const response = await fetch(`${APIPATH}/${API_ENDPOINTS.LOGINUSER}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
     body: JSON.stringify(user),
  })
    const data = await response.json();
    if(data){
      setUserDetails(data);
    }
    return data;
  }catch(err){
    console.error(err)
  }
}

export async function registerUser(user: UserType): Promise<UserType| undefined>{
  try{
    const response = await fetch(`${APIPATH}/${API_ENDPOINTS.REGISTERUSER}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data;
  }catch(err){
    console.error(err);
    return;
  }
}

export async function getUserData(): Promise<UserType[]>{
    try{
      const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETUSER}`, {
      method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      return data;
    }catch(err){
      console.error(err);
      return [];
    }
}

export async function createUser(userData: UserType){
  try{
      const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETUSER}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData),
      })
    return response.ok;
  }catch(err){
    console.error('Create user error: ', err);
    return;
  }
}

export async function updateUserData(data: UserType){
    try {
        const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETUSER}/${data?._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
      console.error("Update error:", error);
      return;
    }
}

export async function deleteSelectedUser(userId: string | undefined){
  try{
      const response = await fetch(`${APIPATH}/${API_ENDPOINTS.GETUSER}/${userId}`, {
        method: 'DELETE',
         headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          }
      })
      return response.ok;
  }catch(err){
    console.error('Failed to delete user: ', err);
    return;
  }
}

export function setUserDetails(user: any) {
   localStorage.setItem("role", user.role);
   localStorage.setItem("access-token", user.access_token);
}

export function clearUser(){
  localStorage.clear();
}