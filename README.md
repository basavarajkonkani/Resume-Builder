# Resume Builder Application

A modern, responsive Resume Builder web application built with React.js that allows users to create, preview, and export professional resumes.

## Features

- 📝 **Form Section** (Left Side)
  - Inputs for: Full Name, Email, Phone, Address
  - Sections for: Education, Work Experience, Projects, Skills, Certifications, Languages
  - Each section allows adding multiple entries dynamically
  - Input validation (email format, phone number digits)

- 👀 **Resume Preview** (Right Side)
  - Live preview of the resume as the user types
  - Clean, professional design (two-column layout)
  - Modern fonts and spacing for readability
  - Option to switch between Light and Dark themes

- ⚙️ **Additional Features**
  - Download Resume as PDF button
  - Save data to LocalStorage so user data persists after refresh
  - Responsive design (works well on desktop and mobile)
  - Print-friendly styling when exporting as PDF

## Project Structure

```
src/
├── components/
│   ├── FormSection.jsx
│   ├── FormSection.css
│   ├── ResumePreview.jsx
│   └── ResumePreview.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd resume-builder
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Technologies Used

- React.js
- Vite (build tool)
- html2pdf.js (PDF export functionality)
- CSS3 (styling)

## Usage

1. Fill in your personal information in the form on the left side
2. Add details for each section (Education, Experience, etc.) using the "Add" buttons
3. See the live preview of your resume on the right side
4. Switch between Light and Dark themes using the theme toggle button
5. Click "Export as PDF" to download your resume as a PDF file

All data is automatically saved to your browser's LocalStorage, so your information will persist even after refreshing the page.