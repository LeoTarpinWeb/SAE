<?php
require 'bootstrap.php';
session_start();

if (isset($_GET['id'])) {
    $idProduit = $_GET['id'];

    $sql = 'SELECT * FROM `plat` WHERE `ID_Plat` = :idProduit';
    $stmt = $dbh->prepare($sql);
    $stmt->bindParam(':idProduit', $idProduit, PDO::PARAM_INT);
    $stmt->execute();
    $produit = $stmt->fetch(PDO::FETCH_ASSOC);
} else {
    header('Location: accueil.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet">
    <title><?php echo isset($produit['Nom']) ? $produit['Nom'] : ''; ?></title>
</head>
<body>
<header>
        <nav class="navi">
            <a href="./accueil.php"> Accueil </a>
            <a href="./menu.php">Notre menu</a>
            <a>Votre commande</a>
        </nav>
        <span></span>
        <nav class="navi">
            <a href="./compte.php"> Mon compte</a>
            <a> Accessibilité</a>
        </nav>
        <input type="checkbox" class="d-none" id="menu_checkbox">
        <label for="menu_checkbox">
            <div></div>
            <div></div>
            <div></div>
        </label>
        <div>
            <img src="img/logo.png">
        </div>
    </header>
    <main class="info">
        <div>
            <img class="repre" src="img/<?php echo isset($produit['illustration']) ? $produit['illustration'] : ''; ?>">
        </div>
        <span></span>
        <div>
            <h1><?php echo isset($produit['Nom']) ? $produit['Nom'] : ''; ?></h1>
            <p>Les ingrédients sont :</p>
            <?php
            if (isset($produit['Description'])) {
                $ingre = explode(",", $produit['Description']);
                foreach ($ingre as $ingredient) {
                    echo '<p>' . trim($ingredient) . '</p>';
                }
            } else {
                echo '<p>Aucune information sur les ingrédients.</p>';
            }
            ?>
            <h2>Le prix est de <?php echo isset($produit['Prix']) ? $produit['Prix'] . '€' : ''; ?></h2>
        </div>
    </main>
</body>
<script src="./java_main.js"></script>
</html>
