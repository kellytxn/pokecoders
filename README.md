# pokecoders

An ethical shopping and rewards platform that rates fashion products based on sustainability and motivates conscious consumerism through personalised insights and real-time shopping integration.

---

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)
- [Configuration (Important!)](#configuration-important)
- [Usage](#usage)  
- [Project Structure](#project-structure)  

---

## About

PokeCoders is a mobile app that helps users make ethical fashion choices by rating products based on sustainability metrics. Users earn reward points for purchases, especially for highly rated products, and can redeem these points to promote ongoing engagement.

---

## Features

- Onboarding questionnaire for personalised preferences  
- Sustainability scoring algorithm considering fabric, ethical causes, and deal breakers
- Shopping feed with product ratings and recommendations
- Personalised shopping experience based on consumer preferences
- Receipt scanning for offline purchase points  
- Points tracking and reward redemption system  
- Interactive dashboards and notifications  

---

## Tech Stack

- **Frontend:** React Native, Expo Router  
- **Backend:** Node.js, Express  
- **Database:** MongoDB
- **Other:** Barcode scanning, push notifications  

---

## Getting Started

### Prerequisites

- Node.js >= 16  
- npm or yarn  
- Expo CLI (`npm install -g expo-cli`)  
- MongoDB instance (local)  

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kellytxn/pokecoders.git
   cd pokecoders

2. Install dependencies:

   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install

3. Create .env files in frontend and backend folders with your configuration (e.g., MongoDB URI.

4. Start the backend server:

   ```bash
   cd backend
   node server.js

5. Start the frontend app:

   ```bash
   cd pokecoders
   npx expo start
## Configuration (Important!)

To connect your local frontend with your local backend server, you must manually update the IP address in the following files:

### Files to update:
- `app/config.js`

### What to change:

```js
export const BACKEND_URL = "http://192.168.18.13:3001";
```

Change the IP (`192.168.18.13`) to your own **local IP address** (on the same WiFi network). You can find it with:

```bash
ifconfig      # macOS/Linux  
ipconfig      # Windows
```

**For example:**

```js
export const BACKEND_URL = "http://192.168.10.141:3001";
```


## Usage

Run the app on a device or emulator via Expo Go.

Complete onboarding questionnaire to personalise preferences.

Browse shopping feed with sustainability scores.

Scan receipts to claim points for offline purchases.

Redeem points for rewards to encourage ethical shopping habits.

## Project Structure

   ```bash
   pokecoders/
   ├── backend/                # API server (Node.js + Express)
   ├── app/                    # React Native app source code
   ├── README.md               # Project overview and instructions


