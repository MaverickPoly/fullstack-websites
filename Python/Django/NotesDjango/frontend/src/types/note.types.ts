import { ApiReturnPayload, Note } from "./general.types"

export interface CreateNotePayload {
    title: string,
    description: string,
}

export interface UpdateNotePayload {
    id: number,
    title: string,
    description: string
}

export interface NotesContextPayload {
    notes: Note[],
    getAllNotes: () => Promise<ApiReturnPayload>,
    createNote: (props: CreateNotePayload) => Promise<ApiReturnPayload>,
    getNote: ({id}: {id: number}) => Promise<ApiReturnPayload>,
    deleteNote: ({id}: {id: number}) => Promise<ApiReturnPayload>,
    updateNote: (props: UpdateNotePayload) => Promise<ApiReturnPayload>,
}