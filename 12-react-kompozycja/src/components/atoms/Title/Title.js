import './Title.css';

function Title(props) {
  return (
    <h1 className={`title ${props.isRed ? 'title-red' : ''}`}>{props.text}</h1>
  )
}

export default Title;