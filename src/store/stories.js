import { makeAutoObservable } from "mobx";
import { getStories, getComment, getStory } from '../apis';
import axios from "axios";
export  function createStoriesFunction(){
    return{
        stories:[],
        story: {},
        isLoading: false,
        comments: [],
        err: null,

        fetchStories() {
                    this.isLoading = true
                    try {
                        getStories()
                            .then(json => {
            
                                this.stories = json
                                this.isLoading = false
                            })
                    } catch (err) {
                        console.log(err.message)
                        this.error = err.message
                    }
            
            
            
                },
        fetchStory(){
            try{
                getStory()
                .then (json=>{
                    console.log(json)
                    this.story = json
            })
            }catch{

        }
                },
                async fetchComments  (commentIDs) {
                  const arr =await Promise.all(    commentIDs.map(async (id)=>(
                            await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                            .then(json=>{
                                console.log(json)
                                //this.comments =json
                                return json
                            }
                                )
                        ))
                  )
                  this.comments = arr
       
        

    },
    addComments(comment) {
        this.comments.push(comment)
    }
    }
}

// class Stories {
//     stories = []
//     isLoading = false
//     comments = []
//     error = null
//     constructor() {
//         makeAutoObservable(this)
//     }

//     fetchStories() {
//         this.isLoading = true
//         try {
//             getStories()
//                 .then(json => {

//                     this.stories = json
//                     this.isLoading = false
//                 })
//         } catch (err) {
//             console.log(err.message)
//             this.error = err.message
//         }



//     }

//     fetchComments(commentID) {
        
//         this.comments.push(getComment(commentID))

//     }
//     addComments(comment) {
//         this.comments.push(comment)
//     }
// }

// export default new Stories()