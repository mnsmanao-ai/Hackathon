<?php
session_start();

// Vérifie que l'utilisateur est bien connecté et qu'il a le rôle admin
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'admin') {
    header("Location: login.php");
    exit;
}

// Récupère le nom de la personne connectée
$name = $_SESSION['name'] ?? 'Admin';
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Admin</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            background: linear-gradient(135deg, #74b9ff, #a29bfe);
            color: #2d3436;
            text-align: center;
            padding-top: 80px;
        }

        h2 {
            font-size: 2em;
            margin-bottom: 40px;
            color: #fff;
            text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }

        a {
            display: inline-block;
            text-decoration: none;
            color: #fff;
            background-color: #0984e3;
            padding: 12px 25px;
            border-radius: 8px;
            font-weight: bold;
            transition: 0.3s ease;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
        }

        a:hover {
            background-color: #74b9ff;
            transform: scale(1.05);
        }

        br {
            line-height: 2;
        }
    </style>
</head>

<body>
    <!-- ✅ Affiche dynamiquement le nom de l'utilisateur -->
    <h2>Bienvenue <?php echo htmlspecialchars($name); ?> 👋</h2>

    <a href="create_user.php">Créer un utilisateur</a>
    <br><br>
    <a href="supp_user.php">Supprimer un utilisateur</a>
    <br><br>
    <a href="idex.html">Déconnexion</a>
</body>

</html>
