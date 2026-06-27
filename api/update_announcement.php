<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(
"UPDATE announcements
 SET title=?,
     content=?,
     status=?
 WHERE id=?"
);

$stmt->bind_param(
    "sssi",
    $data["title"],
    $data["content"],
    $data["status"],
    $data["id"]
);

$success = $stmt->execute();

echo json_encode([
    "success" => $success
]);