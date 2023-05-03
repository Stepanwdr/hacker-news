import { FC, useEffect, useState } from "react"
import { useParams,Link } from "react-router-dom"
import { Typography, Alert, Skeleton, Divider,Button } from 'antd'
import { IComment,commentId } from "../../models/IComment"
import { IoChatbubbleEllipsesOutline,IoArrowUndoOutline } from 'react-icons/io5'
import { grey } from "../../consts/colors"
import { IStory, storyId } from "../../models/IStory"
import storyServices from "../../apiServices/storyServices"
import Story from "../../components/Stories/Story/Story"
import Comments from '../../components/Comments/Comments'
import styles from './SingleStory.module.css'
import useComments from "../../hooks/useComments"

const SingleStory: FC = () => {
    const [loading, setLoading] = useState(false)
    const [loadedIdems, setLoadedItems] = useState({})
    const [error, setError] = useState('')
    const [singleStoryData, setSingleStoryData] = useState({} as IStory)
    const [comments, setComments] = useState([] as IComment[] )
    const { storyId } = useParams()
    const {fetchCommentsByIds} =useComments()
    const [treeData, setTreeData] = useState([]);
    interface DataNode {
        title: string;
        key: string;
        isLeaf?: boolean;
        children?: DataNode[];
      }
    const updateTreeData = (list: IComment[], id: commentId, childComments: IComment[]): any =>{
        console.table({
            list,id,childComments
        })
       return list.map((comment) => {
            if (comment.id === id) {
              return {
                ...comment,
                ...childComments
              };
            }
            if (comment.childComments) {
              return {
                ...comment,
                childComments: updateTreeData(comment.childComments, id, childComments),
              };
            }
            return { 
                 ...comment,
                ...childComments
            };
          })
    }

/*
    const onLoadData = ({ key, children }: any) =>
    new Promise<void>((resolve) => {
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setComments((comment) =>
          updateTreeData(comment, key, [
            { title: 'Child Node', key: `${key}-0` },
            { title: 'Child Node', key: `${key}-1` },
          ]),
        );

        resolve();
      }, 1000);
    });
*/




    const getComments = async (id: commentId) => {
        try {
            setLoading(true)
            setError('')
            const res = await storyServices.fetchCommentById(id)
            console.log(res?.data)

            if(!comments.length){
                setComments((comment)=>[...comment,res?.data])
            }     
            setComments((comments:IComment[])=>{
                   let arr=[...comments]
                  console.log( arr=[...updateTreeData(comments,id,[res.data])],'asasa')
                   console.log(arr)
                  return arr
            })
        } catch (e: any) {
            setError(e.message)
        }
    }

    const getSingleStory = async (storyId: storyId) => {
        try {
            setLoading(true)
            setError('')
            const res = await storyServices.fetchStoryById(+storyId)
            setSingleStoryData(res.data)
            setComments([])
            if (res.data?.kids?.length) {
                fetchCommentsByIds(res.data.kids,getComments)
            }
            setLoading(false)
        } catch (e: any) {
            setError(e.message)
        }

    }
    useEffect(() => {
        if (storyId) {
            getSingleStory(+storyId)
        }
    }, [storyId])
    return (
        <Skeleton loading={loading}>
            <Link to={'/'}> 
            <Button title="Back to News">
            <IoArrowUndoOutline/>
            </Button>
            </Link>
            <div className={styles.singleStoryCintainer}>
                {error && <Alert message={error} type="warning" />}
                <Story story={singleStoryData} loading={loading} />
                <Divider className={styles.comentsDivider} />
                <div>
                    <div className={styles.commentsHead}>
                        <IoChatbubbleEllipsesOutline color={grey} size={16}/>
                        <Typography.Title level={5}> Comments </Typography.Title>
                    </div>
                    <>
                    <Divider className={styles.comentsDivider} />
                        {
                            comments?.length
                                ?
                                <Comments comments={comments} getComments={getComments} />
                                :
                                <Typography.Text>
                                    No Comments
                                </Typography.Text>
                        }
                    </>
                </div>
            </div>
        </Skeleton>
    )
}
export default SingleStory