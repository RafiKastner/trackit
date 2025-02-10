import React, { useContext, useEffect, } from 'react'
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
import { Dropdown, DropdownItem, ShortCut } from './ui/dropdown';

export function Tiptap({ note }) {
	const { folders, change, addNote, } = useContext(LevelContext)
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
            <div style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                height: '100%'
            }}>
                <motion.div
                style={{
                    height: '100%',
                    marginTop: id ? '0' : '49px',
                    maxWidth: '912px',
                    width: '100%',
                }}
                >
                    <EditorContent editor={editor}/>
                </motion.div>
            </div>
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
                    <Dropdown inner="Header">
                        {Array(6).fill('_').map((_, index) => {
                            const num = index + 1
                            return (
                                <DropdownItem  key={index} text={`Heading ${num}`} right={
                                    <ShortCut keys={[shortcutKey, altKey, num]}/>
                                } callback={
                                    () => editor.chain().focus().toggleHeading({ level: num }).run()
                                }/>
                        )})}
                    </Dropdown>
                    <ControlButton type={'taskItem'} editor={editor} callback={'toggleTaskList'}>
                        Checkbox
                    </ControlButton>
                    <Dropdown inner="List">
                        <DropdownItem text='List' right={
                            <ShortCut keys={[shortcutKey, shiftUnicode, '7']}/>
                        } callback={
                            () => editor.chain().focus().toggleBulletList().run()
                        }/>
                        <DropdownItem text='Ordered List' right={
                            <ShortCut keys={[shortcutKey, shiftUnicode, '8']}/>
                        } callback={
                            () => editor.chain().focus().toggleOrderedList().run()
                        }/>
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

function ControlButton({ editor, type, callback, children, highlight = true}) {
    return (
        <button onClick={() => editor.chain().focus()[callback]().run()}
            disabled={
                !editor.can()
                    .chain()
                    .focus()
                    [callback]()
                    .run()
            }
            className={`control-button ${editor.isActive(type) && highlight ? ' is-active' : ''}`}
        >
            {children}
        </button>
    )
}