import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import '../styles/card.scss';
import { useStoriesStore } from '../Context/StoriesContext';

const Card = observer(() => {
  const { id } = useParams();
  const stories = useStoriesStore();
  const story = stories.stories.find((story) => story.data.id == id);
  const reloadComments = () => {
    if (story.data.kids && story.data.id == id) stories.fetchComments(story.data.kids);
  };

  const commentsTree = (id) => {
    stories.comments.map(
      (item) => item.data.id === id && stories.fetchTreeComments(item.data.kids)
    );
  };

  useEffect(() => {
    reloadComments();
  }, [story]);
  return (
    <div className="card_wrapper">
      <div>
        {
          <article className="card">
            <h2 className="title">{story.data.title}</h2>
            <a className="url" href={story.data.url}>
              Here is full article
            </a>
            <p className="created_at">
              {new Date(story.time * 1000).toLocaleDateString('en-US', {
                hour: 'numeric',
                minute: 'numeric'
              })}
            </p>

            <p className="author">Created by: {story.data.by}</p>
            <p className="comments">Comments {story.data.descendants}</p>
            {stories.comments.length > 0 ? (
              stories.comments.map((comment) => (
                <div
                  onClick={() => commentsTree(comment.data.id)}
                  key={comment.data.id}
                  style={{ cursor: 'pointer' }}
                  className="comment">
                  {} <p className="author">{comment.data.by}</p>
                  <p>{comment.data.text}</p>
                  <span className="treeComment">
                    {stories.treeComments &&
                      stories.treeComments.map(
                        (item) =>
                          item.data.parent === comment.data.id && (
                            <>
                              <p className="author">{item.data.by}</p>
                              <p key={item.data.id}>{item.data.text}</p>
                            </>
                          )
                      )}
                  </span>
                </div>
              ))
            ) : (
              <div className="no_comments">
                <p>There are no comments yet</p>
              </div>
            )}

            <div className="buttons">
              <button
                onClick={() => {
                  reloadComments();
                }}
                className="reloadComments">
                Reload Comments
              </button>
              <Link
                onClick={() => {
                  stories.comments = [];
                  stories.treeComments = [];
                }}
                className="go_back"
                to="/">
                Go back
              </Link>
            </div>
          </article>
        }
      </div>
    </div>
  );
});
export default Card;
