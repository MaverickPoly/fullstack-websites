export interface ApiReturnPayload {
    success: boolean,
    message: string,
    data?: Note
} 


export interface Note {
    id: number,
    title: string,
    description: string,
    created_at: string,
    updated_at: string,
    author: string
}

export interface UserType {
    id: number,
    username: string,
    email: string,
    password: string,
}
