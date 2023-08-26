import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import "./Modal.css"
function Modalcomp(props){
    return(
        <Modal show={props.show} onHide={props.handleHide} backdrop="static" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>
                 <div className='Modal-title'>  {props.title}</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                   <div className='modal-body'>
                   <img src={props.pic} />
                    <p>Email: {props.email}</p>
                   </div>
            </Modal.Body>
            <Modal.Footer>
            <button className='btn btn-secondary' onClick={props.handleHide}>Close</button>
            </Modal.Footer>
        </Modal>
    )
}
export default Modalcomp;