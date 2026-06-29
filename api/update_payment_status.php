<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$status = $data["payment_status"];

$stmt = $conn->prepare(
"UPDATE reservations
SET payment_status=?
WHERE id=?"
);

$stmt->bind_param(
"si",
$status,
$id
);

if($stmt->execute()){

    echo json_encode([
        "success"=>true
    ]);

}else{

    echo json_encode([
        "success"=>false
    ]);

}