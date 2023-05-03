import axios, { AxiosPromise } from "axios";
import {IStory, storyId} from '../models/IStory'
import { IComment, commentId } from "../models/IComment";
export const baseApi=axios.create({
  baseURL:"https://hacker-news.firebaseio.com/v0/",
  params:{
   'print':"pretty"
  }
})
export default class apiServices {
  static async fetchStoriesIds():Promise<AxiosPromise> {
    return await baseApi('/newstories.json')
  }
  static async fetchStoryById(id:storyId):Promise<AxiosPromise<IStory>> {
    return await baseApi(`/item/${id}.json`)
  }
  static async fetchCommentById(id:commentId):Promise<AxiosPromise<IComment>> {
    return await baseApi(`/item/${id}.json`)
  }
} 

