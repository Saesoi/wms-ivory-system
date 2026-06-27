<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$booking_date =
    $data["booking_date"];

$max_table_bookings =
    $data["max_table_bookings"];

$max_event_bookings =
    $data["max_event_bookings"];

$full_venue_limit =
    $data["full_venue_limit"];


/*
Check if date already exists
*/

$check = $conn->prepare(
"SELECT id
 FROM capacity_settings
 WHERE booking_date=?"
);

$check->bind_param(
"s",
$booking_date
);

$check->execute();

$result =
$check->get_result();

if ($result->num_rows > 0) {

    $stmt = $conn->prepare(
    "UPDATE capacity_settings
     SET
       max_table_bookings=?,
       max_event_bookings=?,
       full_venue_limit=?
     WHERE booking_date=?"
    );

    $stmt->bind_param(
        "iiss",
        $max_table_bookings,
        $max_event_bookings,
        $full_venue_limit,
        $booking_date
    );

} else {

    $stmt = $conn->prepare(
    "INSERT INTO capacity_settings
    (
      booking_date,
      max_table_bookings,
      max_event_bookings,
      full_venue_limit
    )
    VALUES (?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "siis",
        $booking_date,
        $max_table_bookings,
        $max_event_bookings,
        $full_venue_limit
    );

}

$success = $stmt->execute();

echo json_encode([
    "success" => $success
]);