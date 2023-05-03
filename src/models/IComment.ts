
export type commentId=number



export interface IComment{
    by:string,
    id:commentId
    kids:commentId[],
    parent : number,
    text:string,
    time : string,
    type: string,
    childComments?:IComment[]
}

