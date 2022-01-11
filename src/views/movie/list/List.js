import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CRow, CCol, CCard, CCardHeader, CCardBody, CTableBody , CPagination, CPaginationItem, CTable, CTableHeaderCell, CTableHead, CTableRow, CTableDataCell, CBadge, CImage } from '@coreui/react'
import API from '../../../api'
import Loader from '../../../components/Loader';
import DataNotFound from '../../../components/DataNotFound';
import Modal from './Modal'

const MovieList = ({ data, page, setViewModal, setDetail }) => {
  const dispatch = useDispatch()
  return (
    <CTableBody>
    {
      data && data.length>0?
        data.map(( {id, title, release_date, vote_average, vote_count, original_language, adult, popularity, poster_path, backdrop_path, overview, video}, index )=>{
          return (
            <CTableRow xs="12" key={(page*20)+index+1} 
              onClick={
                (e)=>
                {
                  dispatch({ type: 'set', movieID: id})
                  setViewModal(true)
                  setDetail({id, title, release_date, vote_average, vote_count, original_language, adult, popularity, poster_path, backdrop_path, overview, video})
                }
              } 
            >
                <CTableHeaderCell scope="row">
                  {(page*20)+index+1}
                </CTableHeaderCell >
                <CTableDataCell  scope="row">
                  <CImage rounded src={"https://image.tmdb.org/t/p/w500/"+poster_path} alt={poster_path} height={100} />
                </CTableDataCell >
                <CTableDataCell  scope="row">
                  <div >{title}({original_language})<CBadge hidden={!adult} color='danger'>Adult</CBadge></div>
                </CTableDataCell >
                <CTableDataCell  scope="row">
                  {release_date}
                </CTableDataCell >
                <CTableDataCell  scope="row">
                  {popularity}
                </CTableDataCell >
                <CTableDataCell  scope="row">
                  {vote_count}
                </CTableDataCell >
                <CTableDataCell  scope="row">
                  {vote_average}
                </CTableDataCell >
            </CTableRow >
          )
        })
        :
        <DataNotFound/>
    }
  </CTableBody>
  )
}

const List = ({history}) => {
  const dispatch = useDispatch()
  const movies = useSelector((state) => state.movies)
  const [ page, setPage ] = useState(1)
  const [ totalPage, setTotalPage ] = useState(21)
  const [ viewModal, setViewModal ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ data, setData ] = useState([movies])
  const [ detail, setDetail ] = useState({})
  useEffect(() => {
    async function fetchMovie() {
      const response = await API.get(`movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49&page=`+page);
      if(response.status===200){
        setTotalPage(response.data.total_pages)
        setData(response.data.results)
        dispatch({ type: 'set', movies: response.data.results})
      }else{
        setData([movies])
      }
      setLoading(false)
    }
    fetchMovie()
  }, [page])
  
  
  return (
    <>
      <Modal
        viewModal={viewModal}
        setViewModal={setViewModal}
        detail={detail}
        history={history}
      />
      <CCard className="mb-4">
        <CCardHeader>
          Movie list
        </CCardHeader>
        <CCardBody>
          Sort By :
          <select>
                <option value="albums">Title</option>
                <option value="members">Release Date</option>
                <option value="formed">Popularity</option>
          </select>
          {
            loading?
            <Loader/>
            :
            <CTable hover>
              <CTableHead >
                <CTableRow>
                  <CTableHeaderCell  scope="col">
                    No.
                  </CTableHeaderCell  >
                  <CTableHeaderCell scope="col">
                    Poster
                  </CTableHeaderCell  >
                  <CTableHeaderCell scope="col">
                    Title
                  </CTableHeaderCell  >
                  <CTableHeaderCell scope="col">
                    Release Date
                  </CTableHeaderCell  >
                  <CTableHeaderCell scope="col">
                    Popularity
                  </CTableHeaderCell  >
                  <CTableHeaderCell scope="col">
                    Vote Count
                  </CTableHeaderCell  >
                  <CTableHeaderCell scope="col">
                    Vote Average
                  </CTableHeaderCell  >
                </CTableRow>
              </CTableHead >
              <MovieList data={data} page={page-1} setViewModal={setViewModal} setDetail={setDetail} />
            </CTable>
          }
          <CPagination align="end" size="sm" aria-label="Page navigation example">
            <CPaginationItem hidden={page==1} onClick={(e)=>setPage(page-1)}>Previous</CPaginationItem>
            <CPaginationItem active={page==1?true:false}  onClick={(e)=>setPage(1)}>1</CPaginationItem>
            <CPaginationItem active={page==2?true:false}  onClick={(e)=>setPage(2)}>2</CPaginationItem>
            <CPaginationItem active={page!==1 && page!==2 && totalPage-1!==page && totalPage !==page ?true:false} onClick={(e)=>setPage(page!==1 && page!==2 && totalPage-1!==page && totalPage !==page ?page:3)}>{page!==1 && page!==2 && totalPage-1!==page && totalPage !==page ?page:3}</CPaginationItem>
            <CPaginationItem active={page==totalPage-1?true:false}  onClick={(e)=>setPage(totalPage-1)}>{totalPage-1}</CPaginationItem>
            <CPaginationItem active={page==totalPage?true:false} onClick={(e)=>setPage(totalPage)}>{totalPage}</CPaginationItem>
            <CPaginationItem hidden={page==totalPage} onClick={(e)=>setPage(page+1)}>Next</CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </>
  )
}

export default List
