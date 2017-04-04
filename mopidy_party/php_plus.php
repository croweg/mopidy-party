<?php
//on ouvre le fichier
$fichier_resultats=fopen('result_positif.txt', 'r+');
//on recupère la variable
$vote_p=fgets($fichier_resultats);
//on efface le contenu du fichier
ftruncate($fichier_resultats,0);
//on se place au debut du fichier
fseek($fichier_resultats,0);
//on incremente la variable
$vote_p=$vote_p+1;
//on ecrit les variables dans le fichier txt
fputs($fichier_resultats, $vote_p);
//on ferme le fichier
fclose($fichier_resultats);
?>

<html>
<h1>Le vote positif a ete enregistre</h1>
</html>
