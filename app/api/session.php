<?php define('INCLUDED', 1);
require("../include/db.php");
require("../include/functions.php");
@session_start();

$action = 'login';
if(isset($_GET['action']) && !empty($_GET['action'])) {
	$action = trim($_GET['action']);
}

switch($action) {
	case 'logged':
		$logged = isset($_SESSION['logged']) && $_SESSION['logged'];
		echo json_encode(array("logged" => $logged));
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
		die(json_encode(array('logged' => $passok)));

		break;

	case 'logout':
		session_destroy();
		header("Location:./");

		break;

	default:
		throw_error("Acción incorrecta");
}