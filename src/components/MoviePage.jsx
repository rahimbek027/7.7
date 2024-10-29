import React, { useEffect, useState } from 'react'
import { useAxios } from '../hooks/useAxios'
import { API_KEY } from '../hooks/useEnv'
import CustomCard from '../components/CustomCard'
import { Pagination } from '@mui/material'


function MoviePage({URL}) {
  const [product, setProduct] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)


  useEffect(() => {
    useAxios().get(`/movie/${URL}?language=en-US&page=${page}&api_key=${API_KEY}`).then(res => {
      setProduct(res.data.results)
      setTotalPage(res.data.total_pages)
    }, [])
  }, [page])


  return (
    <div className='p-5'>
      <div className="flex flex-wrap justify-between gap-4 p-5">
        {product.map(item => <CustomCard key={item.id} item={item}/> )}
      </div>
      <div className="flex items-center justify-center mt-4 p-5">
        <Pagination onChange={(a, b) => setPage(b)} size='large'  count={totalPage} color="primary" />
      </div>
    </div>
  )
}

export default MoviePage
