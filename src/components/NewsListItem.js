import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/newsList.scss'
const NewsListItem = ({ article }) => {
  if (!article.data.title) return null;
  return (
    <div className='flex_wrapper'>
      <div>
       
        <Link className='title' to={`/${article.data.id}`} article={article.data}><h3>{article.data.title}</h3></Link>

        <p className='score'>Score: {article.data.score}</p>
        <p className='author'>Author: {article.data.by}</p>
        <p className='created_at'>Created at: {new Date(article.data.time * 1000).toLocaleDateString('en-US', {
          hour: 'numeric',
          minute: 'numeric'
        })}</p>

      </div>


    </div>
  )
}
export default NewsListItem
