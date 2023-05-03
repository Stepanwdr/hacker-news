import { FC} from "react";
import useStories from "../../hooks/useStories";
import Stories from "../../components/Stories/Stories";
import {Space} from 'antd'

const Home: FC = () => {
const {storiesList,storyIds,getStories}=useStories()
    return <Space>
        <Stories storiesList={ storiesList} storyIds={storyIds}  refreshStories={getStories}/>
          </Space>
}
export default Home