<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$id = $data["id"];

$stmt = $conn->prepare(
    "DELETE FROM announcements WHERE id=?"
);

$stmt->bind_param(
    "i",
    $id
);

$success = $stmt->execute();

echo json_encode([
    "success" => $success
]);