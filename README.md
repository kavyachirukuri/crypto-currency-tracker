🚀 Crypto Tracker
🌐 Live Demo
🔗 https://cryptocurrencytracker-kc.netlify.app/

📌 Description
Crypto Tracker is a web application that allows users to track real-time cryptocurrency prices, view detailed coin information, and manage a list of favorite coins.

🛠 Tech Stack
Frontend: React.js, TypeScript, Next.js
Styling: CSS
State Management: React Context API
Data Fetching: Binance API
📂 Project Structure
graphql
Copy
Edit
📦 CRYPTO-TRACKER  
├── 📂 .vscode               # VS Code settings  
├── 📂 build                 # Build files  
├── 📂 node_modules          # Dependencies  
├── 📂 public                # Static assets  
├── 📂 src                   # Source code  
│   ├── 📂 api               # API handlers  
│   │   ├── binance.ts       # Fetch cryptocurrency data from Binance API  
│   ├── 📂 components        # UI components  
│   │   ├── CoinDetail.tsx   # Displays detailed coin information  
│   │   ├── CoinsList.tsx    # Renders the list of cryptocurrencies  
│   │   ├── Crypto.tsx       # Main component for crypto tracking  
│   │   ├── SearchBar.tsx    # Search functionality for crypto coins  
│   ├── 📂 context           # Global state management  
│   │   ├── FavoritesContext.tsx  # Manages favorite coins  
│   ├── 📂 types             # TypeScript type definitions  
│   │   ├── cryptoTypes.ts   # Defines types for crypto data  
│   ├── App.tsx              # Root component  
│   ├── index.tsx            # Application entry point  
│   ├── App.css, index.css   # Styles  
│   ├── logo.svg             # Logo  
│   ├── setupTests.ts        # Testing setup  
├── package.json             # Project dependencies  
├── README.md                # Project documentation  
📌 Features
✅ View real-time cryptocurrency prices
✅ Search for cryptocurrencies
✅ Add/remove coins from the favorites list
✅ Get detailed information about each coin
✅ Responsive design for all devices

🏗 Installation & Setup
🔧 Prerequisites
Ensure you have Node.js and npm installed.

📥 Clone Repository
bash
Copy
Edit
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
📦 Install Dependencies
bash
Copy
Edit
npm install
🚀 Run the Application
bash
Copy
Edit
npm start
The app runs at http://localhost:3000

⚡ Deployment
The app is deployed on Netlify at:
🔗 https://cryptocurrencytracker-kc.netlify.app/

📜 License
This project is open-source and free to use.

