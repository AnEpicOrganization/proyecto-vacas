function doLogin() {
	waitingDialog.show('Cargando...');

	$.post('app/api/session.php', $('#loginform').serialize(), function(data){
		try {
			if(typeof data == "string") {
				data = JSON.parse(data);
			}

			if('error' in data) {
				throw new Error(data.error);
			}

		} catch(err) {
			waitingDialog.hide();
			alert('Error: ' + err.message);
			console.error(err);
			console.log(data);
			return;
		}

		if(!'logged' in data) {
			alert('Error: Respuesta incorrecta recibida');
			return;
		}

		if(!!data.logged) {
			location.hash = '/panel';
		} else {
			alert('Errror: Combinación usuario-contraseña incorrecta');
		}

	});
}