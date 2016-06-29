<?php define('INCLUDED', 1);
require("../include/db.php");
require("../include/functions.php");
@session_start();

if(!isset($_SESSION['logged'])) $_SESSION['logged'] = false;

$action = 'login';
if(isset($_GET['action']) && !empty($_GET['action'])) {
	$action = trim($_GET['action']);
}

switch($action) {
	case 'logged':
		echo json_encode(array("logged" => $_SESSION['logged']));
		break;

	case 'login':
		if(!isset($_POST['rut']) || !isset($_POST['pass']) || empty($_POST['rut']) || empty($_POST['pass'])) {
			throw_error("Por favor ingrese los datos solicitados.");
		}

		$rut = $db->escape_string(trim($_POST['rut']));
		$pass = trim($_POST['pass']);

		$res = $db->query("SELECT * FROM usuario where rut = '$rut'");
		if($res->num_rows <= 0) {
			throw_error("Combinación usuario-contraseña incorrecta");
		}

		$userdb = $res->fetch_assoc();
		$passok = check_pass($pass, $userdb['password']);

		if(!$passok) {
			throw_error("Combinación usuario-contraseña incorrecta");
		} else {
			$_SESSION['userdata'] = $userdb;
			$_SESSION['logged'] = true;
		}

		die(json_encode(array('logged' => $passok)));
		break;

	case 'logout':
		session_destroy();
		die(json_encode(array('logged' => false)));

		break;

	default:
		throw_error("Acción incorrecta");
}