<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$sql = "
SELECT
    u.id,
    u.fullname,
    u.email,
    u.created_at,
    COUNT(r.id) AS total_bookings,
    MAX(r.reservation_date) AS last_visit

FROM users u

LEFT JOIN reservations r
ON u.id = r.user_id

WHERE u.role = 'user'

GROUP BY u.id

ORDER BY u.created_at DESC
";

$result = $conn->query($sql);

$customers = [];

while ($row = $result->fetch_assoc()) {
    $customers[] = $row;
}

echo json_encode($customers);