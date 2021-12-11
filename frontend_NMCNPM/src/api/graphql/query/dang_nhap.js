import React from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";

const DANG_NHAP = gql`
query LogIn($input: inputLogin!) {
  logIn(input: $input) {
    ID
    username
    role
    token
  }
}
`;

function DangNhap(){
    const listInput=[

        {
            label:"username",
            name:"username",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'username',
        },
        {
            label:"password",
            name:"password",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'password',
        }
        ]
        let arrayName = listInput.map(item =>{
            return item.name
          }).join(',')
        const [logIn] = useMutation(DANG_NHAP)  

        return(
            <div>
                <div>
                <Form listInput={listInput} />
                <button
              onClick={() => {
                logIn({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Đăng nhập
            </button>
                </div>
            </div>
        )
}
export default DangNhap