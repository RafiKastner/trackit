import { createContext, useState, useEffect, useReducer } from "react";
import folderReducer, { editFolderWithPath } from "../reducers/folderReducer";
import { generateUID } from "../scripts/generics";

/*
to-do:
- split sidebar context into NotesDisplayContext
	and FolderDisplayContext
- folder/notes variable structure
	- userdata exists at top level
	- folders exists at top level too
	- there is also current folder and current 
		note states which are the ids of each
	- FolderDisplay get folders from LevelContext and
		does its thing
	- NotesDisplayContext has var just for folder.name
	- NotesDisplay remains pretty unchanged and displays
		notes as normal except by declaring 
		notes = getNotes()
		- also have getFolder() func
*/

export const LevelContext = createContext();

export function LevelContextProvider({ children }) {
    const [dataTheme, setDataTheme] = useState(() => {
        const storedTheme = localStorage.getItem("dataTheme");
        if (!storedTheme) {
            localStorage.setItem("dataTheme", "dark");
            return "dark";
        }
        return storedTheme;
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', dataTheme);
        localStorage.setItem("dataTheme", dataTheme);
    }, [dataTheme]);

    const color = dataTheme === 'light' ? 'black' : 'white';

    const [folders, dispatch] = useReducer(folderReducer, undefined, () => {
        let initialFolders = { 
            byId: { 
                root: { 
                    id: 'root',
                    type: 'folder',
                    folders: ['Recents'],
                    path: ['root'],
                },
                Recents: {
                    id: 'Recents',
                    type: 'folder',
                    title: 'Recents',
                    path: ['root', 'Recents'],
                    parent: 'root',
                    notes: [],
                },
            }, selection: {
                path: ['Recents'],
                folder: 'Recents',
                note: null,
            }
        };
        /* for (let i = 0; i < 4; i++) {
            initialFolders.byId[`${i}`] = { 
                id: `${i}`,
                type: 'folder',
                title: `Folder ${i}`,
                notes: [],
                folders: [],
                path: ['root', `${i}`]
            };
            initialFolders.byId.root.folders.push(`${i}`)
        } */
        return initialFolders;
    })

    function addFolder(parent, title, initialNotes) {
        if (parent === 'Recents') {
            throw Error(`Invalid parent folder: '${parent}' is restricted to notes only`)
        }
        dispatch({
            type: 'added',
            object: {
                type: 'folder',
                title: title || 'New Folder',
                notes: initialNotes || [],
                folders: [],
            },
            id: generateUID(),
            parent: parent || 'root',
        })
    }

    function addNote(parent, title, description) {
        const id = generateUID()
        dispatch({
            type: 'added',
            object: {
                type: 'note',
                title: title || `Untitled`,
                description: description || 'Description',
                content: {
                    text: ''
                },
            },
            id: id,
            parent: parent || 'Recents',
        })
    }
    
    function change(id, object) {
        dispatch({
            type: 'changed',
            id: id,
            object: object,
        })
    }

    function deleteObj(id) {
        dispatch({
            type: 'deleted',
            id: id,
        })
    }

    function select(id) {
        dispatch({
            type: 'selected',
            id: id,
        })
    }

    function reorder(folderId, toReorder, newOrder) {
        change(folderId, {
            [toReorder]: newOrder
        })
    }

    function getNotesObjects() {
        const ret = {}
        return notes.forEach(n => ret.n = folders.byId[n])
    }

    function getObject(id) {
        return folders.byId[id]
    }

    let notes = folders.byId[folders.selection.folder].notes

    const [sidebarOpen, setSidebarOpen] = useState(true);
    var [sidebarAnimationTiming, setSidebarAnimationTiming] = useState(0)

    return (
        <LevelContext.Provider value={{
            dataTheme,
            setDataTheme,
            color,
            sidebarOpen,
            setSidebarOpen,
            sidebarAnimationTiming,
            setSidebarAnimationTiming,
            folders,
            notes,
            addFolder,
            addNote,
            change,
            deleteObj,
            select,
            reorder,
            getNotesObjects,
            getObject,
        }}>
            {children}
        </LevelContext.Provider>
    )
}