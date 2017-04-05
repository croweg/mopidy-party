<?php
//on ouvre le fichier
$fichier_resultats=fopen('result_negatif.txt', 'r+');
//on recupere la variable
$vote_n=fgets($fichier_resultats);
//on efface le contenu du fichier
ftruncate($fichier_resultats,0);
//on se place au debut du fichier
fseek($fichier_resultats,0);
//on incremente la variable
$vote_n=$vote_n+1;
//on ecrit les variables dans le fichier txt
fputs($fichier_resultats, $vote_n);
//on ferme le fichier
fclose($fichier_resultats);
?>
<html>
<h1>Le vote negatif a ete enregistre</h1>
</html>
