function Button(props) {
  return (
    <button
      onClick={props.onClickAction}
      type={props.type ? props.type : 'button'}
    >
      {props.text}
    </button>
  )
}

export default Button;