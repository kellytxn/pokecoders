# pokecoders

An ethical shopping and rewards platform that rates fashion products based on sustainability and motivates conscious consumerism through personalized insights and real-time shopping integration.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Project Structure](#project-structure)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

---

## About

pokecoders is a mobile app that helps users make ethical fashion choices by rating products based on sustainability metrics. Users earn reward points for purchases, especially for highly rated products, and can redeem these points to promote ongoing engagement.

---

## Features

- User authentication and onboarding questionnaire for personalized preferences  
- Sustainability scoring algorithm considering fabric, ethical causes, and deal breakers  
- Shopping feed with product ratings and recommendations  
- Receipt scanning for offline purchase points  
- Points tracking and reward redemption system  
- Interactive dashboards and notifications  

---

## Tech Stack

- **Frontend:** React Native, Expo Router  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** Firebase Authentication  
- **Other:** Barcode scanning, push notifications  

---

## Getting Started

### Prerequisites

- Node.js >= 16  
- npm or yarn  
- Expo CLI (`npm install -g expo-cli`)  
- MongoDB instance (local or cloud)  
- Firebase project for Authentication  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kellytxn/pokecoders.git
   cd pokecoders

2. Install dependencies:

cd frontend
npm install
cd ../backend
npm install

3. Create .env files in frontend and backend folders with your configuration (e.g., MongoDB URI, Firebase keys).

4. Start the backend server:

cd backend
npm start

5. Start the frontend app:

cd ../frontend
expo start

## Project Structure

pokecoders/
├── backend/                # API server (Node.js + Express)
├── frontend/               # React Native app source code
├── datasets/               # Datasets (if any)
├── mockups/                # Design mockups and wireframes
├── README.md               # Project overview and instructions
└── LICENSE                 # License file

## Usage

Run the app on a device or emulator via Expo.

Complete onboarding questionnaire to personalize preferences.

Browse shopping feed with sustainability scores.

Scan receipts to claim points for offline purchases.

Redeem points for rewards to encourage ethical shopping habits.

