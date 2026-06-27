<?php

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$stmt = $conn->prepare(
"UPDATE reservations
 SET status='Cancelled'
 WHERE id=?"
);

$stmt->bind_param(
    "i",
    $data["id"]
);

$success = $stmt->execute();

echo json_encode([
    "success" => $success
]);