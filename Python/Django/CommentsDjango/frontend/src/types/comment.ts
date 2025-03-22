import { RequestState } from "./request";

export interface Comment {
    id: number,
    title: string,
    content: string,
    created_at: string,
    updated_at: string,
    username: string,
    image_url: string,
}


export interface CommentCreatePayload {
    title: string,
    content: string,
    username: string,
    image_url: string,
}

export interface CommentEditPayload {
    id: number
    title: string,
    content: string,
    username: string,
    image_url: string,
}

export interface CommentsContextType {
    comments: Comment[];
    fetchComments: () => Promise<RequestState>;
    createComment: (payload: CommentCreatePayload) => Promise<RequestState>;
    getComment: (params: { id: number }) => Promise<RequestState>;
    deleteComment: (params: { id: number }) => Promise<RequestState>;
    updateComment: (payload: CommentEditPayload) => Promise<RequestState>;
  }

