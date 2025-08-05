# Balaka Cargo List Generator

A web application for generating cargo lists with customizable features.

## Features

- **Cargo List Management**
  - Add, edit, and delete cargo items
  - Support for Bengali and English text
  - Pre-defined item list with common cargo items
  - Custom serial numbers and descriptions
  - Quantity and remarks tracking

- **Customization**
  - Fully editable company details
  - Customizable header with company name, address, and contact info
  - Watermark logo with custom text
  - Theme customization (fonts, colors, and styles)
  - Multiple font options including Bengali and English fonts

- **Document Features**
  - Print preview functionality
  - PDF export capability
  - Image export (PNG)
  - Responsive design for both desktop and mobile
  - Print-friendly layout

- **AI Integration**
  - AI-powered image analysis for cargo list import
  - Gemini API integration for smart features
  - Automatic data extraction from images

- **User Interface**
  - Modern and intuitive interface
  - Real-time editing
  - Modal-based customization
  - Print preview modal
  - Responsive table layout

## Prerequisites

- Node.js
- npm or yarn
- Gemini API Key (for AI features)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/laravelgpt/cargolist.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`
