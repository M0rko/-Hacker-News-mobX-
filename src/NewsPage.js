import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import NewsListItem from './components/NewsListItem'
import story from './store/stories'
import { observer } from 'mobx-react-lite'
import "./styles/newPage.scss"
const NewsPage = observer(() => {

    useEffect(() => {
        story.fetchStories()
    }, [])


    const reLoadPage = () => {
        window.location.reload();
    }


    return (
        <div className='wrapper'>

            <div className='header'> Hacker News
                <button className='reloadButton' onClick={() => reLoadPage()}>Reload this Page</button>
            </div>

            <div className=''>
                {
                    story.isLoading ?
                        (<p>Loading... </p>
                        ) : (
                            story.stories.map(arc => (
                                <NewsListItem article={arc} key={arc.data.id} />
                            ))

                        )}
            </div>
        </div>
    )
}
)










//     return (
//         <div>
//             <div>
//             <button onClick={()=>stories.fetchStories()}>Fetch</button>
//                 {

//                    stories.isLoading ?
//                         (<p>Loading... </p>
//                         ) : (
//                             <div>

//                                 {

//                                stories.stories.map((arc) => (

//                                     <NewsListItem article={arc} key={arc.data.id} />
//                                 ))
//                             }

//                             </div>
//                         )

//                 }
//             </div>
//         </div>
//     )
// }
// )
export default NewsPage