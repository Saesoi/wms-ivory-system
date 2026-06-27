<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

include "db.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {
    echo json_encode([
        "success" => false,
        "message" => "No data received"
    ]);
    exit;
}

$fullname = $data["fullname"];
$email = $data["email"];
$password = $data["password"];

$hashedPassword = password_hash(
    $password,
    PASSWORD_DEFAULT
);

$check = $conn->prepare(
    "SELECT id FROM users WHERE email = ?"
);

$check->bind_param("s", $email);
$check->execute();

$result = $check->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "success" => false,
        "message" => "Email already exists"
    ]);
    exit;
}

$sql = "INSERT INTO users
(fullname,email,password)
VALUES
(?,?,?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sss",
    $fullname,
    $email,
    $hashedPassword
);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Account created"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => $conn->error
    ]);
}