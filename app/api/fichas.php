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
			$fichas[] = $ficha;
		}

		echo json_encode($fichas);

		break;

	case 'agregar':
		require("../include/gump.class.php");

		$gump = new GUMP();
		$_POST = $gump->sanitize($_POST); // You don't have to sanitize, but it's safest to do so.

		$gump->validation_rules(array(
		    'diio'			=> 'required|integer',
		    'sexo'      	=> 'required|contains,H M',
		    'raza' 			=> 'required',
		    'nacimiento'    => 'required|date',
		    'descripcion'   => 'required'
		));

		$gump->filter_rules(array(
		    'diio'          => 'trim',
		    'sexo'			=> 'trim,uppercase',
		    'raza'			=> 'trim',
		    'nacimiento'	=> 'trim',
		    'descripcion'   => 'trim'
		));

		$data = $gump->run($_POST);
		if($data === false) {
		    throw_error(var_export($gump->get_readable_errors(), true));
		}

		$stmt = $db->prepare(
		    'INSERT INTO ficha_animal (diio, sexo, raza, nacimiento, descripcion)'.
		    'VALUES (?, ?, ?, ?, ?)');
		   
		if(!$stmt) {
		    throw_error($db->error);
		}

		if(!isset($data['pagado'])) $data['pagado'] = 0;
		$stmt->bind_param('sssss', $data['diio'], $data['sexo'], $data['raza'], $data['nacimiento'], $data['descripcion']);
		$stmt->execute();

		if(!empty($stmt->error)) {
		    throw_error($stmt->error);
		}

		$data['id_ficha'] = $stmt->insert_id;
		echo json_encode($data);

		break;

	case 'borrar':
		if(!isset($_GET['id']) || empty($_GET['id'])) {
			throw_error('ID no enviado');
		}

		$id = $db->escape_string(trim($_GET['id']));
		$res = $db->query("select * from ficha_animal where id_ficha = '$id';");

		if($res->num_rows <= 0) {
			throw_error('La ficha no existe');
		}

		$db->query("delete from ficha_animal where id_ficha = '$id';");
		echo '{"message":"Ficha eliminada", "success":true}';
		break;

	default:
		throw_error("Acción incorrecta");
}