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
		$res = $db->query('select id_usuario,rut,nombre,apellido,email,telefono,tipo_usuario from usuario;');
		$usuarios = array();

		while($usuario = $res->fetch_assoc()) {
			$usuarios[] = $usuario;
		}

		echo json_encode($usuarios);

		break;

	default:
		throw_error("Acción incorrecta");
}