#!/usr/bin/python2.7
#-*- coding: utf-8 -*-

#on ouvre le fichier en mode lecture
fichier_resultats_negatifs= open("result_negatif.txt", "r")
#on enregistre la variable contenue dans le fichier
resultats_negatifs = print fichier_resultats_negatifs
#On referme le fichier
fichier_resultats_negatifs.close()
#on incremente la variable
resultats_negatifs = resultats_negatifs + 1
#on ouvre le fichier en mode écriture
fichier_resultats_negatifs = open("result_negatif.txt", "w")
#on écrit la variable dans le fichier
fichier_resultats_negatif.write(resultats_negatifs)
#on referme le fichier
fichier_resultats_negatifs.close()