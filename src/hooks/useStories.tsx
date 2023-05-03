import { useEffect, useState } from "react"
import apiServices from "../apiServices/storyServices"
import { IStory, storyId } from "../models/IStory"


interface UseStoriesTypes{
    storiesList:IStory[],
    error:string | null,
    loading:boolean,
    storyIds :storyId[],
    getStories:()=>void
}

const useStories = ():UseStoriesTypes => {
       let interval:any
    const [storiesList, setStoriesList] = useState([] as IStory[])
    const [storyIds,setStoryIds]=useState([] as number[])
    const [error, setError] = useState('' as string | null)
    const [loading, setLoading] = useState(true as boolean)
    const fetchStory = async (id: storyId) => {
        const res = await apiServices.fetchStoryById(id)
        setStoriesList((prev)=>[...prev, res.data])
    }
    const debounceFetch=(cb:()=>void,time:number)=>{
        return ()=>{
            if(interval)clearInterval(interval)
            interval=setInterval(()=>cb(),time)
        }
    }
    const getStories = async () => {
        try {
            setLoading(true)
            setStoriesList([])
            const res = await apiServices.fetchStoriesIds()
            res.data.splice(100)
            setStoryIds(res.data)
            res.data.forEach((id: storyId) => {
                fetchStory(id)
            })
            setLoading(false)
        } catch (e:any) {
            setError(e.message)
        }
    }

    useEffect(() => {
        getStories();
         interval = debounceFetch(()=>getStories(),60000);
        return () => clearInterval(interval);
    }, [])
    return {
        storiesList,
        error,
        loading,
        storyIds,
        getStories
    }
}
export default useStories