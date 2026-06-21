import React from "react";
import { useLoaderData } from "react-router-dom";

export default function Github(){
    const userData = useLoaderData()

    return (
        <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {userData.followers}
        </div>
    )

}

export const githubInfoLoader = async () => {
    const response = await fetch('https://api.github.com/users/hiteshchoudhary')
    return response.json()
}