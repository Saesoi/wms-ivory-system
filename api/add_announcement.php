<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

$stmt = $conn->prepare(
"INSERT INTO announcements
(title, content, status)
VALUES (?, ?, ?)"
);

$stmt->bind_param(
"sss",
$data["title"],
$data["content"],
$data["status"]
);

$success = $stmt->execute();

echo json_encode([
    "success" => $success,
    "id" => $conn->insert_id
]);