<?php
require 'bootstrap.php';
session_start();

if (!isset($_SESSION['ID_Client'])) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['ID_Client'];

$sql = 'SELECT * FROM `client` WHERE `ID_Client` = :user_id';
$stmt = $dbh->prepare($sql);
$stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nom = $_POST['nom'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];

    $updateSql = 'UPDATE `client` SET `Nom` = :nom, `Prenom` = :prenom, `Email` = :email WHERE `ID_Client` = :user_id';
    $updateStmt = $dbh->prepare($updateSql);
    $updateStmt->bindParam(':nom', $nom, PDO::PARAM_STR);
    $updateStmt->bindParam(':prenom', $prenom, PDO::PARAM_STR);
    $updateStmt->bindParam(':email', $email, PDO::PARAM_STR);
    $updateStmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);

    if ($updateStmt->execute()) {
        header('Location: compte.php');
        exit();
    } else {
        echo 'Erreur lors de la mise à jour des informations.';
    }
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet">
    <title>Mon Compte</title>
</head>
<body>
    <main>
        <h1>Mon Compte</h1>
        <div>
            <h2>Informations Personnelles</h2>
            <p>Nom: <?php echo $user['Nom']; ?></p>
            <p>Prénom: <?php echo $user['Prenom']; ?></p>
            <p>Email: <?php echo $user['Email']; ?></p>
            <p>Points de Fidélité: <?php echo $user['Points_Fidelite']; ?></p>
        </div>
        <div>
            <h2>Modifier les Informations</h2>
            <form action="compte.php" method="post">
                <label for="nom">Nom:</label>
                <input type="text" id="nom" name="nom" value="<?php echo $user['Nom']; ?>">
                <label for="prenom">Prénom:</label>
                <input type="text" id="prenom" name="prenom" value="<?php echo $user['Prenom']; ?>">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" value="<?php echo $user['Email']; ?>">
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    </main>
    <footer>
    </footer>
</body>
</html>
