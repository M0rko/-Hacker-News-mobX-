import axios from 'axios';
import { Link } from 'react-router-dom';


const getStory = async (id) => {
    try {
        const story = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return story;
    } catch (error) {
        console.log('Error while getting a story.');
    }
};

export const getStories = async () => {
    try {
        const { data: storyIds } = await axios.get(
            `https://hacker-news.firebaseio.com/v0/newstories.json`
        );
        const stories = await Promise.all(storyIds.slice(0, 100).map(getStory));
        return stories;
    } catch (error) {
        console.log('Error while getting list of stories.');
        //console.log(error.message)
    }

};

export const getComment = async (id) => {
    try {
        const comment = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
        console.log(comment)
        return comment;
        
    } catch (err) {
        console.log(err.message)
    }
}