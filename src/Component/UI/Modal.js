import classes from './Modal.module.css'
import ReactDOM  from 'react-dom'
import { Fragment } from 'react'
const Backdrop = (props)=>{
    return (
        <div className={classes.backdrop} onClick={props.onhidden}></div>
    )
}
const ModalOverlay =(props)=>{
    return (
        <div className={classes.modal}>{props.children}</div>
    )
}
const parentOverlay = document.getElementById('over-lay');
const Modal =(props)=>{
  return (
    <Fragment>
        {ReactDOM.createPortal(<Backdrop onhidden={props.onbackdropClick}/>,parentOverlay)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,parentOverlay)}
    </Fragment>
  )
}

export default Modal;