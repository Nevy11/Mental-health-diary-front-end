#  Mental Health Diary (Front-End)

A comprehensive front-end application for the Mental Health Diary project. This platform provides users with tools to log their thoughts, track their mental well-being, and interact with an AI-powered therapist. 

This repository contains the user interface and client-side logic, built with [Angular](https://angular.dev/) and beautifully styled using Angular Material.

---

##  Key Technologies

- **Framework:** [Angular 19](https://angular.dev/)
- **UI Library:** [Angular Material](https://material.angular.io/)
- **Styling/Components:** Includes integrations like `@ctrl/ngx-emoji-mart` for expressive journaling.
- **Rendering:** Server-Side Rendering (SSR) enabled for better performance and SEO.
- **Package Manager:** [Yarn](https://yarnpkg.com/)

---

##  Related Services (Ecosystem)

To run the full application and enable all features (like data persistence and AI chat), you will need to clone and run the following back-end services alongside this front-end:

- **Main Backend:** [Mental-Health-Diary-backend](https://github.com/Nevy11/Mental-Health-Diary-backend)
  *(Handles user data, diary entries, and core business logic)*
- **Therapist AI Backend:** [therapistGpt](https://github.com/Nevy11/therapistGpt)
  *(Powers the AI therapist conversational interface)*

---

##  Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following installed on your local development environment:
- [Node.js](https://nodejs.org/en/) (v18 or higher recommended)
- [Yarn](https://yarnpkg.com/) package manager
- [Angular CLI](https://angular.dev/tools/cli) (installed globally: `npm install -g @angular/cli` or `yarn global add @angular/cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone git@github.com:Nevy11/Mental-health-diary-front-end.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd Mental-health-diary-front-end/
   ```

3. **Install the dependencies:**
   This project uses Yarn. Run the following command to install all required packages:
   ```bash
   yarn install
   ```

---

## 💻 Usage & Available Scripts

In the project directory, you can run the following commands:

### `yarn start`
Runs the app in the development mode.
The application will automatically open in your default browser at `http://localhost:4200/`. The page will reload if you make edits.

### `yarn build`
Builds the app for production to the `dist/` folder.
It correctly bundles Angular in production mode and optimizes the build for the best performance.

### `yarn serve:ssr:mentalHealthDiary`
Serves the application with Server-Side Rendering (SSR) using Node and Express. Useful for testing the production SSR build locally.

### `yarn test`
Launches the test runner (Karma) to execute unit tests.

### `yarn watch`
Builds the application and watches for file changes, rebuilding automatically.

---

##  Development Notes

- **Code Scaffolding:** Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
- **Styling:** The project utilizes Angular Material for its design system. Ensure you leverage Material components for a consistent UI.

---

##  Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
