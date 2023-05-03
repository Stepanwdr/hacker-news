import { useState } from "react"
import { IComment, commentId } from "../models/IComment"



interface useCommentsTypes{
    fetchCommentsByIds:(ids: commentId[],cb:(id:commentId)=>void) => void
}


const useComments=():useCommentsTypes=>{

    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')
    const [comments,setComments]=useState([] as IComment[])


    const fetchCommentsByIds = (ids: commentId[],cb:(id:commentId)=>void) => {
        ids.forEach((id: number) => cb(id))
    }
  
  
return{
    fetchCommentsByIds
}
}

export default useComments