<?php
require 'bootstrap.php';
session_start();
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./style.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins&amp;display=swap" rel="stylesheet">
    <title>Fuéego</title>
</head>
<body>
    <header>
        <nav class="navi">
            <a href="./accueil.php"> Accueil </a>
            <a>Notre menu</a>
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
    <main>
        <div class="propos">
            <?php
            $sql = 'SELECT * FROM `plat`;';
            $stv = $dbh->prepare($sql);
            $stv->execute();
            $offres = $stv->fetchAll();
            ?>
            <?php foreach ($offres as $offre) { ?>
                <div class="prepa">
                    <img src="img/<?php echo $offre['illustration'] ?>" alt="<?php echo $offre['Nom'] ?>">
                    <p><?php echo $offre['Nom'] ?></p>
                    <div>
                        <a href="./info.php?id=<?php echo $offre['ID_Plat'] ?>"><button>Info</button></a>
                        <button>ajouter</button>
                    </div>
                </div>
            <?php } ?>
        </div>
    </main>
    <footer>

    </footer>
</body>
<script src="./java_main.js"></script>
</html>
