<?php
session_start();
require_once '#';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $role = $_POST['role'];
  

// Vérifie si l'utilisateur existe
// requête préparée : récupérer en SELECT l'utilisateur avec le mail et le role donnés
$query = $pdo->prepare("SELECT * FROM users WHERE email = ? AND role = ?");
$query->execute([$email, $role]);

// puis utiliser password_verify pour vérifier si le mot de passe entré correspond au mot de passe hashé en BDD
$user = $query->fetch();

if ($user && password_verify($password, $user['password'])) {
     {
        // Connexion réussie
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['role'] = $user['role'];
        $_SESSION['name'] = $user['name'];

        // Redirection selon le rôle
        switch ($user['role']) {
            case "admin":
                header("Location: dashboard_admin.php");
                break;
            case "organisme":
                header("Location: dashboard_com.php");
                break;
        }
}
}

     else {
    //     ❌ Identifiants invalides
        header("Location: login_error.php");
        exit;
            }
        }
