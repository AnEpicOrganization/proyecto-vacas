function doLogin() {
	$.post('app/api/session.php', $('#loginform').serialize(), function(data){
		console.log(data);
		try {
			data = JSON.parse(data);
			if('error' in data) {
				throw new Error(data.error);
				return;
			}
		} catch(err) {
			alert('Error: ' + err.message);
			return;
		}

		alert('logged? ' + data.logged);
	});
}