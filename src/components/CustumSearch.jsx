import * as React from 'react';
import  useDebounce  from '../hooks/useDebounce';
import { useAxios } from '../hooks/useAxios';
import { useNavigate } from 'react-router-dom';
import { Autocomplete } from '@mui/joy';
export default function CustomSearch() {
    const navigate = useNavigate()
    const [searchInput, setSearchInput] = React.useState("")
    const [searchData , setSearchData] = React.useState([])
    function handleChooseMovie(e){
        setSearchInput(e.target.value);
    }
    const searchValue = useDebounce(searchInput, 1000)
    React.useEffect(() => {
        if(searchValue){
            useAxios().get("/search/movie", {
                params:{query:searchValue}
            }).then(res  => {
                setSearchData(res.data.results.map(item => {
                    const data = {
                        label:item.title,
                        year:item.id
                    }
                    return data
                }))             
            })
        }
    },[searchValue])
    return (
        <Autocomplete 
            onInput={handleChooseMovie}
            onChange={(e, a) => navigate(`/movie/${a.year}`)}
            placeholder={"Searching..."}
            options={searchData}
            sx={{width:300}}
        />
    );
}