import { FC} from "react";
import useStories from "../../hooks/useStories";
import Stories from "../../components/Stories/Stories";
import {Skeleton} from 'antd'

const Home: FC = () => {
const {storiesList,storyIds,getStories,loading}=useStories()
    return <Skeleton loading={loading}>
        <Stories storiesList={ storiesList} storyIds={storyIds}  refreshStories={getStories}/>
                </Skeleton>
}
export default Home