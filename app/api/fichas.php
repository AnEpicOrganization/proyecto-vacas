<?php define('INCLUDED', 1);
require("../include/db.php");
require("../include/functions.php");
@session_start();
header('Content-Type:text/json');

if(!isset($_SESSION['logged'])) $_SESSION['logged'] = false;

if(!$_SESSION['logged']) {
	throw_error('Sesión no iniciada');
}

$action = 'lista';
if(isset($_GET['action']) && !empty($_GET['action'])) {
	$action = trim($_GET['action']);
}

switch($action) {
	case 'lista':
		$res = $db->query('select * from ficha_animal;');
		$fichas = array();

		while($ficha = $res->fetch_assoc()) {
			$fichas[] = $usuario;
		}

		echo json_encode($fichas);

		break;

	default:
		throw_error("Acción incorrecta");
}