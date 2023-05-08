import { FC } from "react";
import { IStory } from "../../models/IStory"
import { Row, Typography, Button, Divider } from 'antd'
import { IoRefreshCircleOutline } from 'react-icons/io5'
import styles from './Stories.module.css'
import Story from './Story/Story'
interface StoriesProps {
    storiesList: IStory[],
    storyIds: number[]
    refreshStories: () => void
}
const Stories: FC<StoriesProps> = ({ storiesList, storyIds, refreshStories }) => {
    return <div className={styles.storiesConatiner}>
        <div className={styles.top}>
            <Typography.Title level={4}>News</Typography.Title>
            <Button className={styles.refreshBtn} onClick={refreshStories}>
                <IoRefreshCircleOutline /> <span>Refresh news</span>
            </Button>
        </div>
        <div className={styles.storyListContainer}>
            <ol>
                {storiesList.sort((a: IStory, b: IStory) => b.time - a.time).map((story: IStory) => (
                    <li key={story.id}> <Story story={story} /></li>
                ))}
            </ol>
        </div>

    </div>
}
export default Stories