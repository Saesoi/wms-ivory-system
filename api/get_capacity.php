<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$date = $_GET["date"];

$stmt = $conn->prepare(
"SELECT *
 FROM capacity_settings
 WHERE booking_date=?"
);

$stmt->bind_param(
"s",
$date
);

$stmt->execute();

$result = $stmt->get_result();

echo json_encode(
$result->fetch_assoc()
);