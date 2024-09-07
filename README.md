![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)


# GitHub Candidate Search Application

## Description

The GitHub Candidate Search Application allows employers to search for potential candidates on GitHub and manage a list of selected candidates. The application utilizes the GitHub API to retrieve user profiles and display key information such as name, username, location, avatar, email, company, and GitHub profile link. Users can save or reject candidates, with saved candidates persisting between sessions using local storage.

## Features

- **Candidate Profile Display:** Shows candidate information, including name, username, location, avatar, email, company, and GitHub profile link.
- **Candidate Management:** Users can either save a candidate or skip to the next one.
- **Local Storage:** Saved candidates persist even after the page is reloaded.
- **Potential Candidates List:** Users can view a list of previously saved candidates.
- **User-Friendly Interface:** Clean, intuitive interface with interactive buttons for accepting or rejecting candidates.
- **Filter and Sorting Capabilities:** To better assist users in searching for previously saved candidates.
- **Deployment:** Deployed to Render for live access.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone https://github.com/RubenDguez/candidate-search.git
    ```
2. Navigate to the project directory:
    ```bash
    cd candidate-search
    ```
3. Create a `.env` file in the `root` folder and add your GitHub API token:
    ```
    VITE_GITHUB_TOKEN=your_personal_access_token
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Run the application locally:
    ```bash
    npm run dev
    ```

## Deployment

The application is deployed on Render. You can access the live version at:
[Deployed Application URL](https://candidate-search-q0cq.onrender.com/)

## API Reference

This application uses the [GitHub API for Users](https://docs.github.com/en/rest/users) to retrieve candidate data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Questions

- If you have further questions, you can contact me at: argenis.dominguez@hotmail.com
- This is my GitHub profile: [RubenDguez](https://github.com/RubenDguez)
