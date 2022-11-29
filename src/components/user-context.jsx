
import { createContext, useState } from 'react';
import Header from './header';

export const UserContext = createContext();

const user = { loggedIn: localStorage.getItem('authenticated')}


const Context = (props) =>{

    return <UserContext.Provider  value={user}> <Header/> </UserContext.Provider>

}

export default Context ;
