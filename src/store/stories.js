import { makeAutoObservable } from "mobx";
import { useEffect } from "react";
import { getStories, getComment } from '../apis';

class Stories {
    stories = []
    isLoading = false
    comments = []
    error = null
    constructor() {
        makeAutoObservable(this)
    }

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



    }

    fetchComments(commentID) {
        return getComment(commentID)

    }
    addComments(comment) {
        this.comments.push(comment)
    }
}

export default new Stories()