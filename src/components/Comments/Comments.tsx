import { FC} from "react";
import { IComment, commentId } from "../../models/IComment";
import Comment from "../Comments/Comment/Comment"
import styles from './Comments.module.css'
import useComments from "../../hooks/useComments";
interface CommentsProps{
    comments:IComment[],
    getComments:(id:commentId)=>void,
    getChild:(id:commentId,parentId:number)=>void
}

const Comments:FC<CommentsProps>=({getChild,comments})=>{

return ( <>
            {
                comments
                .sort((a:IComment,b:IComment)=>+a?.time - +b?.time)
                .map((comment:IComment)=>(
                    !comment.deleted 
                    ? 
                    <Comment
                        key={comment.id}
                        comment={comment}
                        getChild={getChild}
                        />
                     :<div className={styles.deletedComent}>Comment is deleted</div>))
             }
</>)

}
export default Comments