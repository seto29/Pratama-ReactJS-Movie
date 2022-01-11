import React, { useEffect, useState } from 'react'
import {  useDispatch } from 'react-redux'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CDropdownDivider } from '@coreui/react'
import API from '../../../api'
import Loader from '../../../components/Loader';
import DataNotFound from '../../../components/DataNotFound';

const MovieGenres = ({ data }) => {
  return (
    <CRow>
    {
      data && data.length>0?
        data.map(( {id, name}, index )=>{
          return (
            <CCol xs="12" key={id} >
              <CRow >
                <CCol xs="3" style={{textAlign:'center'}} >
                  <p>{index+1}</p>
                </CCol >
                <CCol xs="9"  style={{textAlign:'center'}}>
                  <p>{name}</p>
                </CCol >
              </CRow>
              <CDropdownDivider/>
            </CCol >
          )
        })
        :
        <DataNotFound/>
    }
  </CRow>
  )
}

const Genres = () => {
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([])
  useEffect(() => {
    async function fetchGenres() {
      const response = await API.get(`genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49`);
      if(response.status===200){
        setData(response.data.genres)
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
          Movie genres
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol xs="12" key="head" >
              <CRow>
                <CCol xs="3" style={{textAlign:'center'}} >
                  <h6>No.</h6>
                </CCol >
                <CCol xs="9"  style={{textAlign:'center'}}>
                  <h6>Genre</h6>
                </CCol >
              </CRow>
            <CDropdownDivider/>
            </CCol >
          </CRow>
          {
            loading?
            <Loader/>
            :
            <MovieGenres data={data} />
          }
        </CCardBody>
      </CCard>
    </>
  )
}

export default Genres
