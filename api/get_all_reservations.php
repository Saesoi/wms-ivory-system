<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$sql = "
SELECT
    r.*,
    u.fullname,
    u.email
FROM reservations r
JOIN users u
ON r.user_id = u.id
ORDER BY r.created_at DESC
";

$result = $conn->query($sql);

$reservations = [];

while($row = $result->fetch_assoc()) {
    $reservations[] = $row;
}

echo json_encode($reservations);