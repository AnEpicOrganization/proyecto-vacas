function doLogout() {
	$.get('app/api/session.php?action=logout', function(_) {
		location.hash = '/';
	});
}