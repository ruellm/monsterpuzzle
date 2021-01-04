<?php

//
// From this site: https://gist.github.com/farhadi/2185197
// Ported on: July 24, 2014
//

function mb_chr($char) {
	return mb_convert_encoding('&#'.intval($char).';', 'UTF-8', 'HTML-ENTITIES');
}

function mb_ord($char) {
	$result = unpack('N', mb_convert_encoding($char, 'UCS-4BE', 'UTF-8'));

	if (is_array($result) === true) {
	return $result[1];
	}
	return ord($char);
}

function rc4($key, $str) {
	if (extension_loaded('mbstring') === true) {
		mb_language('Neutral');
		mb_internal_encoding('UTF-8');
		mb_detect_order(array('UTF-8', 'ISO-8859-15', 'ISO-8859-1', 'ASCII'));
	}

		$s = array();
	for ($i = 0; $i < 256; $i++) {
		$s[$i] = $i;
	}
	$j = 0;
	
	for ($i = 0; $i < 256; $i++) {
		$j = ($j + $s[$i] + mb_ord(mb_substr($key, $i % mb_strlen($key), 1))) % 256;
		$x = $s[$i];
		$s[$i] = $s[$j];
		$s[$j] = $x;
		}
	$i = 0;
	$j = 0;
	$res = '';

	for ($y = 0; $y < mb_strlen($str); $y++) {
		$i = ($i + 1) % 256;
		$j = ($j + $s[$i]) % 256;
		$x = $s[$i];
		$s[$i] = $s[$j];
		$s[$j] = $x;

		$res .= mb_chr(mb_ord(mb_substr($str, $y, 1)) ^ $s[($s[$i] + $s[$j]) % 256]);
	}
	return $res;
}

?>