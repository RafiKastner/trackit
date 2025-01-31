import React, { Children, cloneElement, isValidElement, useContext, useEffect, useRef, useState } from 'react'
import { LevelContext } from '../contexts/LevelContext'
import { useEditor, EditorContent } from '@tiptap/react'
import { motion } from 'framer-motion';
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import '../styles/tiptap.css'
import Placeholder from '@tiptap/extension-placeholder'

export function Tiptap({ note }) {
	let { folders, change, addNote, sidebarOpen } = useContext(LevelContext)
	const id = folders.selection.note
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Write something...',
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
        ],
        content: note?.content.text || '<p></p>',
    })

    useEffect(() => {
        if (!editor) return

        const updateHandler = ({ editor }) => {
            let title = editor.getJSON().content.sort((a, b) => {
                if (!a.attrs || !a.content) return 1
                else if (b.attrs || !b.content) return -1
                return a.attrs.level - b.attrs.level
            })[0]?.content

            title = !title ? '' : title[0].text

            const description = editor.getText().replace(title, '')

            change(id, { 
                ...(description && {description: description}), 
                title: title,
                content: { 
                    text: editor.getHTML(),
                } 
            })
        }

        const focusHandler = () => {
            if (!note) {
                addNote(folders.selection.folder)
            }
            editor.off("focus", focusHandler)
        }

        editor.on("update", updateHandler)
        editor.on("focus", focusHandler)

        return () => {
            editor.off("update", updateHandler)
            editor.off("focus", focusHandler)
        }
    }, [editor, id, change])

    useEffect(() => {
        if (!editor) return

        const currentContent = editor.getHTML()
        const newContent = note?.content.text || '<p></p>'

        if (currentContent !== newContent) {
            editor.commands.setContent(newContent)
        }
    }, [editor, folders, id])

	return (
		<>
            {id && <MenuBar editor={editor}/>}
            <motion.div animate={{
                height: '100%',
                marginLeft: sidebarOpen ? '0' : '124px',
                marginTop: id ? '0' : '59px',
            }}>
                <EditorContent editor={editor}/>
            </motion.div>
        </>
	  )
}

function MenuBar({ editor }) {
    const { shortcutKey, altKey } = useContext(LevelContext)
    const shiftUnicode = '\u{21E7}'
    return (
        <div className='control flex-center'>
            <div className='control-group'>
                <div className='button-group'>
                    <Dropdown text="Header">
                        {Array(6).fill('_').map((_, index) => {
                            const num = index + 1
                            return (
                                <DropdownItem  key={index} text={`Heading ${num}`} shortcut={shortcutKey + `+${altKey}+${num}`} callback={
                                    () => editor.chain().focus().toggleHeading({ level: num }).run()
                                }/>
                        )})}
                    </Dropdown>
                </div>
                <div className='button-group'>
                    <ControlButton type={'italic'} editor={editor} callback={'toggleItalic'}>
                        Italics
                    </ControlButton>
                    <ControlButton type={'bold'} editor={editor} callback={'toggleBold'}>
                        Bold
                    </ControlButton>
                </div>
                <div className='button-group'>
                    
                </div>
            </div>
        </div>
    )
}

function ControlButton({ editor, type, callback, children }) {
    return (
        <button onClick={() => editor.chain().focus()[callback]().run()}
            disabled={
                !editor.can()
                    .chain()
                    .focus()
                    [callback]()
                    .run()
            }
            className={`control-button ${editor.isActive(type) ? ' is-active' : ''}`}
        >
            {children}
        </button>
    )
}

function Dropdown({ text, children }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)
    useEffect(() => {
        const listener = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener("mousedown", listener)
        return () => document.removeEventListener("mousedown", listener)
    }, [])
    return (
        <div className='dropdown'>
            <button className="control-button" onClick={() => setOpen(!open)}>
                <div></div>
                {text}
            </button>
            {open && 
                <div ref={ref} className='dropdown-children'>
                    {Children.map(children, (child) => {
                        if (isValidElement(child)) {
                            return cloneElement(child, {setOpen})
                        }
                        return child
                    })}
                </div>
            }
        </div>
    )
}

function DropdownItem({ text, shortcut, callback, setOpen }) {
    return (
        <button className='dropdown-item flex-between' onClick={() => {setOpen(false); callback()}}>
            <span className='shortcut-name'>{text} </span>
            <div className='kbd-container'>{shortcut.split('+').map((key, index, array) => (
                <React.Fragment key={index}>
                    <kbd>{key}</kbd>
                </React.Fragment>
            ))}
            </div>
        </button>
    )
}