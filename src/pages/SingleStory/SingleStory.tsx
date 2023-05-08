import { FC, useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Typography, Alert, Skeleton, Divider, Button } from 'antd'
import { IComment, commentId } from "../../models/IComment"
import { IoChatbubbleEllipsesOutline, IoArrowUndoOutline } from 'react-icons/io5'
import { grey } from "../../consts/colors"
import { IStory, storyId } from "../../models/IStory"
import storyServices from "../../apiServices/storyServices"
import Story from "../../components/Stories/Story/Story"
import Comments from '../../components/Comments/Comments'
import styles from './SingleStory.module.css'
import useComments from "../../hooks/useComments"
import CommentsContext from "../../context/ComentsContext"



const SingleStory: FC = () => {

    const { storyId } = useParams()
    const [loading, setLoading] = useState(true as boolean)
    const [error, setError] = useState('')
    const [singleStoryData, setSingleStoryData] = useState({} as IStory)
    const [comments, setComments] = useState([] as IComment[])
    const { fetchCommentsByIds,updateCommentTree} = useComments()
    const getChildComments = async (id: commentId, parentId: number) => {
        try {
            const res = await storyServices.fetchCommentById(id)
            res.data.childComments=[]
            setComments(comments=>updateCommentTree(comments,parentId,res.data))
        } catch (e:any) {
               setError(e.message)
        }
    }
    const getParentComments = async (id: commentId) => {
        try{
            setLoading(true)
            setError('')
            const res = await storyServices.fetchCommentById(id)
            if (!comments.length) {
                res.data.childComments=[]
                setComments(prev=>([...prev,res.data]))
            }

        }catch(e: any) {
            setError(e.message)
        }
    }

    const getSingleStoryData = async (storyId: storyId) => {
        try {
            setLoading(true)
            setError('')
            setComments([])
            const res = await storyServices.fetchStoryById(+storyId)
            setSingleStoryData(res.data)
            if (res.data?.kids?.length) {
                fetchCommentsByIds(res.data.kids, getParentComments)
            }
            setLoading(false)
        } catch (e: any) {
            setError(e.message)
        }
           }
    useEffect(() => {
        if (storyId) {
            getSingleStoryData(+storyId)
        }
    }, [storyId])
    return (
        <CommentsContext.Provider value={comments}>
        <Skeleton loading={loading}>
            <Link to={'/'}>
                <Button title="Back to News">
                    <IoArrowUndoOutline />
                </Button>
            </Link>
            <div className={styles.singleStoryCintainer}>
                {error && <Alert message={error} type="warning" />}
                <Story story={singleStoryData} />
                <Divider className={styles.comentsDivider} />
                <div>
                    <div className={styles.commentsHead}>
                        <IoChatbubbleEllipsesOutline color={grey} size={16} />
                        <Typography.Title level={5}> Comments </Typography.Title>
                    </div>
                    <>
                        <Divider className={styles.comentsDivider} />
                        {
                            comments?.length
                                ?
                                <Comments comments={comments} getComments={getParentComments} getChild={getChildComments} />
                                :
                                <Typography.Text>
                                    No Comments
                                </Typography.Text>
                        }
                    </>
                </div>
            </div>
        </Skeleton>
        </CommentsContext.Provider>
    )
}
export default SingleStory