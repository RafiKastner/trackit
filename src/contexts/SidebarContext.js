import { createContext, useState, useRef } from "react";

export const SidebarContext = createContext()

export function SidebarContextProvider({ children }) {
    var [bounds, setBounds] = useState({})
    var notesbarRef = useRef(null)
    var [animBounds, setAnimBounds] = useState({})

    return (
        <SidebarContext.Provider value={{
            bounds,
            setBounds,
            notesbarRef,
            animBounds,
            setAnimBounds,
        }}>
            {children}
        </SidebarContext.Provider>
    )
}