<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Erreur de connexion</title>
<style>
    body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #ff7675, #d63031);
        color: #fff;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
    }

    .card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(6px);
        padding: 40px 50px;
        border-radius: 15px;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        max-width: 500px;
        animation: fadeIn 0.8s ease;
    }

    h1 {
        font-size: 2em;
        margin-bottom: 15px;
    }

    p {
        font-size: 1.1em;
        margin-bottom: 25px;
    }

    a {
        display: inline-block;
        background-color: #0984e3;
        color: white;
        padding: 12px 25px;
        border-radius: 8px;
        font-weight: bold;
        text-decoration: none;
        transition: background 0.3s ease, transform 0.2s ease;
    }

    a:hover {
        background-color: #74b9ff;
        transform: scale(1.05);
    }

    footer {
        position: absolute;
        bottom: 15px;
        color: rgba(255,255,255,0.8);
        font-size: 0.85em;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
</style>
</head>

<body>

<div class="card">
    <h1>❌ Identifiants invalides</h1>
    <p>L’adresse e-mail, le mot de passe ou le rôle est incorrect.<br>
       Veuillez réessayer ou contacter le support si le problème persiste.</p>

    <a href="idex.html">🔁 Réessayer</a>
    <a href="mailto:support@plateformeripeur.com?subject=Problème%20de%20connexion">📩 Contacter le support</a>
</div>

<footer>© 2026 Plateforme Ripeur — Assistance disponible 7j/7</footer>

</body>
</html>
