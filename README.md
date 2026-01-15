# Commandes faites pour lancer l'appli 
## par *Cédric HU*

Voici les commandes faites pour installer et déployer l'application du début à la fin :

### Première étape :

- Cloner le projet :
    - git clone https://github.com/Dark01213/petitTp.git
- Se placer dans le dossier du projet :
    - cd petitTp/petittp

### Étape Deux :

- Lancer l'API Flask localement :
    - cd api
    - pip install -r requirements.txt
    - python app.py
- Tester l'API :
    - Aller sur http://localhost:8080/health (doit afficher {"status": "ok"})
    - Aller sur http://localhost:8080/hello (doit afficher Hello World)
- Lancer le site statique :
    - cd ../site
    - Ouvrir index.html dans un navigateur

### Étape Trois : Dockerisation

- Construire l'image Docker de l'API :
    - cd api
    - docker build -t monuserimage/petittp-api:latest .
- Lancer le conteneur :
    - docker run -p 8080:8080 monuserimage/petittp-api:latest
- Construire l'image Docker du site :
    - cd ../site
    - docker build -t monuserimage/petittp-site:latest .
- Lancer le conteneur du site :
    - docker run -p 8081:80 monuserimage/petittp-site:latest
- Lancer les deux avec docker-compose :
    - cd ..
    - docker-compose up --build

### Étape Quatre : Tests

- Lancer les tests unitaires Flask :
    - cd api
    - pip install -r requirements-test.txt
    - pytest
- Lancer les tests E2E avec Jest :
    - cd ../e2e
    - npm ci
    - API_URL=http://localhost:8080 npm test

### Étape Cinq : CI/CD (GitHub Actions)

- À chaque push sur main, la pipeline effectue automatiquement :
    1. Les tests unitaires (pytest)
    2. Les tests E2E (Jest)
    3. Le build et le push de l'image Docker sur Docker Hub
    4. Le déploiement automatique sur la VM Azure via SSH
    5. Un healthcheck sur l'API

- Les identifiants sensibles (Docker Hub, SSH, IP VM) sont stockés dans les secrets GitHub, tous finissant par `image`.

### Étape Six : Déploiement Azure

- Le workflow se connecte à la VM Azure, récupère la dernière image Docker, arrête et supprime l'ancien conteneur, puis lance le nouveau (nom du conteneur : myapp).
- L'application est accessible sur l'IP publique de la VM, port 8080.
- Le déploiement est idempotent : relancer le workflow ne crée pas de doublon.

### Dernière étape :

- Pour vérifier le déploiement, accéder à :
    - http://<IP_VM_AZURE>:8080/health
    - http://<IP_VM_AZURE>:8080/hello

---

## Choix techniques
- Python Flask pour l'API
- Nginx pour le site statique
- Docker & docker-compose pour l'industrialisation
- Pytest pour les tests unitaires, Jest pour les E2E
- GitHub Actions pour la CI/CD
- Secrets GitHub pour la sécurité

---

## Déclenchement du déploiement
- Un simple `git push` sur la branche main déclenche tout le pipeline automatiquement, sans action manuelle.
