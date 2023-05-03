import {FC} from "react"
import { IStory } from "../../../models/IStory"
import styles from './Story.module.css'
import {IoPersonOutline,IoBarChartOutline,IoChatbubbleEllipsesOutline,IoTimeOutline,IoLinkOutline} from 'react-icons/io5'
import {Row,Typography,Space,Skeleton, Divider} from 'antd'
import {grey} from '../../../consts/colors'
import moment from 'moment'
 import {Link} from 'react-router-dom'
interface StoryProps{
    story:IStory,
    loading:boolean
}
const Story:FC<StoryProps>=({story,loading})=>{
  const {title,id,score,url,by,kids,time}=story
    return (
       <div className={styles.storyContainer}>
      <div className={styles.storyHeader}>
      <Link to={`/${id}`}>
            <Typography.Title level={4}>
                 {title}
            </Typography.Title>
         </Link>
         {url && <a 
         href={url}
         className={styles.url}
           target="_blank"
           >
            <IoLinkOutline   color={grey} size={16}/>
              <span >{url}</span>
         </a>}
      </div>
         <div className={styles.details}>
         <p className={styles.detail}>
          <IoPersonOutline color={grey}/> <span>{by}</span>
         </p>
          <p className={styles.detail}>
           <IoBarChartOutline color={grey}/> <span>{score}</span>
          </p>
          <p className={styles.detail}>
          <IoTimeOutline color={grey}/> <span>{moment(time).format('MMMM Do YYYY, h:mm:ss a')} </span>
          </p>
          <p className={styles.detail}>
            <IoChatbubbleEllipsesOutline color={grey}/> <span> {kids?.length ? kids?.length : 0}</span>
          </p>
       </div>
    </div>
    )
}

export default Story