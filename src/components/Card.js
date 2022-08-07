import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import stories from '../store/stories';
import { observer } from 'mobx-react-lite'
import { getStory } from '../apis';
import "../styles/card.scss"

const Card = observer(() => {
    const { id } = useParams();

    const [data, setData] = useState(null)
    //const [err, setError] = useState(null)
    const [comments, SetComments] = useState(null)


    const story = stories.stories.find(story => story.data.id == id)

    useEffect(() => {
        getStory(id)
        console.log(getStory(id))
        const showComments = () => {
            try {
                story.data.kids && (
                    story.data.kids.map(async (commentID) => {
                       // const com = stories.fetchComments(commentID)
                        // const { data: comment } = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`)
                        // //stories.comments.push(comment)

                        // // stories.addComments(comment)
                        //console.log(stories.comments)
                    }

                    ))
            } catch (err) {
                console.log(err.message)
            }
        }

        showComments()

    }, [])
    const showAllComments = async (commentID) => {

        // let { data: comment } =
        //     await axios.get(`https://hacker-news.firebaseio.com/v0/item/${commentID}.json?print=pretty`)

        // //console.log(comment)
        // return comments
        // // return (

        // //     <div style={{ display: "block" }}>
        // //         {comment}


        // //         <div>
        // //             <p>{comment.by}</p>
        // //             <p>{comment.text}</p>
        // //         </div>

        // //     </div>
        // // )
    }

    return (
        <div className='card_wrapper'>
            {stories.isLoading && <div>...</div>}
            {stories.error && console.log(stories.error)}


            {

                story && (

                    <article className='card' >

                        <h2 className='title'>{story.data.title}</h2>
                        <a className='url' href={story.data.url}>Here is full article</a>
                        <p className='created_at'>{new Date(story.data.time * 1000).toLocaleDateString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}</p>

                        <p className='author'>Created by: {story.data.by}</p>
                        <p className='comments'>Comments {story.data.descendants}</p>
                        {
                            story.data.kids ? (
                                story.data.kids.map(commentID => (

                                    //<p>{comment}</p>
                                    <div onClick={() => showAllComments(commentID)} style={{ cursor: "pointer" }}>{
                                        console.log(stories.comments)
                                    } <p>{commentID}</p>
                                    </div>

                                ))
                            )
                                :
                                (
                                    <div className='no_comments'>
                                        <p>There are no comments yet</p>
                                    </div>
                                )
                        }
                        <Link className='go_back' to="/">Go back</Link>
                    </article>


                )
            }
        </div>
    )
}
)
export default Card
