<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$result = $conn->query(
"SELECT * FROM capacity_settings"
);

$data = [];

while(
$row = $result->fetch_assoc()
){
$data[] = $row;
}

echo json_encode($data);