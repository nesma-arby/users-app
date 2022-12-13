import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedComponent = (props:any) => {

         if(!props.isLoggedIn){
            return <Navigate to="/login" replace />
         }
          return props.children
         

           
};

export default ProtectedComponent;