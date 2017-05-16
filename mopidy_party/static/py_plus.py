#!/usr/bin/python2.7
#-*- coding: utf-8 -*-

#on ouvre le fichier en mode lecture
fichier_resultats_positifs= open("result_positif.txt", "r")
#on enregistre la variable contenue dans le fichier
resultats_positifs = print fichier_resultats_positifs
#On referme le fichier
fichier_resultats_positifs.close()
#on incremente la variable
resultats_positifs = resultats_positif + 1
#on ouvre le fichier en mode écriture
fichier_resultats_positifs = open("result_positif.txt", "w")
#on écrit la variable dans le fichier
fichier_resultats_positifs.write(resultats_positifs)
#on referme le fichier
fichier_resultats_positifs.close()