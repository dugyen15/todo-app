# Todo App – DSO101 Assignment 3

A simple Node.js + Express todo list application with full CI/CD pipeline using GitHub Actions, Docker, DockerHub, and Render.com.

---

## Steps Taken

### 1. Built the Application
- Created a Node.js/Express REST API with four endpoints: GET, POST, PUT, DELETE for todos.
- Built a frontend using plain HTML/CSS/JS served as static files.
- Added Jest + Supertest unit tests covering all API routes.

### 2. Containerized with Docker
- Wrote a `Dockerfile` using `node:20-alpine` as the base image.
- Tests run automatically during the Docker build step (`RUN npm test`).
- App is exposed on port 3000.

### 3. Set Up GitHub Actions CI/CD
- Created `.github/workflows/deploy.yml`.
- On every push to `main`, the workflow:
  1. Checks out the code.
  2. Logs into DockerHub using GitHub Secrets.
  3. Builds the Docker image (which also runs tests).
  4. Pushes the image to DockerHub.
  5. Triggers a Render.com redeploy via webhook.

### 4. Deployed on Render.com
- Created a new Web Service on Render.com.
- Selected "Deploy an existing image" and pointed it to the DockerHub image.
- Added the Render Deploy Hook URL as a GitHub Secret.

---

## GitHub Secrets Required

| Secret Name             | Where to Get It                                      |
|-------------------------|------------------------------------------------------|
| `DOCKERHUB_USERNAME`    | Your DockerHub username                              |
| `DOCKERHUB_TOKEN`       | DockerHub → Account Settings → Security → New Token |
| `RENDER_DEPLOY_HOOK_URL`| Render Dashboard → Service → Settings → Deploy Hook |

---

## Challenges Faced

- Render.com does not automatically redeploy when a new image is pushed to DockerHub. This was solved by using Render's Deploy Hook URL, which is called via `curl` in the GitHub Actions workflow.
- Making sure tests pass inside the Docker build required the test dependencies (`jest`, `supertest`) to be installed before running `RUN npm test`.

---

## Learning Outcomes

- Understood the full CI/CD pipeline: code → test → build → push → deploy.
- Learned how to use GitHub Secrets to safely store credentials.
- Learned how Docker images work and how to push them to a registry.
- Learned how to trigger automated deployments using webhooks.

---

## Live Deployment

🔗 **Render URL:** [ADD YOUR RENDER URL HERE]

---

## Screenshots

> Add the following screenshots in a `screenshots/` folder and link them here:
> - `github-actions-success.png` – Successful workflow run
> - `dockerhub-image.png` – Image visible on DockerHub
> - `render-deployment.png` – Live deployment on Render.com