import { useContext, useState } from 'react'
import '../../styles/sidebar/FolderItem.css'
import { LevelContext } from '../../contexts/LevelContext'

export default function Folder({ id, children, indent }) {
    const { select, folders, color } = useContext(LevelContext)
    const selected = id === folders.selection.folder
    const folder = folders.byId[id]
    const hasChildren = folder?.folders?.length > 0
    const [displayChildren, setDisplayChildren] = useState(true)
    return (
        <div className='folder-item-container'>
            <div className='folder-item' onClick={() => select(id)} style={{ background: selected ? 'var(--selection-color)' : 'transparent', paddingLeft: `${indent * 24}px` }}>
                <div className='flex-center'>
                    {hasChildren ?
                        <button className='folder-dropdown flex-center' onClick={() => setDisplayChildren(!displayChildren)}>
                            <svg stroke={color} strokeWidth='1.25' strokeLinecap='round' height="50%" width="50%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
                                <g>
                                    <line x1='1' y1='3' x2='5' y2='7'/>
                                    <line x1='9' y1='3' x2='5' y2='7'/>
                                </g>
                            </svg>
                        </button> :
                        <div className='folder-dropdown'/>
                    }
                    <p className='folder-name'>{folder.title}</p>
                </div>
                <div className='flex-center'>
                    <span>{folder.notes.length}</span>
                </div>
            </div>
            {displayChildren && 
                <div className='child-container'>
                    {children}
                </div>
            }
        </div>
    )
}