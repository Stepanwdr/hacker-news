import { FC } from "react"
import styles from './CommentDetails.module.css'
import { IoPersonOutline, IoChatbubbleEllipsesOutline, IoTimeOutline, IoChevronForwardCircleOutline } from 'react-icons/io5'
import moment from "moment"
import { grey } from "../../../../consts/colors"

interface CommentProps {
    comment: any,
  
  }
const CommentDetails:FC<CommentProps>=({comment})=>{
      const { by, id, kids, text, time, childComments,parent } = comment
    return <div>
    <div>
      <p dangerouslySetInnerHTML={{ __html: comment.text }} />
    </div>
    <div className={styles.details}>
      <p className={styles.detail}>
        <IoPersonOutline color={grey} /> <span>{by}</span>
      </p>
      <p className={styles.detail}>
        <IoTimeOutline color={grey} />
         <span>{moment(time).format('MMMM Do YYYY, h:mm:ss a')} </span>
      </p>
      <p className={styles.detail}>
        <IoChatbubbleEllipsesOutline color={grey} /> <span> {kids?.length ? kids?.length : 0}</span>
      </p>
    </div>
  </div>
}
export default CommentDetails