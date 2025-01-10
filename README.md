# Application de Gestion des Employés

Une application React permettant d'ajouter et d'afficher une liste d'employés avec leurs informations personnelles. Les employés peuvent être ajoutés via un formulaire, et la liste peut être filtrée grâce à une barre de recherche.

## Fonctionnalités

- Formulaire pour ajouter un nouvel employé avec les informations suivantes :
  - Prénom
  - Nom
  - Date de naissance
  - Date de début
  - Adresse (rue, ville, état, code postal)
  - Département
- Validation des champs du formulaire avec des messages d'erreur en cas de saisie incorrecte.
- Modal de confirmation après l'ajout d'un employé.
- Liste des employés affichée dans un tableau avec possibilité de recherche.
- Données persistantes dans `localStorage`.

## Structure du Projet

### Composants principaux

- **PersonForm** : Un formulaire pour saisir les informations d'un nouvel employé. Il utilise le `PersonContext` pour ajouter un employé à l'état global.
- **PersonList** : Affiche une liste des employés sous forme de tableau. Un champ de recherche permet de filtrer les résultats.
- **PersonListPage** : Page affichant la liste des employés.
- **App** : Composant principal qui configure les routes et le contexte `PersonProvider`.
- **ErrorMessage** : Affiche des messages d'erreur pour chaque champ du formulaire.
- **ConfirmationModal** : Affiche une fenêtre modale de confirmation après l'ajout d'un employé.

### Contexte

Le contexte `PersonContext` permet de gérer l'état global des employés, d'ajouter de nouveaux employés et de persister les données dans `localStorage`.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les dépendances nécessaires avec npm :

```bash
npm install

## Site Herbégé (WIP)

https://asuramoon.github.io/WealthHealth/
