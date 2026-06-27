<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$user_id = $_GET["user_id"];

$stmt = $conn->prepare(
"SELECT *
 FROM reservations
 WHERE user_id = ?
 ORDER BY id DESC"
);

$stmt->bind_param(
"i",
$user_id
);

$stmt->execute();

$result = $stmt->get_result();

$data = [];

while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);