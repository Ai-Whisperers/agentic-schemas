# Interactive Agentic Design Patterns Visualization

An interactive web-based visualization of 20 agentic design patterns and their relationships, created for the Agentic Architecture project.

## Features

### 🎨 Interactive Force-Directed Graph
- **D3.js-powered visualization** with physics-based layout
- **Node sizing** based on PageRank importance
- **Color-coded layers** for easy pattern categorization
- **Weighted edges** showing relationship strength between patterns
- **Drag-and-drop** nodes to explore relationships

### 🔍 Advanced Filtering & Search
- **Layer-based filtering**: Filter patterns by architectural layer
  - Reasoning Core
  - Coordination
  - Planning & Control
  - Memory & Learning
  - Oversight & Safety
- **Real-time search**: Search by pattern name, ID, or aliases
- **Visual highlighting**: Selected nodes highlight their connections

### 📊 Detailed Pattern Information
Click any pattern node to view:
- **Description**: What the pattern does
- **Aliases**: Alternative names and related concepts
- **Properties**: Layer, compute requirements, state management, safety surface
- **Graph Metrics**: PageRank, weighted connections, network position
- **Advantages & Challenges**: Pros and cons of implementation
- **Use Cases**: When and where to apply the pattern
- **Connections**: Incoming and outgoing relationships with weights

### 🎮 Interactive Controls
- **Zoom controls**: +, -, and reset buttons
- **Pan & zoom**: Mouse/trackpad gestures
- **Node selection**: Click to explore, click background to deselect
- **Connection highlighting**: Automatic highlighting of related patterns

## Data Source

This visualization is built from comprehensive data extracted from:
- `agentic-arch-graph/agentic_vertices_catalog.json` - Pattern definitions
- `agentic-arch-graph/agentic_regex_matchers.json` - Pattern matching rules
- `agentic-arch-graph/vertex_metrics.csv` - Network analysis metrics
- `agentic-arch-graph/graph_vertices_anchored.mmd` - Relationship graph
- `README.md` - Pattern descriptions and documentation

## Usage

### Local Development
Simply open `index.html` in a modern web browser. No build process or server required!

```bash
# Navigate to the directory
cd visualization/interactive-graph

# Open in browser (example for different systems)
open index.html              # macOS
start index.html             # Windows
xdg-open index.html          # Linux
```

### GitHub Pages Deployment
This visualization is designed to work as a static website on GitHub Pages:

1. Push to your repository
2. Enable GitHub Pages in repository settings
3. Select the branch and folder containing the visualization
4. Access at: `https://<username>.github.io/<repo>/visualization/interactive-graph/`

## Technical Stack

- **D3.js v7** - Data visualization and force simulation
- **Vanilla JavaScript** - No framework dependencies
- **CSS3** - Modern, responsive styling
- **HTML5** - Semantic markup

## Browser Compatibility

Works best in modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## File Structure

```
interactive-graph/
├── index.html      # Main HTML structure and styles
├── data.js         # Pattern data, relationships, and metrics
├── app.js          # Application logic and D3.js visualization
└── README.md       # This file
```

## Key Patterns & Insights

The visualization reveals several important insights:

### Highest PageRank (Most Central)
1. **Evaluation and Monitoring (Q)** - 16.79%
2. **Exception Handling and Recovery (K)** - 12.05%
3. **Human-in-the-Loop (L)** - 8.83%

### Hub Patterns (High Outgoing Connections)
- Planning (F)
- Guardrails and Safety (R)
- Exploration and Discovery (T)

### Authority Patterns (High Incoming Connections)
- Evaluation and Monitoring (Q)
- Exception Handling and Recovery (K)
- Human-in-the-Loop (L)

## Design Philosophy

This visualization emphasizes:
- **Clarity**: Clean, minimal design focused on content
- **Interactivity**: Engage with patterns through exploration
- **Comprehensiveness**: All 20 patterns with full metadata
- **Accessibility**: Works without installation or build process
- **Developer-friendly**: Easy to understand and modify

## Customization

### Changing Colors
Edit the `layerColors` object in `data.js`:

```javascript
const layerColors = {
  "reasoning_core": "#60a5fa",
  "coordination": "#a78bfa",
  // ... customize colors
};
```

### Adjusting Force Simulation
Modify parameters in `app.js`:

```javascript
const simulation = d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links)
        .distance(d => 150 / d.weight))  // Link distance
    .force("charge", d3.forceManyBody().strength(-800))  // Repulsion
    .force("center", d3.forceCenter(width / 2, height / 2));
```

### Adding New Data Fields
1. Update `data.js` with new properties in the `nodes` array
2. Modify `updateDetailsPanel()` in `app.js` to display new fields

## Contributing

To contribute improvements:
1. Ensure data accuracy matches source files
2. Test in multiple browsers
3. Maintain responsive design
4. Keep the visualization performant
5. Update this README with any new features

## License

This visualization is part of the Agentic Architecture project. Please refer to the main repository for licensing information.

## Credits

Based on the comprehensive analysis of agentic design patterns from:
- Source: 400-page book on agentic patterns
- Video: https://www.youtube.com/watch?v=e2zIr_2JMbE
- Documentation: https://docs.google.com/document/d/1rsaK53T3Lg5KoGwvf8ukOUvbELRtH-V0LnOIFDxBryE

Visualization created by the AI Whisperers team.