<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$result = $conn->query(
    "SELECT *
     FROM restaurant_tables
     ORDER BY id ASC"
);

$tables = [];

while($row = $result->fetch_assoc()){
    $tables[] = $row;
}

echo json_encode($tables);