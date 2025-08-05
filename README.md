# Balaka Cargo List Generator

A modern web application for generating and managing cargo lists with AI integration and customizable document generation.

## Features

- ✨ **AI-Powered Document Generation**
  - Integration with Google's Generative AI
  - Smart cargo list generation
  - Context-aware document creation

- 📝 **Document Management**
  - Table-based cargo list management
  - Customizable table rows and columns
  - Real-time data editing
  - Persistent state using localStorage

- 🎨 **Customization Options**
  - Customizable watermarks
  - Header logo management
  - Theme customization
  - Document layout adjustments

- 📄 **Document Export**
  - PDF export with embedded fonts
  - PNG image export
  - Print preview functionality
  - Multiple export formats

- 🛠️ **Developer Tools**
  - TypeScript support
  - Modern React 19
  - Vite build system
  - Component-based architecture

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation
1. Clone the repository
```bash
git clone https://github.com/laravelgpt/cargolist.git
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

5. Preview production build
```bash
npm run preview
# or
yarn preview
```

## Project Structure

```
balaka-cargo-list-generator/
├── components/          # React components
│   ├── DocumentView.tsx
│   ├── PrintPreviewModal.tsx
│   ├── CustomizeModal.tsx
│   ├── EditableCell.tsx
│   ├── HeaderLogo.tsx
│   └── Watermark.tsx
├── constants.ts         # Application constants
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
└── index.html          # HTML entry point
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
VITE_GOOGLE_GENAI_API_KEY=your_api_key_here
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
