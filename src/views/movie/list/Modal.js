import React from 'react'
import {
    CButton,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CCol,
    CImage,
    CRow,
    CBadge,
    CFormLabel,
    CFormText,
    CCardText,
} from '@coreui/react'
let no = 0;
function Modal(props) {
    console.log(props)
    return (
        <>
            <CModal
                visible={props.viewModal}
                scrollable
                onClose={() => props.setViewModal(false)}
                size="lg"
            >
                <CModalBody >
                    <div>
                        <CRow>
                            <CCol xs="4">
                                <CImage align='center' src={"https://image.tmdb.org/t/p/w500/"+props.detail.poster_path} width='100%' alt={props.detail.poster_path}/>
                            </CCol>
                            <CCol xs="8">
                                <h3>{props.detail.title}</h3>
                                <br/>
                                <CBadge hidden={!props.detail.adult}>Adult</CBadge>
                                <p>{props.detail.overview}</p>
                            </CCol>
                        </CRow>
                        <br/>
                        <CRow>
                            <CCol xs="3" style={{textAllign:'center'}}>
                                <CCardText> Original Language : {props.detail.original_language}</CCardText>
                            </CCol>
                            <CCol xs="3" style={{textAllign:'center'}}>
                                <CCardText> Popularity : {props.detail.popularity}</CCardText>
                            </CCol>
                            <CCol xs="3" style={{textAllign:'center'}}>
                                <CCardText> Vote Count : {props.detail.vote_count}</CCardText>
                            </CCol>
                            <CCol xs="3" style={{textAllign:'center'}}>
                                <CCardText> Vote Average : {props.detail.vote_average}</CCardText>
                            </CCol>
                        </CRow>
                        <br/>
                        <CImage align='center' src={"https://image.tmdb.org/t/p/w500/"+props.detail.backdrop_path}  alt={props.detail.backdrop_path}/>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color='danger' onClick={() => props.setViewModal(false)}>Close</CButton>
                    <CButton color='info' onClick={() => props.history.push('/movie/detail')}>Read More</CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default Modal