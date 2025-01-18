export default function folderReducer(folders, action) {
	switch (action.type) {
		case 'added': {
			const parentFolder = folders.byId[action.parent]
			const Recents = folders.byId['Recents']
			const type = action.object.type
			const path = [...parentFolder.path, action.id]

			return {
				...folders,
				byId: {
					...folders.byId,
					Recents: {
						...Recents,
						notes: type === 'note'
    						? [...Recents.notes, action.id]
   							: [...Recents.notes],
					},
					[action.parent]: {
						...parentFolder,
						...(type === 'folder' ? 
						{ 
							folders: [
								...parentFolder.folders,
								action.id
							]
						} : 
						{
							notes: [
								...parentFolder.notes,
								action.id
							]
						})
					},
					[action.id]: {
						...action.object,
						parent: action.parent,
						path: path,
					}
				},
				...selection(folders, action, type, path)
			}
		}
		case 'changed': {
			return {
				...folders,
				byId: {
					...folders.byId,
					[action.id]: {
						...folders.byId[action.id],
						...action.object
					}
				}
			}
		}
		case 'deleted': {
			//make deleting shit work so it deletes sub-folders but allows notes
			//to migrate to recents
			const newById = {...folders.byId}
			const obj = newById[action.id]
			const parent = newById[obj.parent]
			if (obj.type === 'folder') {
				const index = parent.folders.indexOf(action.id)
				if (index !== -1) {
					parent.folders.splice(index, 1);
				}
				const of = obj.folders
				for (let i=0; i<of.length; i++) {
					delete newById[of[i]]
				}
				const on = obj.notes
				for (let i=0; i<on.length; i++) {
					newById[on[i]].parent = 'Recents'
				}
			} else if (obj.type === 'note') {
				let index = parent.notes.indexOf(action.id)
				if (index !== -1) {
					parent.notes.splice(index, 1);
				}
				const Recents = newById['Recents'].notes
				index = Recents.indexOf(action.id)
				if (index !== -1) {
					Recents.splice(index, 1);
				}
			}
			delete newById[action.id]
			return {
				...folders,
				byId: newById
			}
		}
		case 'selected': {
			const obj = folders.byId[action.id]
			return {
				...folders,
				...selection(folders, action, obj.type, obj.path)
			}
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}

function selection(folders, action, type, path) {
	const ret = {
		selection: {
			...folders.selection,
			[type]: action.id,
			path: path,
			note: type === 'folder' ? null : action.id,
		}
	}
	return ret
}