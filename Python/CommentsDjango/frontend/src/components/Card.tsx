import { Link } from "react-router-dom"
import { Comment } from "../types"

const Card = ({comment}: {comment: Comment}) => {
  return (
    <div className="w-full rounded-md overflow-hidden bg-neutral-100">
      <img src={comment.image_url} alt={`${comment.title} Image`}  className="w-full h-52 object-cover"/>
      <div className="flex flex-col items-start p-3">
        <Link to={`/${comment.id}`} className="text-xl text-neutral-900 font-semibold hover:underline">{comment.title}</Link>
        <h4 className="font-normal text-neutral-700">{comment.username}</h4>
        <span className="text-sm font-normal text-neutral-700">Date: {comment.created_at.split("T")[0]}</span>
      </div>
    </div>
  )
}

export default Card