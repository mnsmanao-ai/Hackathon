<?php
// --- Démarre la session pour vérifier le rôle de l'utilisateur ---
session_start();
require_once '#';

// --- Vérifie si l'utilisateur est bien un admin, sinon redirection vers la page de login ---
if (!isset($_SESSION['role']) || $_SESSION['role'] !== "admin") {
    header("Location: login.php");
    exit;
}

$msg = "";

// --- Si le formulaire est soumis ---
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Récupération des champs envoyés depuis le formulaire
    $email = $_POST['email'];
    $password = $_POST['password'];
    $name = $_POST['name'];
    $role = $_POST['role'];
    $organisation_name = $_POST['organisation_name'] ?? null;

    // --- Vérifie si l'email est déjà utilisé ---
    $check = $pdo->prepare("SELECT id FROM users WHERE email=?");
    $check->execute([$email]);

    if ($check->rowCount() > 0) {
        // Si doublon : message d’erreur
        $msg = "<p style='color:red'>⚠️ Email déjà utilisé !</p>";
    } else {
        // --- Insertion d’un nouvel utilisateur ---
        $query = $pdo->prepare(
            "INSERT INTO users (email, password, role, name) VALUES(?, ?, ?, ?)"
        );
        $query->execute([$email, password_hash($password, PASSWORD_DEFAULT), $role, $name]);

        // Récupère l’ID du nouvel utilisateur créé
        $new_user_id = $pdo->lastInsertId();

        // --- Si l’utilisateur est un organisme, on crée aussi une entrée dans la table 'organisations' ---
        if ($role === "organisme" && $organisation_name) {
            $queryOrg = $pdo->prepare(
                "INSERT INTO organisations(user_id, name, contact_email)
                 VALUES(?, ?, ?)"
            );
            $queryOrg->execute([$new_user_id, $organisation_name, $email]); 
        }

        // ✅ Message de confirmation ajouté ici
        $msg = "<p style='color:green'>✅ Le compte a été créé avec succès !</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<title>Créer un utilisateur</title>

<!-- Script JS pour afficher ou cacher le champ "Nom de l'organisme" selon le rôle sélectionné -->
<script>
function toggleOrg(){
    document.getElementById("org-field").style.display =
        (document.getElementById("role").value === "organisme")
        ? "block" : "none";
}
</script>

<!-- --- CSS pour le style visuel de la page --- -->
<style>
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background: linear-gradient(135deg, #81ecec, #74b9ff);
        color: #2d3436;
        text-align: center;
        padding-top: 60px;
    }

    /* Titre principal */
    h2 {
        font-size: 2em;
        color: #fff;
        margin-bottom: 30px;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
    }

    /* Bloc du formulaire */
    form {
        background: #ffffffcc;
        display: inline-block;
        padding: 30px 40px;
        border-radius: 12px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        text-align: left;
        min-width: 320px;
    }

    /* Champs de saisie */
    input, select {
        width: 100%;
        padding: 10px;
        margin: 5px 0 15px;
        border: 1px solid #b2bec3;
        border-radius: 8px;
        font-size: 1em;
    }

    label {
        font-weight: bold;
    }

    /* Bouton "Créer" */
    button {
        width: 100%;
        background-color: #0984e3;
        color: white;
        padding: 12px;
        border: none;
        border-radius: 8px;
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
        transition: 0.3s;
    }

    button:hover {
        background-color: #74b9ff;
        transform: scale(1.03);
    }

    /* Lien retour vers le dashboard admin */
    a {
        display: inline-block;
        margin-top: 20px;
        text-decoration: none;
        color: white;
        background-color: #6c5ce7;
        padding: 10px 20px;
        border-radius: 8px;
        transition: 0.3s;
        font-weight: bold;
        box-shadow: 0 3px 6px rgba(0,0,0,0.15);
    }

    a:hover {
        background-color: #a29bfe;
        transform: scale(1.05);
    }

    p {
        font-weight: bold;
    }
</style>

</head>
<body>

<!-- Titre principal -->
<h2>Créer un utilisateur</h2>

<!-- Affiche les messages (succès ou erreur) -->
<?php echo $msg; ?>

<!-- Formulaire de création de compte -->
<form method="POST">
    <input type="text" name="name" placeholder="Nom complet" required><br>
    <input type="email" name="email" placeholder="Email" required><br>
    <input type="password" name="password" placeholder="Mot de passe" required><br>

    <!-- Sélection du rôle -->
    <label>Rôle :</label>
    <select name="role" id="role" onchange="toggleOrg()" required>
        <option value="">Choisir</option>
        <option value="admin">Admin</option>
        <option value="organisme">Organisme</option>
    </select><br>

    <!-- Champ caché qui s’affiche uniquement si rôle = organisme -->
    <div id="org-field" style="display:none;">
        <input type="text" name="organisation_name" placeholder="Nom de l'organisme"><br>
    </div>

    <button type="submit">Créer</button>
</form>

<!-- Lien de retour vers le tableau de bord admin -->
<br>
<a href="dashboard_admin.php">Retour Dashboard Admin</a>

</body>
</html>
