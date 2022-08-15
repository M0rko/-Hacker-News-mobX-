import { getStories, getStory } from '../apis';
import axios from 'axios';
export function createStoriesFunction() {
  return {
    stories: [],
    story: {},
    isLoading: false,
    comments: [],
    treeComments: [],
    err: null,

    fetchStories() {
      this.isLoading = true;
      try {
        getStories().then((json) => {
          this.stories = json;
          this.isLoading = false;
        });
      } catch (err) {
        this.error = err.message;
      }
    },
    fetchStory() {
      try {
        getStory().then((json) => {
          this.story = json;
        });
      } catch (err) {
        console.log(err.message);
      }
    },
    async fetchComments(commentIDs) {
      const arr = await Promise.all(
        commentIDs.map(
          async (id) =>
            await axios
              .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
              .then((json) => {
                return json;
              })
        )
      );
      console.log(arr);
      this.comments = arr;
    },
    async fetchTreeComments(commentIDs) {
      const arr = await Promise.all(
        commentIDs.map(
          async (id) =>
            await axios
              .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
              .then((json) => {
                return json;
              })
        )
      );
      this.treeComments = arr;
    },
    addComments(comment) {
      this.comments.push(comment);
    }
  };
}
