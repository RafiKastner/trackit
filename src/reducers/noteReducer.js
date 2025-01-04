function handleAddNote(text) {
	dispatch({
		type: 'added',
		id: 0,
		text: text,
	})
}

function handelChangeNote(note) {
	dispatch({
		type: 'changed',
		note: note,
	})
}

function handleDeleteNote(noteId){
	dispatch({
		type: 'deleted',
		id: noteId
	})
}