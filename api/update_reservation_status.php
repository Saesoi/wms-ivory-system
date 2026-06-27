<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(file_get_contents("php://input"));

$id = $data->id;
$status = $data->status;

$getUser = $conn->prepare(
"SELECT user_id
FROM reservations
WHERE id = ?"
);

$getUser->bind_param("i", $id);
$getUser->execute();

$result = $getUser->get_result();
$row = $result->fetch_assoc();

$user_id = $row["user_id"];

$stmt = $conn->prepare(
    "UPDATE reservations
     SET status = ?
     WHERE id = ?"
);

$stmt->bind_param(
    "si",
    $status,
    $id
);

if($stmt->execute()) {
    echo json_encode([
        "success" => true
    ]);
} else {
    echo json_encode([
        "success" => false
    ]);
}

if($status == "Approved"){

    $title = "Reservation Approved";
    $message = "Your reservation has been approved.";

}
else if($status == "Rejected"){

    $title = "Reservation Rejected";
    $message = "Your reservation has been rejected.";

}

$stmtNotif = $conn->prepare(
"INSERT INTO notifications
(user_id, title, message)
VALUES (?, ?, ?)"
);

$stmtNotif->bind_param(
"iss",
$user_id,
$title,
$message
);

$stmtNotif->execute();

if($status == "Approved"){
    $title = "Reservation Approved";
    $message = "Your reservation has been approved.";
}
else if($status == "Rejected"){
    $title = "Reservation Rejected";
    $message = "Your reservation has been rejected.";
}

$stmtNotif = $conn->prepare(
"INSERT INTO notifications
(user_id, title, message)
VALUES (?, ?, ?)"
);

$stmtNotif->bind_param(
"iss",
$user_id,
$title,
$message
);

$stmtNotif->execute();