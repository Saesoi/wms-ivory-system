<?php

include "db.php";

$user_id =
$_GET["user_id"];

$stmt =
$conn->prepare(
"SELECT *
 FROM notifications
 WHERE user_id = ?
 OR user_id IS NULL
 ORDER BY created_at DESC"
);

$stmt->bind_param(
"i",
$user_id
);

$stmt->execute();

$result =
$stmt->get_result();

$data = [];

while(
$row =
$result->fetch_assoc()
){
    $data[] = $row;
}

echo json_encode($data);