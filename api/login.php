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

$email = $data["email"];
$password = $data["password"];

$stmt = $conn->prepare(
    "SELECT id, fullname, email, password, role
     FROM users
     WHERE email = ?"
);

$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password"
    ]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user["password"])) {

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user["id"],
            "fullname" => $user["fullname"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Invalid email or password"
    ]);
}