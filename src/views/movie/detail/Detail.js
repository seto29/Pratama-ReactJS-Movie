import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CBadge, CImage, CCardFooter, CButton } from '@coreui/react'
import API from '../../../api'
import Loader from '../../../components/Loader';
import DataNotFound from '../../../components/DataNotFound';


const Detail = ({history}) => {
  const dispatch = useDispatch()
  const movieID = useSelector((state) => state.movieID)
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])
  useEffect(() => {
    async function fetchGenres() {
      const response = await API.get(`movie/`+movieID+`?api_key=2fccde01a371b106b09a241d6d1d5b49`);
      if(response.status===200){
        setData(response.data)
        dispatch({ type: 'set', genres: response.data.genres})
      }else{
        setData([])
      }
      setLoading(false)
    }
    fetchGenres()
  }, [])
  
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h5>{data.title}</h5> <CBadge hidden={!data.adult} color='danger'>Adult</CBadge>
          {data.tagline}
        </CCardHeader>
        <CCardBody>
            <CRow>
                <CCol xs="6" >
                    <CImage align='center' src={"https://image.tmdb.org/t/p/w500/"+data.poster_path} width='50%' alt={data.poster_path}/>
                </CCol>
                <CCol xs="6" >
                    {
                        data.genres && data.genres.map(({id, name})=>{
                            return(
                                <CRow key={id}> 
                                <CCol xs="12" >
                                    {name}
                                </CCol>
                                </CRow>
                            )
                        })
                    }
                    <br/>
                    <CRow>
                        <CCol xs="6" >
                            Release Date : {data.release_date? Intl.DateTimeFormat("id-ID", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            }).format(Date.parse(data.release_date)) : "-"}
                        </CCol>
                        <CCol xs="6" >
                            status : {data.status}
                        </CCol>
                    </CRow>
                    <br/>
                    <CRow>
                        <CCol xs="12" >
                            {data.overview}
                        </CCol>
                    </CRow>
                            <br/>
                    <CRow>
                        <CCol xs="6" >
                            Original Language : {data.original_language}
                        </CCol>
                        <CCol xs="6" >
                            Homepage : <a href={data.homepage}>{data.homepage}</a>
                        </CCol>
                        <CCol xs="6" >
                            Popularity : {data.popularity}
                        </CCol>
                        <CCol xs="6" >
                            Runtime : {data.runtime}
                        </CCol>
                        <CCol xs="6" >
                            Vote Average : {data.vote_average}
                        </CCol>
                        <CCol xs="6" >
                            Vote Count : {data.vote_count}
                        </CCol>
                        <CCol xs="6" >
                            Budget : 
                            ${data.budget===0?'unknown':data.budget}
                        </CCol>
                        <CCol xs="6" >
                            Revenue : 
                            ${data.revenue===0?'unknown':data.revenue}
                        </CCol>
                    </CRow>
                    <br/>
                    
                </CCol>
            </CRow>
            <br/>
            <CImage align='center' src={"https://image.tmdb.org/t/p/w500/"+data.backdrop_path}  alt={data.backdrop_path}/>
            <br/>
            <center>

            {
                data.production_companies && data.production_companies.map(({id, logo_path, name, origin_country}, index)=>{
                    return(
                        <CImage key={index} src={"https://image.tmdb.org/t/p/w500/"+logo_path} style={{minWidth:"25px", maxWidth:"100px", margin:"25px"}} alt={logo_path}/>
                        )
                    })
                }
                </center>
        </CCardBody>
        <CCardFooter>
                    <CButton color='info' onClick={() => history.push('/movie/list')}>Back</CButton>
        </CCardFooter>
      </CCard>
    </>
  )
}

export default Detail
 