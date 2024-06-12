Projet de Détection de Couleur Dominante

Idée du Projet

Ce projet consiste à développer une application web qui permet de capturer une image à l'aide de la caméra d'un appareil mobile ou de sélectionner une image depuis la galerie. Une fois l'image capturée ou sélectionnée, l'application analyse l'image pour déterminer la couleur dominante et affiche cette couleur à l'utilisateur.

Fonctionnalités

1. Capture de Photo :
   - L'utilisateur peut capturer une photo en utilisant la caméra frontale ou arrière de son appareil.
   - L'utilisateur peut également changer entre la caméra frontale et la caméra arrière.

2. Sélection d'Image depuis la Galerie :
   - L'utilisateur peut choisir une image depuis la galerie de son appareil pour analyse.

3. Analyse de Couleur :
   - L'application analyse l'image capturée ou sélectionnée pour déterminer la couleur dominante.
   - L'application utilise l'algorithme de K-Means pour une détection de couleur plus précise.

4. Affichage de la Couleur Dominante :
   - L'application affiche la couleur dominante détectée à l'utilisateur et redirige vers une page de chargement avec les détails de la couleur.

5. Jeu de Couleur :
   - L'application inclut un jeu où un utilisateur ou plusieurs utilisateurs doivent trouver la couleur dominante d'une couleur avec leurs appareils photos.

Implémentation

Structure des Fichiers

- `index.html` : Page principale de l'application.
- `style.css` : Fichier de styles CSS pour la mise en page et le design.
- `script.js` : Script JavaScript contenant la logique de capture et d'analyse des images.
- `loader.html` : Page de redirection affichant les détails de la couleur dominante.
- `give_me_color.html` : Page de sélection d'image depuis la galerie.
- `result.html` : Page affichant le résulatat de l'analyse de couleur.
- `style_game.css` : Fichier de styles CSS pour le jeu de couleur.
- `scripts.js` : Script JavaScript pour les fonctionnalités additionnelles du jeu.
- `manifest.json` : Fichier de configuration pour les Progressive Web Apps (PWA).
- `service-worker.js` : Script de service worker pour la PWA.
- `find-the-color.html` : Page du jeu de couleur.

Maquette figma : 
https://www.figma.com/design/QA7pgYgXoiWl84jbB1jBqk/Untitled?node-id=0-1&t=LpsHiSlwOKdqtc2V-1

