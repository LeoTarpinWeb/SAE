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
    <title>info</title>
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
            <a> Mon compte</a>
            <a> Accessibilité</a>
        </nav>
        <input type="checkbox" class=" d-none" id="menu_checkbox">
        <label for="menu_checkbox">
            <div></div>
            <div></div>
            <div></div>
        </label>
        <div>
            <img src=" img/logo.png">
        </div>
    </header>
    <main>
    </main>
</body>
<script src="./java_main.js"></script>
</html>