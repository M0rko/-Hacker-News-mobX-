import React from "react";
import {createStoriesFunction} from "./store/stories";
import { useLocalStore } from "mobx-react-lite";
const StoriesContext = React.createContext(null)

export const StoriesProvider = ({ children }) => {
    const storiesStore = useLocalStore(createStoriesFunction) 

    return <StoriesContext.Provider value={storiesStore}>
        {children}
    </StoriesContext.Provider>
}

export const useStoriesStore = () => React.useContext(StoriesContext )