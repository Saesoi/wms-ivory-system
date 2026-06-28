<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$host = "sql110.infinityfree.com";
$user = "if0_42284742";
$password = "ZfWmnREYsjex";
$database = "if0_42284742_wms_ivory";

$conn = new mysqli(
    $host,
    $user,
    $password,
    $database
);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>