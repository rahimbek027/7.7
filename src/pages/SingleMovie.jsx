import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios';
import { Link, useParams } from 'react-router-dom'
import {API_KEY, IMG_URL} from "../hooks/useEnv"
import { Button } from '@mui/material'
import YouTube from 'react-youtube'
function SingleMovie() {
  const {id} = useParams()
  const [singleData, setSingleData] = useState({})
  const [videos, setVideos] = useState([])
  const [videosMore, setVideosMore] = useState([])
  const [moreOpen, setMoreOpen] = useState(false)

  const [actors, setActors] = useState([])


  
  useEffect(() => {   
    useAxios().get(`/movie/${id}?api_key=${API_KEY}`).then(res => setSingleData(res.data)) 
  },[id])

  useEffect(() => {
    useAxios().get(`/movie/${id}/videos?api_key=${API_KEY}`).then(res => setVideos(res.data.results.splice(0, 5))) 
  },[id])

  useEffect(() => {
    useAxios().get(`/movie/${id}/videos?api_key=${API_KEY}`).then(res => setVideosMore(res.data.results.splice(5, 5))) 
    
  },[id])
  
  useEffect(() => {
    useAxios().get(`/movie/${id}/credits?api_key=${API_KEY}`).then(res => setActors(res.data.cast)) 
  },[id])
  return (
    <div className='flex justify-between p-5'>
      <div className="p-5 space-y-5 rounded-md border-[2px] overflow-y-auto h-[85vh] border-slate-300 w-[20%]">
        {actors.map((item, index) => (
          <div key={index} className="p-5 rounded-md bg-slate-200">
            <img className='rounded-md mb-2' src={`${IMG_URL}${item.profile_path}`} alt="actors img" width={"100%"} />
            <h2 className='mb-2'> <strong>Name:</strong> {item.original_name}</h2>
            <h2> <strong>Character:</strong> {item.character}</h2>

          </div>
        ))}
      </div>

      <div className="p-5 rounded-md border-[2px] overflow-y-auto h-[85vh] border-slate-300 w-[50%]">
        <h2 className='font-bold text-[33px] text-center mb-5'>{singleData.title}</h2>
        <img  className='rounded-md mb-5' src={`${IMG_URL}${singleData.poster_path}`} alt="movie img" width={"100%"} />
        <p className='text-[20px] text-slate-400'>{singleData.overview}</p>
        <div className="flex items-center space-x-5 mt-5">
          <strong className='text-[20px]'>Genres: </strong> {singleData?.genres?.map(item => <Button key={item.id} variant='outlined' size='large'>{item.name}</Button>)}
        </div>
        <div className="mt-5">
          <strong className='text-[20px]'>View Full Video : </strong> <Link target='_blank'  className='text-blue-400' to={singleData.homepage}>{singleData.homepage}</Link>
        </div>
        <div className="flex items-center space-x-5 mt-5">
          <strong className='text-[20px]'>Languages: </strong> {singleData?.spoken_languages?.map((item, index) => <Button key={index} variant='outlined' size='large'>{item.name}</Button>)}
        </div>
      </div>

      <div className="p-5 rounded-md border-[2px] overflow-y-auto h-[85vh] border-slate-300 w-[29%] space-y-5">
        {videos.map(item => <YouTube key={item.id} videoId={item.key} id={item.id} />)}
        <div className={`space-y-5 ${moreOpen ? "flex flex-col-reverse gap-2" : "flex flex-col"}`}>
          <Button onClick={() => setMoreOpen(!moreOpen)} className=' w-full' variant='outlined' size='large'>
            { moreOpen ? "Show less" : "More .."}
          </Button>

          {moreOpen && videosMore.length > 0 ? (
            videosMore.map(item =>( 
            <YouTube 
              className={` duration-300 ${moreOpen ? "scale-100" : "scale-0 opacity-0"}`}
              key={item.id} videoId={item.key} id={item.id}
            />
            ))
          ) : (
            moreOpen && <div>"No more videos"</div>
          )}
        </div>
      </div>

    </div>
  )
}

export default SingleMovie
