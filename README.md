# Application mobile de sondages

Ce projet a été réalisé dans le cadre d'une SAé au cours du quatrième semestre de la Licence professionnelle BUT. L'application mobile de sondages permet aux utilisateurs de participer à des sondages et de soumettre leurs réponses.

## Configuration de l'API

L'application utilise une API pour récupérer les données des sondages. Avant de lancer l'application, assurez-vous de démarrer l'API en local en suivant les étapes appropriées. Vous devez également configurer l'URL de l'API dans l'application. Voici comment procéder :

1. Ouvrez le fichier `config/api.js` de l'application.
2. Trouvez la variable `api_link`.
3. Remplacez la valeur de `api_link` par l'URL de votre réseau local est assuré vous que votre téléphone y est également connecté

## Fonctionnalités

- Affichage des sondages disponibles à partir de l'API.
- Affichage des questions et des options de réponse pour chaque sondage.
- Soumission des réponses des utilisateurs aux sondages.
- Gestion des utilisateurs et authentification pour accéder aux sondages.
- Interface utilisateur réactive et conviviale.

## Installation

1. Clonez ce dépôt : `git clone https://github.com/votre-utilisateur/votre-projet.git`.
2. Accédez au répertoire du projet : `cd votre-projet`.
3. Installez les dépendances : `npm install`.
4. Après avoir installer Expo sur votre appareil, lancez l'application : `npx expo start`.

Assurez-vous d'avoir démarré l'API en local avant de lancer l'application.

## Contribuer

Les contributions à ce projet sont les bienvenues. Vous pouvez ouvrir une issue pour signaler des problèmes ou proposer des améliorations. Vous pouvez également soumettre des pull requests pour contribuer au développement de l'application.
