import classess from './Card.module.css'
const Card = (props)=>{
  return (
    <div className={classess.card}>{props.children}</div>
  )
}

export default Card