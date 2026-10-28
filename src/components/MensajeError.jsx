function MensajeError({ mensaje }){
  if (!mensaje){
    return null
  } else{
    return (
      <div className="errorToast">
        <p>
          {mensaje}
        </p>
      </div>
    )
  }
}

export default MensajeError;