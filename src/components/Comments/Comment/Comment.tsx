import React, { FC,useState } from "react"
import { IComment, commentId } from "../../../models/IComment"
import { Collapse } from 'antd';
import {IoChevronForwardCircleOutline } from 'react-icons/io5'
import CommentDetails from "./CommentDetails/CommentDetails";
import styles from './Comment.module.css'
import useComments from "../../../hooks/useComments";
interface CommentProps {
  comment: any,
  getChild:(id:commentId,parentId:number)=>void,
  key:number | string
}

const Comment: FC<CommentProps> = ({ comment,getChild,key }) => {
  const { by, id, kids, text, time, childComments,parent,deleted} = comment
 
  const [loading,setLoading]=useState({})
const checkIsactiveTab=(isActive:boolean | undefined)=>kids?.length && <IoChevronForwardCircleOutline size={18} className={isActive ? styles.rotateBottom : styles.rotateRight} />
const toggleCollapse=(e:string[] | string)=>{


  if(kids?.length){
    if(!childComments.length){
      kids.forEach((childId:number)=>getChild(childId,id))
    }
  }
}

const closeCollapse=()=>{

}

  return <React.Fragment key={key}>
    <Collapse
    onChange={(e) =>toggleCollapse(e)}
    className={styles.panelStyle}
    bordered={false}
    defaultActiveKey={[id]}
    expandIcon={({ isActive }) => checkIsactiveTab(isActive)}
    collapsible={undefined}
  >
  <Collapse.Panel
  header={
  <CommentDetails comment={comment}/>
  }
 key={''}
>


{childComments?.length
 ? childComments
 .map((comment:IComment)=><div className={styles.childComment}>
  <Comment
    key={comment.id}
    comment={comment}
    getChild={getChild}
  /></div>) :''
}
</Collapse.Panel>
  </Collapse>
  </React.Fragment>

}
export default Comment