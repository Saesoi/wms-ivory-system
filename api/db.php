<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$host = "localhost";
$user = "root";
$password = "";
$database = "room_reservation";

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