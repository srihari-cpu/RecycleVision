# RecycleVision 🌱

A modern web application that helps classify different types of recyclable materials using machine learning technology. This project aims to promote environmental sustainability by making recycling easier and more accurate.

## Features

- **Real-time Classification**: Upload images of recyclable items and get instant classification results
- **Multiple Material Categories**: Supports classification of:
  - Cardboard
  - Glass
  - Metal
  - Paper
  - Plastic
  - Non-recyclable trash
- **User-friendly Interface**: Clean and intuitive design built with React and Tailwind CSS
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Motion Graphics**: Framer Motion
- **State Management**: React Context

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/srihari-cpu/RecycleVision.git
cd RecycleVision
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:8080`

## Project Structure

```
RecycleVision/
├── src/
│   ├── components/     # Reusable UI    components
│   ├── contexts/       # React context providers
│   ├── hooks/         # Custom React hooks
│   ├── integrations/  # External service integrations
│   ├── lib/           # Utility functions
│   └── pages/         # Application pages
├── public/            # Static assets
└── supabase/         # Database migrations and configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Acknowledgments

- Thanks to all contributors who have helped shape RecycleVision
- Special thanks to the open-source community for the amazing tools and libraries
- Inspired by the global movement towards sustainable waste management
