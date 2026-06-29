<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = $_POST;

$paymentProofPath = "";

if (isset($_FILES["payment_proof"])) {

    $uploadDir = "uploads/";

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $filename =
        time() . "_" .
        basename($_FILES["payment_proof"]["name"]);

    $targetFile =
        $uploadDir . $filename;

    if (move_uploaded_file(
        $_FILES["payment_proof"]["tmp_name"],
        $targetFile
    )) {

        $paymentProofPath = $targetFile;

    }
}

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

$reservationDate =
    $data["reservation_date"];

$reservationType =
    strtolower(
    trim(
    $data["reservation_type"]
    )
    );

$capacityStmt =
$conn->prepare(
"SELECT *
 FROM capacity_settings
 WHERE booking_date = ?"
);

$capacityStmt->bind_param(
"s",
$reservationDate
);

$capacityStmt->execute();

$capacityResult =
$capacityStmt->get_result();

$capacity =
$capacityResult->fetch_assoc();

if ($capacity) {
    $countStmt =
    $conn->prepare(
    "SELECT COUNT(*) AS total
    FROM reservations
    WHERE reservation_date = ?
    AND reservation_type = ?
    AND status != 'Rejected'"
    );

    $countStmt->bind_param(
    "ss",
    $reservationDate,
    $reservationType
    );

    $countStmt->execute();

    $countResult =
    $countStmt->get_result();

    $currentCount =
    $countResult->fetch_assoc()["total"];

    if (
        $reservationType === "table"
        &&
        $currentCount >=
        $capacity["max_table_bookings"]
        ) {

            echo json_encode([
                "success" => false,
                "message" =>
                "Table booking limit reached."
            ]);

        exit;
    }

    if (
        $reservationType === "occasion"
        &&
        $currentCount >=
        $capacity["max_event_bookings"]
        ) {

        echo json_encode([
            "success" => false,
            "message" =>
            "Event booking limit reached."
        ]);

        exit;
    }

    if ($reservationType === "venue") {

        if (
            $capacity["full_venue_limit"]
            === "Blocked"
        ) {

            echo json_encode([
                "success" => false,
                "message" =>
                "Full venue bookings are blocked for this date."
            ]);

            exit;
        }

        if (
            $capacity["full_venue_limit"]
            === "1 per day"
            &&
            $currentCount >= 1
        ) {

            echo json_encode([
                "success" => false,
                "message" =>
                "Only one full venue booking is allowed per day."
            ]);
            exit;
        }
    }
}

$stmt = $conn->prepare(
"
INSERT INTO reservations
(
    user_id,
    reservation_type,
    reservation_date,
    reservation_time,
    guest_count,
    table_preference,
    occasion_type,
    event_description,
    special_requests,
    payment_proof,
    payment_status,
    status
)
VALUES
(?,?,?,?,?,?,?,?,?,?,?,?)
"
);

$stmt->bind_param(
"isssssssssss",

$data["user_id"],
$data["reservation_type"],
$data["reservation_date"],
$data["reservation_time"],
$data["guest_count"],
$data["table_preference"],
$data["occasion_type"],
$data["event_description"],
$data["special_requests"],
$paymentProofPath,
"Pending",
$data["status"]
);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "message" => "Reservation submitted successfully"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => $stmt->error,
        "mysql_error" => $conn->error
    ]);

}