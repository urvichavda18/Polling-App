import React, { createContext, useState } from 'react'

export const UserContext = createContext();

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    //function to update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    //function to crealr user data (e. ,g. logout)

    const clearUser = () => {
        setUser(null);
    }
    
    return (
        <UserContext.Provider
            value={{
                user, updateUser,
                clearUser,
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
// export default ;
export default UserProvider;
