function doLogin() {
	waitingDialog.show('Cargando...');

	$.post('app/api/session.php', $('#loginform').serialize(), function(data){
		try {
			data = JSON.parse(data);
			if('error' in data) {
				throw new Error(data.error);
			}

			if(!'logged' in data) {
				throw new Error('Respuesta incorrecta recibida');
			}

			if(!!data.logged) {
				location.hash = '/panel';
			} else {
				throw new Error('Combinación usuario-contraseña incorrecta');
			}
		} catch(err) {
			alert('Error: ' + err.message);
			waitingDialog.hide();
			return;
		}

	});
}