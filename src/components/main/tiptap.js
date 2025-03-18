import React, { useContext, useEffect, useState, } from 'react'
import { LevelContext } from '../../contexts/LevelContext'
import { useEditor, EditorContent } from '@tiptap/react'
import { motion } from 'framer-motion';
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Document from '@tiptap/extension-document';
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import '../../styles/main/tiptap.css'
import Placeholder from '@tiptap/extension-placeholder'
import { Dropdown, DropdownItem, ShortCut, SubDropdown } from '../ui/dropdown';
import { DropdownContextProvider } from '../../contexts/DropdownContext';
import { schema } from '@tiptap/pm/markdown';


const toggleTaskItem = (editor, state) => {
    editor.chain().focus().updateAttributes('taskItem', {
        checked: state || !editor.getAttributes('taskItem').checked
    }).run()
}

export function Tiptap({ note }) {
	const { folders, change, addNote, } = useContext(LevelContext)
	const id = folders.selection.note

    //fix placeholder not appearing with this
    const CustomDocument = Document.extend({
        content: 'heading block*',
    })

    const editor = useEditor({
        extensions: [
            CustomDocument,
            StarterKit.configure({
                document: false,
            }).extend({
                addKeyboardShortcuts() {
                    return {
                        'Mod-Alt-s': () => this.editor.commands.setHorizontalRule(),
                        'Mod-Shift-.': () => toggleTaskItem(editor)
                    }
                },
            }),
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
            {id && 
                <DropdownContextProvider>
                    <MenuBar editor={editor}/>
                </DropdownContextProvider>
            }
            <div
            className='tiptap-container flex-center'
            style={{
                height: '100%',
                marginTop: id ? '0' : '64.5px',//make this automatic ideally
            }}
            >
                <TiptapPadding editor={editor}/>
                <EditorContent editor={editor}/>
                <TiptapPadding editor={editor}/>
            </div>
        </>
	  )
}

function TiptapPadding({ editor }) {
    const { sidebarOpen, sidebarAnimationTiming } = useContext(LevelContext)
    return (
        <motion.div 
            className='tiptap-padding' 
            onClick={() => editor.chain().focus().run()}
            style={{ width: sidebarOpen ? '24px' : '56px' }}
            animate={{ width: sidebarOpen ? '24px' : '56px' }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: sidebarOpen ? 0 : sidebarAnimationTiming }}
        />
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
                        <DropdownItem text='Block Quote' right={
                                <ShortCut keys={[shortcutKey, shiftUnicode, 'B']}/>
                            } callback={
                                () => editor.chain().focus().toggleBlockquote().run()
                        }/>
                        <SubDropdown text='Todo'>
                            <DropdownItem text='Todo' right={
                                    <ShortCut keys={[shortcutKey, shiftUnicode, '9']}/>
                                } callback={
                                    () => editor.chain().focus().toggleTaskList().run()
                            }/>
                            <DropdownItem text='Toggle' right={
                                    <ShortCut keys={[shortcutKey, shiftUnicode, '.']}/>
                                } callback={ 
                                    () => toggleTaskItem(editor)
                            }/>
                            <DropdownItem text='Mark as Completed' callback={
                                () => toggleTaskItem(editor, true)
                            }/>
                            <DropdownItem text='Mark as Incomplete' callback={
                                () => toggleTaskItem(editor, false)
                            }/>
                            <hr/>
                            <DropdownItem text='Move Completed to Bottom' callback={
                                () => moveCompletedToBottom(editor)
                            }/>
                        </SubDropdown>
                        <hr/>
                        <DropdownItem text='Separator' right={
                                <ShortCut keys={[shortcutKey, altKey, 'S']}/>
                            } callback={
                                () => editor.chain().focus().setHorizontalRule().run()
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

function moveCompletedToBottom(editor) {
    const selection = editor.view.state.selection
    const { $from } = selection
    const parentDepth = selection.$from.depth - 2
    const parent = selection.$from.node(parentDepth)
    if (parent.type.name !== 'taskList') return
    const nodes = []
    //get each child node from the parent
    parent.forEach((node) => {
        nodes.push(node)
    })
    //sort nodes by attrs.checked true last
    nodes.sort((a, b) => {
        if (a.attrs.checked === b.attrs.checked) return 0
        else if (a.attrs.checked && !b.attrs.checked) return 1
        else return -1
    })
    //and then map new taskItems with the same content
    .map((node) => editor.schema.nodes.taskItem.create(
        { checked: node.attrs.checked },
        node.content
    ))
    editor.chain().focus().command(({ tr, dispatch }) => {
        //make a taskList fragment containing all listItems
        const fragment = editor.schema.nodes.taskList.create(null, nodes)
        console.log(fragment)
        //replace from the start of the parent taskList to the end with our new taskList fragment
        tr.replaceWith($from.before(parentDepth), $from.after(parentDepth), fragment)
        if (dispatch) dispatch(tr)
        return true
    }).run()
}