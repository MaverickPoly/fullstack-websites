import { Comment } from "./comment"

export interface RequestState {
    success: boolean,
    message: string,
    data?: Comment
}
