import React from 'react'
import {useParams } from 'react-router-dom';
export default function EditOne() {
    const params = useParams();
    console.log(params)
    return (
        <div>
            <p>{JSON.stringify(params)}</p>
          <button onClick={()=> console.log(params)}>click</button>

        </div>
    )
}
