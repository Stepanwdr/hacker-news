import { useState } from "react"
import { IComment, commentId } from "../models/IComment"

interface commentLoadingType{
id:number
}

interface useCommentsTypes {
    fetchCommentsByIds: (ids: commentId[], cb: (id: commentId) => void) => void
    changeComments: (coments: IComment[]) => void
    comments: IComment[],
    updateCommentTree: (comments: IComment[], id: commentId, newComment: IComment) => any,
    setCommentIsloaded:(id: commentId)=>void,
    commentIsloading:commentLoadingType
}

const useComments = (): useCommentsTypes => {
    const [commentIsloading, setCommentIsLoading] = useState({} as commentLoadingType)
    const [error, setError] = useState('')
    const [comments, setComments] = useState([] as IComment[])
    const updateCommentTree = (comments: IComment[], id: commentId, newComment: IComment): any => {
        return comments.map((comment: IComment) => {
            if (comment.id === newComment.parent) {
                if (comment?.childComments) {
                    return {
                        ...comment,
                        childComments: [...comment?.childComments, newComment]
                    }
                }
                 }
            if (comment?.childComments) {
                return {
                    ...comment,
                    childComments: updateCommentTree(comment.childComments, id, newComment)
                }
            }
            return comment
        })
    }
    const changeComments = (comments: IComment[]) => {
        setComments(comments)
    }
    const fetchCommentsByIds = (ids: commentId[], cb: (id: commentId) => void) => {
        ids.forEach((id: number) => cb(id))
    }
    const setCommentIsloaded=(id:commentId)=>{
        console.log(id)
    setCommentIsLoading({...commentIsloading,id})
    }
        return {
            fetchCommentsByIds,
            comments,
            changeComments,
            updateCommentTree,
            setCommentIsloaded,
            commentIsloading
        }
}

export default useComments