function doLogout() {
	waitingDialog.show('Cargando...');
	$.get('app/api/session.php?action=logout', function(_) {
		location.hash = '/';
		waitingDialog.hide();
	});
}