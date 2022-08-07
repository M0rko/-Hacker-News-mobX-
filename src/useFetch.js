import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
const useFetch = (url) => {
    const [articles, setArcticles] = useState(null) //////[]
    const [isLoading, setIsLoading] = useState(true)
    const [err, setError] = useState(null)
    useEffect(() => {
        setTimeout(() => {


            setIsLoading(true)
            const fetchingData = async () => {
                try {
                    const { data } = await axios.get(url);

                    const { hits, nbPages } = data
                    setArcticles(hits.sort(biggestToSmallest))
                  
                    console.log(hits)
                }
                catch (err) {
                    setIsLoading(false)
                    setError(err.message)
                    console.log(err.message)
                }
                finally {
                    setIsLoading(false)
                }
            }
            fetchingData()
        }, 1000)
    }, [])
    


    const biggestToSmallest = (a, b) => {
        return b.created_at_i - a.created_at_i;
    }
    return {articles, isLoading, err}
}
export default useFetch
