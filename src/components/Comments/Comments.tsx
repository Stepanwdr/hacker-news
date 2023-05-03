import { FC,useState } from "react";
import { IComment, commentId } from "../../models/IComment";
import Comment from "../Comments/Comment/Comment"
interface CommentsProps{
    comments:IComment[],
    getComments:(id:commentId)=>void
}


const Comments:FC<CommentsProps>=({comments,getComments})=>{
const [openedComments,setOpenedComents]=useState({} as any)
return ( <>
{comments.sort((a:IComment,b:IComment)=>+a.time - +b.time).map((comment:IComment)=>(<Comment
getComments={getComments}
 key={comment.id} comment={comment}/>))}
</>)

}
export default Comments