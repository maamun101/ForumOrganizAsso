# 📌 Projet de Technologie Web

Ce projet fait partie du cours **Technologie du Web** et utilise **HTML, CSS, React, Express et MongoDB** pour développer une application web interactive.

---

## 🚀 Installation et Exécution

Pour cloner et exécuter le projet en local, suivez ces étapes :

```bash
# 1. Cloner le repository
git clone https://github.com/maamun101/ForumOrganizAsso.git

# 2. Se déplacer dans le dossier du projet
cd ProjetTechnologieWeb-LU3IN017

# 3. Se déplacer dans la dossier frontend
cd frontend

# 3. Installer les dépendances
npm install

# 4. Installer axios
npm install axios

# 5. Lancer le frontend
npm run dev

# 6. Se déplacer dans le dossier backend
cd ../backend

# 7. Installer express
npm install express

# 8. Installer nodemom
npm install nodemon

# 9. Installer mongodb
npm install mongodb

# 10. Installer express-session
npm install express-session

# 9. Lancer le backend
npm start
```

## Cahier des charges

Notre site **Organiz’asso** permet à des membres d’une association d’échanger des messages sur des forums.

L’association est pilotée par un conseil d’administration, qui est composé de membres élus appelés administrateurs. Il propose deux forums :

- **Le forum ouvert** : chaque membre inscrit peut le consulter et y poster des messages.
- **Le forum fermé** : réservé aux membres du conseil d’administration.

### Gestion des utilisateurs

Hors connexion, un utilisateur a seulement la possibilité de créer un compte. Son inscription doit être validée par un administrateur pour lui attribuer le statut de membre.

Une personne arrivant sur le site peut :
- Créer un compte et ainsi demander le statut de membre.
- Se connecter.

Une fois connecté, et après validation de son inscription par un administrateur, un membre peut :
- **Créer des messages** :
  - En réponse à un message précédemment posté.
  - Pour démarrer une nouvelle discussion.
- **Visualiser son profil**, contenant au moins la liste des messages qu’il a publiés. Depuis son profil, il peut supprimer ses propres messages.
- **Consulter le profil d’autres membres**.
- **Rechercher des messages** en précisant des mots-clés, un intervalle de temps de publication ou leur auteur.

### Rôles et permissions des administrateurs

Les administrateurs bénéficient de droits supplémentaires :
- Accès au forum fermé.
- Attribution ou retrait du statut d’administrateur à un autre utilisateur (sauf à lui-même).
- Gestion des inscriptions : validation ou refus du statut de membre d’un utilisateur inscrit.

### Déconnexion

À la fin de son activité, l’utilisateur a la possibilité de se déconnecter.
