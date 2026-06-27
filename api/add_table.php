<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$table_name = $data["table_name"];
$capacity = $data["capacity"];
$table_type = $data["table_type"];
$status = $data["status"];

$stmt = $conn->prepare(
    "INSERT INTO restaurant_tables
    (table_name, capacity, table_type, status)
    VALUES (?, ?, ?, ?)"
);

$stmt->bind_param(
    "ssss",
    $table_name,
    $capacity,
    $table_type,
    $status
);

if($stmt->execute()){

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false
    ]);

}