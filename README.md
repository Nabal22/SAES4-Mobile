# Mobile Polling Application - IUT Project

This project was carried out as part of a SAé during the fourth semester of the Professional Bachelor's Degree in Technology (BUT). The mobile polling application allows users to participate in polls and submit their responses.

## API Configuration

The application utilizes an API to retrieve poll data. Before launching the application, ensure to start the API locally by following the appropriate steps. You must also configure the API URL within the application. Here's how to proceed:

1.Open the config/api.js file in the application.
2.Find the api_link variable.
3.Replace the value of api_link with the URL of your local network and ensure your phone is connected to it as well.

## Features

- Display of available polls from the API.
- Display of questions and response options for each poll.
- Submission of user responses to polls.
- User management and authentication to access polls.
- Responsive and user-friendly interface.

## Installation

1.Clone this repository: git clone https://github.com/Nabal22/SAES4-Mobile.git.
2.Navigate to the project directory: cd SAES4-Mobile.
3.Install dependencies: npm install.
4.After installing Expo on your device, launch the application: npx expo start.

Ensure that you have started the API locally before launching the application.
