// Interactive Graph Application
let selectedNode = null;
let activeLayerFilters = new Set();
let searchQuery = "";

// Set up SVG
const container = d3.select("#svg-container");
const width = container.node().clientWidth;
const height = container.node().clientHeight;

const svg = container
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g");

// Set up zoom
const zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
    });

svg.call(zoom);

// Zoom controls
d3.select("#zoom-in").on("click", () => {
    svg.transition().call(zoom.scaleBy, 1.3);
});

d3.select("#zoom-out").on("click", () => {
    svg.transition().call(zoom.scaleBy, 0.7);
});

d3.select("#zoom-reset").on("click", () => {
    svg.transition().call(zoom.transform, d3.zoomIdentity);
});

// Process data
const nodeMap = new Map(nodes.map(n => [n.short_id, n]));

const graphData = {
    nodes: nodes.map(n => ({...n})),
    links: links.map(l => ({
        source: l.source,
        target: l.target,
        weight: l.weight
    }))
};

// Create force simulation
const simulation = d3.forceSimulation(graphData.nodes)
    .force("link", d3.forceLink(graphData.links)
        .id(d => d.short_id)
        .distance(d => 150 / d.weight))
    .force("charge", d3.forceManyBody().strength(-800))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collision", d3.forceCollide().radius(50));

// Create arrow markers
svg.append("defs").selectAll("marker")
    .data(["end"])
    .enter().append("marker")
    .attr("id", "arrowhead")
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 25)
    .attr("refY", 0)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
    .append("path")
    .attr("d", "M0,-5L10,0L0,5")
    .attr("fill", "#2a3142");

// Create links
const link = g.append("g")
    .selectAll("line")
    .data(graphData.links)
    .enter().append("line")
    .attr("class", "link")
    .attr("marker-end", "url(#arrowhead)");

// Create nodes
const node = g.append("g")
    .selectAll("g")
    .data(graphData.nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .on("click", (event, d) => {
        event.stopPropagation();
        selectNode(d);
    });

// Add circles to nodes
node.append("circle")
    .attr("r", d => 15 + (metrics[d.short_id].PageRank * 100))
    .attr("fill", d => layerColors[d.layer]);

// Add labels to nodes
node.append("text")
    .attr("dy", d => 20 + (metrics[d.short_id].PageRank * 100))
    .text(d => d.short_id);

// Add ID labels
node.append("text")
    .attr("class", "node-id")
    .attr("dy", 5)
    .attr("font-size", "9px")
    .attr("font-weight", "600")
    .attr("fill", "#0a0e27")
    .text(d => d.short_id);

// Update positions
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node.attr("transform", d => `translate(${d.x},${d.y})`);
});

// Drag functions
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Select node function
function selectNode(d) {
    selectedNode = d;

    // Update visual selection
    node.classed("selected", n => n.short_id === d.short_id)
        .classed("dimmed", n => {
            if (n.short_id === d.short_id) return false;

            const isConnected = graphData.links.some(l =>
                (l.source.short_id === d.short_id && l.target.short_id === n.short_id) ||
                (l.target.short_id === d.short_id && l.source.short_id === n.short_id)
            );

            return !isConnected;
        });

    // Highlight connected links
    link.classed("highlighted", l =>
            l.source.short_id === d.short_id || l.target.short_id === d.short_id)
        .classed("dimmed", l =>
            l.source.short_id !== d.short_id && l.target.short_id !== d.short_id);

    // Update details panel
    updateDetailsPanel(d);
}

// Deselect on background click
svg.on("click", () => {
    selectedNode = null;
    node.classed("selected", false).classed("dimmed", false);
    link.classed("highlighted", false).classed("dimmed", false);
    showEmptyState();
});

// Update details panel
function updateDetailsPanel(d) {
    const m = metrics[d.short_id];

    let detailsHTML = `
        <div class="detail-card">
            <span class="short-id">${d.short_id}</span>
            <h3>${d.label}</h3>
            <p style="color: #8b93a6; font-size: 13px; margin-top: 8px;">${d.description || ''}</p>

            <div style="margin-top: 16px;">
                <span class="badge layer">${layerNames[d.layer]}</span>
                <span class="badge compute">Compute: ${d.compute}</span>
                <span class="badge state">State: ${d.state}</span>
                <span class="badge safety">Safety: ${d.safety_surface}</span>
            </div>
        </div>

        <div class="detail-card">
            <h3>Graph Metrics</h3>
            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-label">PageRank</div>
                    <div class="metric-value">${(m.PageRank * 100).toFixed(2)}%</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Out Weight</div>
                    <div class="metric-value">${m.WeightedOut.toFixed(2)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">In Weight</div>
                    <div class="metric-value">${m.WeightedIn.toFixed(2)}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Connections</div>
                    <div class="metric-value">${graphData.links.filter(l =>
                        l.source.short_id === d.short_id || l.target.short_id === d.short_id
                    ).length}</div>
                </div>
            </div>
        </div>
    `;

    // Add aliases
    if (d.aliases && d.aliases.length > 0) {
        detailsHTML += `
            <div class="detail-card">
                <h3>Also Known As</h3>
                <div class="detail-section">
                    <ul>
                        ${d.aliases.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Add pros
    if (d.pros && d.pros.length > 0) {
        detailsHTML += `
            <div class="detail-card">
                <h3>Advantages</h3>
                <div class="detail-section">
                    <ul>
                        ${d.pros.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Add cons
    if (d.cons && d.cons.length > 0) {
        detailsHTML += `
            <div class="detail-card">
                <h3>Challenges</h3>
                <div class="detail-section">
                    <ul>
                        ${d.cons.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    // Add additional fields
    const additionalFields = ['when_to_use', 'use', 'use_cases', 'benefits', 'risks', 'notes', 'tradeoffs', 'costs', 'caveats'];
    additionalFields.forEach(field => {
        if (d[field]) {
            const title = field.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
            let content = d[field];
            if (Array.isArray(content)) {
                content = `<ul>${content.map(item => `<li>${item}</li>`).join('')}</ul>`;
            } else {
                content = `<p>${content}</p>`;
            }
            detailsHTML += `
                <div class="detail-card">
                    <h3>${title}</h3>
                    <div class="detail-section">
                        ${content}
                    </div>
                </div>
            `;
        }
    });

    // Add connections
    const outgoing = graphData.links.filter(l => l.source.short_id === d.short_id);
    const incoming = graphData.links.filter(l => l.target.short_id === d.short_id);

    if (outgoing.length > 0 || incoming.length > 0) {
        detailsHTML += `
            <div class="detail-card">
                <h3>Connections</h3>
        `;

        if (outgoing.length > 0) {
            detailsHTML += `
                <div class="detail-section">
                    <h4>Outgoing (${outgoing.length})</h4>
                    <ul>
                        ${outgoing.sort((a, b) => b.weight - a.weight).map(l =>
                            `<li>${l.target.label} <span style="color: #5a6378;">(${l.weight})</span></li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        if (incoming.length > 0) {
            detailsHTML += `
                <div class="detail-section">
                    <h4>Incoming (${incoming.length})</h4>
                    <ul>
                        ${incoming.sort((a, b) => b.weight - a.weight).map(l =>
                            `<li>${l.source.label} <span style="color: #5a6378;">(${l.weight})</span></li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        }

        detailsHTML += `</div>`;
    }

    d3.select("#pattern-details").html(detailsHTML);
}

// Show empty state
function showEmptyState() {
    d3.select("#pattern-details").html(`
        <div class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Select a pattern to view details</p>
        </div>
    `);
}

// Layer filters
const layers = [...new Set(nodes.map(n => n.layer))];
const layerFiltersContainer = d3.select("#layer-filters");

layers.forEach(layer => {
    const btn = layerFiltersContainer.append("button")
        .attr("class", "filter-btn")
        .text(layerNames[layer])
        .on("click", function() {
            if (activeLayerFilters.has(layer)) {
                activeLayerFilters.delete(layer);
                d3.select(this).classed("active", false);
            } else {
                activeLayerFilters.add(layer);
                d3.select(this).classed("active", true);
            }
            applyFilters();
        });
});

// Search
d3.select("#search-input").on("input", function() {
    searchQuery = this.value.toLowerCase();
    applyFilters();
});

// Apply filters
function applyFilters() {
    node.style("display", d => {
        // Layer filter
        if (activeLayerFilters.size > 0 && !activeLayerFilters.has(d.layer)) {
            return "none";
        }

        // Search filter
        if (searchQuery) {
            const matchLabel = d.label.toLowerCase().includes(searchQuery);
            const matchAlias = d.aliases && d.aliases.some(a =>
                a.toLowerCase().includes(searchQuery)
            );
            const matchId = d.id.toLowerCase().includes(searchQuery);
            const matchShortId = d.short_id.toLowerCase().includes(searchQuery);

            if (!matchLabel && !matchAlias && !matchId && !matchShortId) {
                return "none";
            }
        }

        return null;
    });

    // Update links visibility
    link.style("display", l => {
        const sourceVisible = node.filter(n => n.short_id === l.source.short_id)
            .style("display") !== "none";
        const targetVisible = node.filter(n => n.short_id === l.target.short_id)
            .style("display") !== "none";

        return (sourceVisible && targetVisible) ? null : "none";
    });
}

// Legend
const legendContent = d3.select("#legend-content");
Object.entries(layerNames).forEach(([key, name]) => {
    const item = legendContent.append("div")
        .attr("class", "legend-item");

    item.append("div")
        .attr("class", "legend-color")
        .style("background-color", layerColors[key]);

    item.append("span")
        .text(name);
});

// Initial state
showEmptyState();