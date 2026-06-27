<?php

include "db.php";

$date = $_GET["date"];

$result = $conn->query(
"SELECT *
 FROM capacity_settings
 WHERE booking_date='$date'"
);

echo json_encode(
  $result->fetch_assoc()
);