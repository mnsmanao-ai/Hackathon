<?php
session_start();

// Vérifie que l'utilisateur est connecté et qu'il est un organisme
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'organisme') {
    header("Location: login.php");
    exit;
}

// Récupère le nom de l'utilisateur connecté
$name = $_SESSION['name'] ?? 'Utilisateur';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #a29bfe, #81ecec);
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #2d3436;
            text-align: center;
        }

        p {
            font-size: 2em;
            color: #fff;
            text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
            margin-bottom: 30px;
            animation: fadeIn 1s ease;
        }

        .card {
            background: #ffffffcc;
            backdrop-filter: blur(6px);
            padding: 30px 40px;
            border-radius: 15px;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
            width: 320px;
            animation: popIn 0.8s ease;
        }

        h2 {
            margin-top: 0;
            color: #0984e3;
        }

        ul {
            list-style: none;
            padding: 0;
            margin-top: 15px;
        }

        li {
            background: #dfe6e9;
            margin: 8px 0;
            padding: 10px 15px;
            border-radius: 8px;
            transition: 0.3s;
        }

        li:hover {
            background: #b2bec3;
            transform: scale(1.03);
        }

        a {
            display: inline-block;
            margin-top: 25px;
            text-decoration: none;
            color: white;
            background-color: #6c5ce7;
            padding: 10px 20px;
            border-radius: 8px;
            font-weight: bold;
            transition: 0.3s;
            box-shadow: 0 3px 6px rgba(0,0,0,0.15);
        }

        a:hover {
            background-color: #a29bfe;
            transform: scale(1.05);
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes popIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
</head>
<body>
    <!-- ✅ Affiche le nom du compte -->
    <p>Bienvenue <?php echo htmlspecialchars($name); ?> 👋</p>

    <div class="card">
        <h2>Espace Organisme</h2>
        <ul>
            <li><a href="#">Gérer les formations</a></li>
            <li><a href="#">Voir les apprenants inscrits</a></li>
            <li><a href="#">Publier une nouvelle offre</a></li>
        </ul>
    </div>

    <a href="idex.html">Déconnexion</a>
</body>
</html>
