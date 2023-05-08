const comment ={
     id:1,
     parent:5,
     text:"123545645",
     kids:[9,10],
       childrens:[]
}
const comment2 ={
    id:1,
    parent:15,
    text:"123545645",
    kids:[9,10],
    childrens:[]
}
 const fakeComments=[
    {   id:1,
        parent:5,
        text:"swdsdsd123545645",
        kids:[4,5],
        childrens:[]
   },
   {   id:2,
    parent:3,
    text:"00ds0dsd1235a45645",
    childrens:[]
},
{   id:3,
    parent:2,
    text:"123545sdasdasdas645",
    childrens:[]
}, 
{   id:4,
    parent:1,
    kids:[2,3],
    text:"123aaadads545645",
    childrens:[]
},
{   id:9,
    parent:2,
    text:"sdsdsaddsa",
    childrens:[]
},
{   id:6,
    parent:2,
    text:"asasas",
    childrens:[]
},
{   id:5,
    parent:2,
    text:"555555asasas",
    childrens:[
        { id:15,
         parent:5,
         text:"123545645",
        kids:[9,10]}
    ]
},
]





export const recursivTree=(arr,child)=>{
return arr?.map(com=>{
    if(com.id===child.parent){
     return {
        ...com,
        childrens:[...com.childrens,child]
     }
    }
    if(com?.childrens?.length){
        console.log(com)
    return {
     ...com,
    childrens:recursivTree(com?.childrens,child)
    }
    }
  
    return com
})
}

