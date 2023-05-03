import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home/Home'
import SingleStory from '../pages/SingleStory/SingleStory'

const AppRoutes=()=>{
    return  (
             <Routes>
             <Route path='/' element={<Home/>}/>
                <Route path='/:storyId' element={<SingleStory/>}/>
             </Routes>
    )
}
export default AppRoutes
