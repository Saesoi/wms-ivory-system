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
"UPDATE restaurant_tables
SET
table_name=?,
capacity=?,
table_type=?,
status=?
WHERE id=?"
);

$stmt->bind_param(
"ssssi",
$data["table_name"],
$data["capacity"],
$data["table_type"],
$data["status"],
$data["id"]
);

$stmt->execute();

echo json_encode([
"success"=>true
]);