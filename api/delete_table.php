<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$id = $_GET["id"];

$stmt = $conn->prepare(
    "DELETE FROM restaurant_tables
     WHERE id = ?"
);

$stmt->bind_param("i", $id);

$stmt->execute();

echo json_encode([
    "success" => true
]);