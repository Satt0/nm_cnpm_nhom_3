import React from "react";
import { gql } from "graphql";
import { useMutation } from "@apollo/client";
import Form from "../../../components/Form";

const DANG_KY = gql`
mutation SignUp($input: inputSignup!) {
  signUp(input: $input) {
  ID
  username
  role
  token  
  }
}
`;

function DangKy(){
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
        },
        {
            label:"role",
            name:"role",
            isRequired:true,
            defaultValue:"",
            type:"text",
            placeHolder:'role',
        },
        ]
        let arrayName = listInput.map(item =>{
            return item.name
          }).join(',')
        const [signUp] = useMutation(DANG_KY)  

        return(
            <div>
                <div>
                <Form listInput={listInput} />
                <button
              onClick={() => {
                signUp({
                  variables: {
                    input: arrayName
                  },
                });
    
               
              }}
            >
              Đăng ký
            </button>
                </div>
            </div>
        )
}
export default DangKy