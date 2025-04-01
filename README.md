# Lead Data Analyzer (TRY-AGABN Project)

A comprehensive tool for ingesting, analyzing, and deriving insights from lead data, with a script generation feature for Heygen AI video creation.

## Features

- **Data Ingestion**: Upload CSV or JSON lead data, or generate mock data for testing
- **Data Analysis**: Statistical analysis of lead quality, conversion rates, and engagement metrics
- **Visual Insights**: Rich visualizations showing lead sources, conversion timelines, and engagement patterns
- **Script Generation**: Create personalized scripts for Heygen based on lead analysis
- **Heygen Integration**: Easy-to-follow integration with Heygen AI video platform
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technology Stack

- React.js with TypeScript for the frontend
- React Context API for state management
- Tailwind CSS for responsive design
- Recharts for data visualization
- Vite.js for build system
- GitHub Pages for deployment

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/Jrogbaaa/TRY-AGABN.git
   cd lead-analyzer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and go to `http://localhost:5173`

## Data Format

### CSV Format
The application accepts CSV files with the following headers:
```
id,name,email,source,initialContact,status,tags,conversionProbability,estimatedValue,interactionHistory
```

### JSON Format
The application accepts JSON files with the following structure:
```json
[
  {
    "id": "lead-001",
    "name": "John Smith",
    "email": "john@example.com",
    "source": "LinkedIn",
    "initialContact": "2023-12-15T14:25:00Z",
    "status": "Qualified",
    "interactionHistory": [
      {
        "date": "2023-12-15T14:30:00Z",
        "type": "Email",
        "response": "Positive"
      }
    ],
    "tags": ["enterprise", "high-value"],
    "conversionProbability": 0.75,
    "estimatedValue": 15000
  }
]
```

## Deployment

The application is configured for GitHub Pages deployment. Simply push to the main branch, and the GitHub Actions workflow will handle the deployment automatically.

You can customize the deployment settings in `.github/workflows/deploy.yml` and `vite.config.ts`.

## Heygen Integration

[Heygen](https://www.heygen.com/) is an AI-powered video generation platform. The Lead Analyzer can generate scripts that you can use with Heygen to create personalized outreach videos based on your lead data.

To use the generated scripts with Heygen:

1. Generate a script using one of the available templates
2. Copy the script using the copy button
3. Paste the script into Heygen's script editor
4. Select an avatar and customize voice settings
5. Generate and download your video

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recharts for the amazing chart library
- Tailwind CSS for the utility-first CSS framework
- Vite.js for the blazing fast build tool
- GitHub Pages for free hosting
