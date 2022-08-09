import React from 'react'
import {  useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import "../styles/card.scss"
import { useStoriesStore } from '../StoriesContext'


const Card = observer(() => {

    const { id } = useParams();
    const stories = useStoriesStore();
    const story = stories.stories.find(story => story.data.id == id)
    console.log(story.data.id)
    console.log(id)
    const reloadComments = () => {
        if (story.data.kids && story.data.id == id)
            stories.fetchComments(story.data.kids)
    }
    useEffect(() => {
        reloadComments()
        console.log('render')
    }, [story])
    return (
        <div className='card_wrapper'>
            <div>
                {
                    <article className='card' >
                        <h2 className='title'>{story.data.title}</h2>
                        <a className='url' href={story.data.url}>Here is full article</a>
                        <p className='created_at'>{new Date(story.time * 1000).toLocaleDateString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric'
                        })}</p>

                        <p className='author'>Created by: {story.data.by}</p>
                        <p className='comments'>Comments {story.data.descendants}</p>
                        {
                            stories.comments.length > 0 ? (
                                stories.comments.map(comment => (
                                    <div style={{ cursor: "pointer" }}>{
                                    } <p>{comment.data.by}</p>
                                        <p>{comment.data.text}</p>
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
                        <div className='buttons'>

                            <button onClick={() => { reloadComments() }} className='reloadComments'>Reload Comments</button>
                            <Link onClick={() => { stories.comments = [] }} className='go_back' to="/">Go back</Link>
                        </div>
                    </article>

                }

            </div>
        </div>
    )
}
)
export default Card
