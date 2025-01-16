import { createContext, useState, useRef } from "react";

export const SidebarContext = createContext()

export function SidebarContextProvider({ children }) {
    let [bounds, setBounds] = useState({})
    let notesbarRef = useRef(null)
    let [animBounds, setAnimBounds] = useState({})
    let [isNotesScrolled, setIsNotesScrolled] = useState(false)

    return (
        <SidebarContext.Provider value={{
            bounds,
            setBounds,
            notesbarRef,
            animBounds,
            setAnimBounds,
            isNotesScrolled,
            setIsNotesScrolled,
        }}>
            {children}
        </SidebarContext.Provider>
    )
}