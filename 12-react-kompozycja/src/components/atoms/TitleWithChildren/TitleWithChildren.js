import './TitleWithChildren.css';

function TitleWithChildren(props) {
  return (
    <div className={`title ${props.isRed ? 'title-red' : ''}`}>
      {props.children}
    </div>
  )
}

export default TitleWithChildren;