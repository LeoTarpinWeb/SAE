<?php
require 'bootstrap.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!empty($_POST['Email']) && !empty($_POST['mdp'])) {
        $Email = $_POST["Email"];
        $mdp = $_POST["mdp"];
        $recupUser = $dbh->prepare('SELECT * FROM client WHERE Email = ? AND mdp = ?');
        $recupUser->execute(array($Email, $mdp));

        if ($recupUser->rowCount() > 0) {
            $row = $recupUser->fetch();
            $idUtilisateur = $row["ID_Client"];
            $_SESSION['ID_Client'] = $idUtilisateur;
            header('Location: command.php');
            exit; 
        } else {
            echo "Votre mot de passe ou pseudo est incorrect";
        }
    } else {
        echo "Veuillez compléter les champs.";
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
    <title>Connexion</title>
</head>
<bo<div class="container" id="container">
    <div class="form-container sign-up-container">
        <form action="#">
            <h1>Inscription</h1>
            <input type="text" placeholder="Name" required/>
            <input type="Email" placeholder="Email" required/>
            <input type="password" placeholder="Mot de passe" required/>
            <input type="password" placeholder="Confirmation de ton mot de passe" required/>
            <input type="date" name="date-naissance" required>
            <button>Inscription</button>
        </form>
    </div>
    <div class="form-container sign-in-container">
	<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
            <h1>Connexion</h1>
            <input type="Email" name="Email" placeholder="Email" />
            <input type="password" name="mdp" placeholder="Mot de passe" />
            <a href="#">Mot de passe oublié ?</a>
            <button>Connexion</button>
        </form>
    </div>
		<div class="overlay-container">
		<div class="overlay">
		<img class="masc" src="./MASCOTTE.png" style="right:15vw;">
		<div class="overlay-panel overlay-left">
		<img src="logo.png">	
                <h1>Tu es déjà membre ?</h1>
                <p>Veuillez vous connecter pour continuer votre aventure avec nous.</p>
                <button class="ghost" id="signIn">Connexion</button>
            </div>
			<div class="overlay-panel overlay-right">
			<img src="logo.png">
                <h1>Pas encore membre ?</h1>
                <p>Entrez vos informations personnelles et commencez votre aventure avec nous.</p>
                <button class="ghost" id="signUp">Inscription</button>
            </div>
		</div>
		</div>
    </div>
</body>
<script src="./java.js"></script>
</html>