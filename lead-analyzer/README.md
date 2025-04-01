# Lead Data Analyzer (TRY-AGABN Project)

A comprehensive tool for ingesting, analyzing, and deriving insights from lead data, with a script generation feature for Heygen AI video creation.

## Features

- **Data Ingestion**: Upload CSV or JSON lead data, or generate mock data for testing
- **Data Analysis**: Statistical analysis of lead quality, conversion rates, and engagement metrics
- **Visual Insights**: Rich visualizations showing lead sources, conversion timelines, and engagement patterns
- **Lead Scoring System**: Automated scoring mechanism based on engagement, content interaction, and conversion probability
- **Optimal Outreach Timing**: Recommendations for the best times to contact leads based on activity patterns
- **Outreach Templates**: Customizable email and LinkedIn templates tailored to lead interests
- **Podcast Script Generation**: Create conversational scripts between multiple hosts for Heygen AI video podcasts
- **Heygen Integration**: Direct integration with Heygen AI video and podcast creation tools
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Dark Mode Support**: Full dark mode with optimized UI elements including logo visibility

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

## New Features in Latest Update

### Lead Scoring System

The Lead Scoring system provides a comprehensive evaluation of each lead based on multiple factors:

- **Engagement Metrics**: Scores leads based on interaction history and responsiveness
- **Content Interaction**: Evaluates how leads engage with both your content and external content
- **Conversion Probability**: Factors in the likelihood of conversion based on lead characteristics
- **Visual Indicators**: Star ratings and color-coded scores make high-value leads immediately identifiable
- **Score Distribution**: Visual breakdown of scores across your lead database

### Optimal Outreach Timing

This feature helps you determine when to contact leads for maximum response rates:

- **Weekly Calendar View**: Visual representation of the best times to contact each lead
- **Lead-Specific Recommendations**: Customized timing suggestions based on individual lead activity patterns
- **Confidence Ratings**: Each timing recommendation includes a confidence score
- **Industry Best Practices**: Incorporates industry data to enhance timing recommendations

### Outreach Templates

Streamlines your lead communication with ready-to-use templates:

- **Email Templates**: Professionally crafted email templates personalized for each lead
- **LinkedIn Messages**: Complementary LinkedIn outreach templates
- **Dynamic Personalization**: Templates automatically include lead-specific details such as name, interests, and optimal contact times
- **Best Practices**: Guidelines for effective outreach based on lead data insights

### Podcast Script Generation

Enhanced to create natural, conversational content between multiple speakers:

- **Multiple Format Options**: Choose between interview, discussion, or debate podcast formats
- **Host Configuration**: Select 2-3 hosts/speakers for your podcast
- **Topic Customization**: Generate scripts focused on specific topics relevant to your leads
- **Duration Settings**: Adjust podcast length to fit your content needs
- **Speaker Labels**: Clear speaker identification for easy implementation in Heygen

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

## UI Customization

### Dark Mode

The application supports both light and dark modes, which can be toggled using the button in the bottom-left corner of the navigation menu. When in dark mode:

- The interface switches to a darker color palette
- The logo automatically changes to a light version via CSS filters
- Charts and visualizations adapt for better visibility
- All UI elements maintain accessibility standards in both modes

## Heygen Integration

[Heygen](https://www.heygen.com/) is an AI-powered video generation platform. The Lead Analyzer integrates with Heygen to help you create personalized outreach videos and podcasts based on your lead data.

### Using the Heygen Integration Tab

1. Navigate to the "Heygen Integration" tab in the application
2. Choose from multiple podcast formats:
   - **Interview Style**: One host interviews an expert about lead insights
   - **Discussion Format**: Multiple hosts discuss lead generation strategies and data findings
   - **Debate Format**: Contrasting perspectives on lead generation approaches
3. Customize your content settings:
   - Podcast topic
   - Duration
   - Number of hosts
4. Copy the generated script using the Copy button
5. Use the direct links to Heygen's tools:
   - [Heygen Video Podcast](https://labs.heygen.com/video-podcast) for multi-speaker podcasts
   - [Heygen Studio](https://www.heygen.com/studio) for traditional video creation

### Creating Podcasts in Heygen

To use the generated scripts with Heygen:

1. Generate a podcast script using one of the available formats
2. Copy the script using the copy button
3. Visit [Heygen Video Podcast](https://labs.heygen.com/video-podcast)
4. Paste the script into Heygen's editor
5. Select avatars for each speaker (HOST1, HOST2, etc.)
6. Customize voice settings for each speaker
7. Generate and download your AI podcast

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Recharts for the amazing chart library
- Tailwind CSS for the utility-first CSS framework
- Vite.js for the blazing fast build tool
- Netlify for reliable hosting
- Heygen for the AI video and podcast generation platform
