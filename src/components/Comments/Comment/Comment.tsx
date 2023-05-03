import { FC } from "react"
import { IComment, commentId } from "../../../models/IComment"
import { Collapse } from 'antd';
import { IoPersonOutline, IoBarChartOutline, IoChatbubbleEllipsesOutline, IoTimeOutline, IoLinkOutline, IoChevronForwardCircleOutline } from 'react-icons/io5'
import styles from './Comment.module.css'
import { grey } from "../../../consts/colors"
import moment from "moment"
/*
export interface IComment{
    by:string,
    id:number
    kids:number[],
    parent : number,
    text:string,
    time : string,
    type: string
}
*/
interface CommentProps {
  comment: IComment,
  getComments:(id:commentId)=>void
}
const panelStyle = {
 

};
const Comment: FC<CommentProps> = ({ comment,getComments }) => {
  const { by, id, kids, parent, text, time, type,childComments } = comment

const getChildComments=(e:string[] | string)=>{
  console.log(e)
  if(e?.length){
    if(kids?.length){
      getComments(kids[0])
    }
  
  }
     
}
console.log(comment)
  return <Collapse
    onChange={(e) =>getChildComments(e)}
 className={styles.panelStyle}
    bordered={false}
    defaultActiveKey={[id]}
    expandIcon={({ isActive }) => kids?.length && <IoChevronForwardCircleOutline size={18} className={isActive ? styles.rotateBottom : styles.rotateRight} />}
    style={{ background: '--grey' }}
    collapsible={undefined}
  >
  <Collapse.Panel
  header={
    <div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className={styles.details}>
        <p className={styles.detail}>
          <IoPersonOutline color={grey} /> <span>{by}</span>
        </p>
        <p className={styles.detail}>
          <IoTimeOutline color={grey} /> <span>{moment(time).format('MMMM Do YYYY, h:mm:ss a')} </span>
        </p>
        <p className={styles.detail}>
          <IoChatbubbleEllipsesOutline color={grey} /> <span> {kids?.length ? kids?.length : 0}</span>
        </p>
      </div>
    </div>
  }
  key={''}
  style={panelStyle}
>

{childComments?.length ? <Comment comment={comment} getComments={getComments}/>:<>no comments</>}

</Collapse.Panel>

  </Collapse>
}
export default Comment