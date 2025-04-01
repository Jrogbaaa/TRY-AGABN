# Lead Data Analyzer (TRY-AGABN Project)

A comprehensive tool for ingesting, analyzing, and deriving insights from lead data, with a script generation feature for Heygen AI video creation.

## Features

- **Data Ingestion**: Upload CSV or JSON lead data, or generate mock data for testing
- **Data Analysis**: Statistical analysis of lead quality, conversion rates, and engagement metrics
- **Visual Insights**: Rich visualizations showing lead sources, conversion timelines, and engagement patterns
- **Script Generation**: Create personalized scripts for Heygen based on lead analysis
- **Heygen Integration**: Direct integration with Heygen AI video platform for content creation
- **Responsive Design**: Works seamlessly on both desktop and mobile devices

## Technology Stack

- React.js with TypeScript for the frontend
- React Context API for state management
- Tailwind CSS for responsive design
- Recharts for data visualization
- Vite.js for build system
- Netlify for deployment

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

This application is configured for Netlify deployment:

1. Push your changes to GitHub
2. Connect your GitHub repository to Netlify
3. Configure the build settings:
   - Base directory: `lead-analyzer`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Click "Deploy site"

The site will automatically redeploy when changes are pushed to the main branch.

## Heygen Integration

[Heygen](https://www.heygen.com/) is an AI-powered video generation platform. The Lead Analyzer integrates with Heygen to help you create personalized outreach videos based on your lead data.

### API Configuration

The application comes with an API key pre-configured for connecting to the Heygen platform:
```
HEYGEN_API_KEY=MTAwYzgyZGNlMmE5NGZjNjk2MTIzZmRiMzhmYWUxODItMTczMzE0MDU4Nw==
```

### Using the Heygen Integration Tab

1. Navigate to the "Heygen Integration" tab in the application
2. Choose between two content formats:
   - **AI-Recommended Script**: Generate a professional, data-driven script personalized for a specific lead or for general lead insights
   - **Podcast Format**: Create a conversational podcast script discussing lead generation strategies with insights from your data
3. Customize your content settings:
   - For AI scripts: Select a lead name for personalization (optional)
   - For Podcast format: Specify topic and duration
4. Copy the generated content using the Copy button
5. Paste the script into Heygen's script editor to create your video

### Script & Podcast Features

- **AI Scripts**: Professional, data-driven scripts that highlight key insights from your lead data
- **Podcast Format**: Creates a host/guest conversation with segments based on your lead analysis
- **Personalization**: Option to customize content for specific leads
- **Production Notes**: Helpful formatting for Heygen video creation

### Creating Videos in Heygen

To use the generated scripts with Heygen:

1. Generate a script using one of the available formats
2. Copy the script using the copy button
3. Visit [Heygen Studio](https://www.heygen.com/studio) and create a new project
4. Paste the script into Heygen's script editor
5. Select an avatar and customize voice settings
6. Generate and download your video

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recharts for the amazing chart library
- Tailwind CSS for the utility-first CSS framework
- Vite.js for the blazing fast build tool
- Netlify for reliable hosting
- Heygen for the AI video generation platform
