<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$user_id = $_GET["user_id"];

$stmt = $conn->prepare(
    "SELECT *
     FROM reservations
     WHERE user_id = ?
     ORDER BY created_at DESC"
);

$stmt->bind_param("i", $user_id);
$stmt->execute();

$result = $stmt->get_result();

$reservations = [];

while($row = $result->fetch_assoc()) {
    $reservations[] = $row;
}

echo json_encode($reservations);