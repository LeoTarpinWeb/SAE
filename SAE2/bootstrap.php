<?php

if (($_SERVER['REMOTE_ADDR'] == '127.0.0.1' or $_SERVER['REMOTE_ADDR'] == '::1')) {
    require 'Config/config.local.php';
} else {
    require 'Config/config.prod.php';
}
// les fonctions de debug
require 'Helpers/debug.php';
// les fonctions utilisateur
require 'Helpers/functions.php';


// mettre en place le processus de connexion à la base de données
// documentation php.net/manual/fr/pdo.construct.php
try {
    // mettre en place la variable $dsn (Data Source Name) qui contient
    // les informations pour se connecter à la base
    $dsn = 'mysql:host=' . APP_DB_HOST . ';dbname=' . APP_DB_NAME . ';charset=UTF8';
    // la variable GLOBALE $dbh (Data Base Handler) est importante
    // c'est elle qui permet de dialoguer avec la base
    $dbh = new PDO(
        $dsn,
        // nom de l'utilisateur MYSQL
        APP_DB_USER,
        // mot de passe de dl'utilisateur MYSQL
        APP_DB_PASSWORD,
        // réglage d'options qui permet de récupérer les informations de la base
        // sous forme de tableau associatif
        // et de demander de déclencher une exception quand une erreur de SQL est détectée
        [
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ]
    );
} catch (PDOException $e) {
   // affichage d'un message résumé
    echo "<h3>ERREUR</h3><p>{$e->getMessage()}</p>";
    // arrêt du script
    die();

}
