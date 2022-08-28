import React, { createContext, ReactNode, useContext } from "react";

import * as AuthSession from 'expo-auth-session';

interface AuthProviderProps {
    children: ReactNode
}


interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
} 

interface AuthContextData{
    user: User;
    SingnInWithGoogle(): Promise<void>;
}

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps ){
    const user = {
        id: 'ABC2345',
        name: 'Antonio Bruno',
        email: 'abruno36@gmail.com'
    }

    async function SingnInWithGoogle(){
      try {
        const CLIENT_ID = '648751276355-lmf1seruo08kvb92mlr5at83jn5slijl.apps.googleusercontent.com';
        const REDIRECT_URI = 'https://auth.expo.io/@bruno36/gofinances';
        const RESPONSE_TYPE = 'token';
        const SCOPE = encodeURI('profile email');

        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

        const response = await AuthSession.startAsync({ authUrl });

        console.log(response);
        
      } catch (error) {
          throw new Error(error as string);
      } 
        
    }

    return(
        <AuthContext.Provider value={{
            user, 
            SingnInWithGoogle
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}
export { AuthProvider, useAuth }