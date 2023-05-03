export type storyId=number

export interface IStory{
    by:string
    descendants : number,
    id: number,
    kids? : storyId[],
    score : number,
    time: number,
    title : string,
    type : string,
    url : string
}