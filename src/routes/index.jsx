import React from 'react'
import NowPlaying from '../pages/NowPlaying'
import { PATH } from '../hooks/usePath'
import Popular from '../pages/Popular'
import TopRated from '../pages/TopRated'
import { Route, Routes } from 'react-router-dom'
import  Upcoming  from '../pages/UpComing'
import SingleMovie from '../pages/SingleMovie'

function CustomRoutes() {
    const routesList = [
        {
            id:1,
            path:PATH.nowPlaying,
            element:<NowPlaying/>
        },
        {
            id:2,
            path:PATH.popular,
            element:<Popular />
        },
        {
            id:3,
            path:PATH.topRated,
            element:<TopRated/>
        }, {
            id:4,
            path:PATH.upComing,
            element:<Upcoming />
        },
        {
            id:5,
            path:PATH.singleMovie,
            element:<SingleMovie/>
        },
    ]
    return (
        <Routes>
            {routesList.map(item => <Route key={item.id} path={item.path} element={item.element}/>)}
        </Routes>
    )
}

export default CustomRoutes
