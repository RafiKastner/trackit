export default function folderReducer(folders, action) {
	const [namespace, actionType] = action.type.split('/')
	switch (namespace) {
		case 'folder': {
			switch (actionType) {
				case 'added': {
					editFolderWithPath(folders, action.path, (folder) => ({
						...folder,
						folders: [
							...folder.folders,
							{
								type: 'folder',
								id: action.id,
								title: action.title,
								notes: action.notes,
								folders: action.folders,
								path: `${action.path}/${action.id}`,
								parent: folder.id,
							}
						]
					}))
				}
				case 'changed': {
					return editFolderWithPath(folders, action.path, (folder) => ({
						...folder,
						...action.folder,
					}))
				}
				case 'deleted': {
					let path = action.path.split('/')
					let id = path.pop()
					path = path.join('/') || '/' //remove id of folder from path
					console.log(path, id)
					if (path === '/') {
						return folders.filter(f => f.id !== id)
					}
					return editFolderWithPath(folders, path, (folder) => ({
						...folder,
						folders: folder.folders.filter(f => f.id !== id)
					}))
				}
				default: {
					throw Error('Unknown folder action: ' + actionType)
				}
			}
		}
		case 'note': {
			let path = action.path.split('/')
			let id = path.pop()
			path = path.join('/') || '/'
			switch (actionType) {
				case 'added': {
					return editFolderWithPath(folders, action.path, (folder) => ({
						...folder,
						notes: [
							...folder.notes,
							{
								type: 'note',
								id: action.id,
								title: action.title,
								description: action.description,
								parent: folder.id,
								path: `${action.path}/${action.id}`,
							}
						]
					}))
				}
				case 'changed': {
					return editFolderWithPath(folders, path, (folder) => {
						let note = folder.notes.find(n => n.id === id)
						let newNotes = [...folder.notes].filter(n => n.id !== id)
						return {
							...folder,
							notes: [
								...newNotes,
								{
									...note,
									...action.note
								}
							]
						}
					})
				}
				case 'deleted': {
					return editFolderWithPath(folders, path, (folder) => ({
						...folder,
						notes: folder.notes.filter(n => n.id !== id)
					}))
				}
				default: {
					throw Error('Unknown note action: ' + action.type)
				}
			}
		}
		default: {
			throw Error('Unknown namespace: ' + namespace)
		}
	}
}

function recursiveFolderLookUp(folders, path, todo, depth = 1) {
	return folders.map(folder => {
		if (folder.id === path[depth]) {
			if (depth === path.length - 1) {
				return todo(folder) || folder
			}
			else {
				return {
					...folder,
					folders: recursiveFolderLookUp(folder.folders, path, todo, depth + 1)
				}
			}
		}
		return folder
	})
}

export function editFolderWithPath(folders, path, todo) {
	if (path === '/' || path === '') {
		return [...folders, todo({})] || folders
	}
	const split = path.split('/')

	return recursiveFolderLookUp(folders, split, todo)
}