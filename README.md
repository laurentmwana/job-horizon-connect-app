# Job Horizon Connect

[![Laravel](https://img.shields.io/badge/Laravel-12-red?style=flat-square&logo=laravel)](https://laravel.com/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-0.11-purple?style=flat-square)](https://inertiajs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-teal?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

**Job Horizon Connect** est une application web moderne permettant de faciliter la mise en relation entre **candidats** et **recruteurs**, en simplifiant la recherche d'emploi et la gestion des offres.

---

## Objectifs

- Permettre aux **candidats** de créer un profil, consulter les offres et postuler facilement.
- Permettre aux **recruteurs** de publier, gérer leurs offres et suivre les candidatures.
- Offrir une plateforme simple, rapide et efficace (MVP).

---

## Public cible

- **Candidats** : étudiants, jeunes diplômés, professionnels en reconversion.
- **Recruteurs / entreprises** : responsables RH, employeurs.

---

## Fonctionnalités

### Authentification

- Inscription / Connexion.
- Gestion des rôles : `candidat`, `recruteur`, `admin` (optionnel MVP).

### Espace Candidat

- Créer et gérer son profil (infos perso, compétences, expériences).
- Consulter les offres disponibles.
- Postuler à une offre en un clic avec option message.

### Espace Recruteur

- Publier une offre d’emploi (titre, description, compétences, lieu, type de contrat).
- Modifier ou supprimer ses offres.
- Consulter les candidatures reçues.

### Espace Admin (optionnel)

- Gérer les utilisateurs et les offres.

---

## Technologies utilisées

- **Backend** : Laravel 11
- **Frontend** : React + Inertia.js
- **Base de données** : MySQL ou PostgreSQL
- **UI/UX** : Tailwind CSS
- **Gestion des rôles & permissions** : Spatie Laravel Permission

---

## Installation rapide

1. Cloner le projet :

```bash
git clone <URL_DU_PROJET>
```

2. Installer les dépendances PHP :

```bash
composer install
```

3. Installer les dépendances JS :

```bash
npm install
```

4. Copier le fichier `.env` :

```bash
cp .env.example .env
```

5. Générer la clé Laravel :

```bash
php artisan key:generate
```

6. Configurer la base de données dans `.env`.

7. Lancer les migrations :

```bash
php artisan migrate
```

8. Compiler les assets :

```bash
npm run dev
```

9. Démarrer le serveur Laravel :

```bash
php artisan serve
```

---

## Planning de réalisation

| Jour                      | Tâches                                                             |
| ------------------------- | ------------------------------------------------------------------ |
| Jour 1-2 (Jeudi-Vendredi) | Mise en place Laravel + Inertia + React, Authentification et rôles |
| Jour 3 (Samedi)           | Développement espace candidat (profil + liste des offres)          |
| Jour 4 (Dimanche)         | Développement espace recruteur (publier et gérer les offres)       |
| Jour 5 (Lundi)            | Amélioration design, tests et correctifs                           |
| Jour 6 (Mardi)            | Démo et présentation du projet                                     |

---

## Livrables

- Application web fonctionnelle (MVP)
- Documentation utilisateur (guide rapide)
- Documentation technique (installation, stack utilisée)

---

> Built with ❤️ using Laravel, React & Inertia.js
