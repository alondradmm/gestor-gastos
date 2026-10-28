function validarGasto(descripcion, importe) {
	if (!descripcion.trim()) {
		return "Se debe insertar una descripción";
	}
	if (Number(importe) <= 0) {
		return "El importe debe ser mayor a 0";
	}
	return ""
}

export default validarGasto;