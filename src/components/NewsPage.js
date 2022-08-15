import { useEffect } from 'react';
import NewsListItem from './NewsListItem';
import { observer } from 'mobx-react-lite';
import '../styles/newPage.scss';
import { useStoriesStore } from '../Context/StoriesContext';
const NewsPage = observer(() => {
  const story = useStoriesStore();
  useEffect(() => {
    setTimeout(function () {
      story.fetchStories();
    }, 60000);
    story.fetchStories();
  }, []);

  const reLoadPage = () => {
    story.fetchStories();
  };

  return (
    <div className="wrapper">
      <div className="header">
        {' '}
        Hacker News
        <button className="reloadButton" onClick={() => reLoadPage()}>
          Reload this Page
        </button>
      </div>
      <div className="">
        {story.isLoading ? (
          <p>Loading... </p>
        ) : (
          story.stories.map((arc) => <NewsListItem article={arc} key={arc.data.id} />)
        )}
      </div>
    </div>
  );
});

export default NewsPage;
