<?php

function pass_encrypt($pass) {
	$salt = strtr(base64_encode(mcrypt_create_iv(16, MCRYPT_DEV_URANDOM)), '+', '.');
	$salt = sprintf("$2a$%02d$", 10) . $salt;
	return crypt($pass, $salt);
}

function check_pass($pass, $hash) {
	return hash_equals($hash, crypt($pass, $hash));
}

function throw_error($error) {
	die(json_encode(array("error" => $error)));
}