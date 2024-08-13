document.addEventListener('DOMContentLoaded', function() {
    // Static data for the charts
    const findingsData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [
            {
                label: 'Findings',
                data: [65, 59, 80, 81, 56],
                borderColor: 'rgba(102, 252, 241, 1)', /* Light cyan */
                backgroundColor: 'rgba(102, 252, 241, 0.2)', /* Light cyan */
                fill: true
            },
            {
                label: 'Resolved',
                data: [28, 48, 40, 19, 86],
                borderColor: 'rgba(69, 162, 158, 1)', /* Light teal */
                backgroundColor: 'rgba(69, 162, 158, 0.2)', /* Light teal */
                fill: true
            }
        ]
    };

    const metricsData = {
        labels: ['Technical Architecture', 'Technical Operations', 'Technical Support', 'Network Infrastructure', 'User Experience'],
        datasets: [{
            data: [10, 287, 112, 122, 88],
            backgroundColor: ['#66fcf1', '#45a29e', '#c3073f', '#4b4e6d', '#9b59b6']
        }]
    };

    // Line Chart for Findings vs Resolved
    const findingsCtx = document.getElementById('findingsChart').getContext('2d');
    new Chart(findingsCtx, {
        type: 'line',
        data: findingsData,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Doughnut Chart for Organization Metrics
    const orgMetricsCtx = document.getElementById('organizationMetricsChart').getContext('2d');
    new Chart(orgMetricsCtx, {
        type: 'doughnut',
        data: metricsData,
        options: {
            responsive: true,
            maintainAspectRatio: true, // Ensure the chart remains circular
            cutout: '70%', // Adjust the doughnut chart inner radius
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Static data for Sankey chart
    const sankeyData = {
        nodes: [
            { name: "DevOps" },
            { name: "Internal Apps" },
            { name: "Ecommerce" },
            { name: "SecOps" },
            { name: "Training" },
            { name: "Marketing" },
            { name: "Website Compliance" },
            { name: "Training 2" },
            { name: "Ecom" },
            { name: "Sales" },
            { name: "Internal" },
            { name: "Customer Support" },
            { name: "eng" },
            { name: "prod" },
            { name: "general" },
            { name: "backend" }
        ],
        links: [
            { source: 0, target: 1, value: 10 },
            { source: 0, target: 2, value: 10 },
            { source: 1, target: 3, value: 10 },
            { source: 2, target: 3, value: 10 },
            { source: 3, target: 4, value: 10 },
            { source: 3, target: 5, value: 10 },
            { source: 4, target: 6, value: 10 },
            { source: 5, target: 7, value: 10 },
            { source: 6, target: 8, value: 10 },
            { source: 7, target: 9, value: 10 },
            { source: 8, target: 10, value: 10 },
            { source: 9, target: 11, value: 10 },
            { source: 10, target: 12, value: 10 },
            { source: 11, target: 13, value: 10 },
            { source: 12, target: 14, value: 10 },
            { source: 13, target: 15, value: 10 }
        ]
    };

    const sankeyWidth = document.querySelector('.sankey-chart').clientWidth;
    const sankeyHeight = 300; // Adjust height to fit within viewport

    const svg = d3.select("#sankeyChart")
        .attr("width", sankeyWidth)
        .attr("height", sankeyHeight);

    const sankey = d3.sankey()
        .nodeWidth(15)
        .nodePadding(10)
        .extent([[1, 1], [sankeyWidth - 1, sankeyHeight - 1]]);

    const {nodes, links} = sankey({
        nodes: sankeyData.nodes.map(d => Object.assign({}, d)),
        links: sankeyData.links.map(d => Object.assign({}, d))
    });

    svg.append("g")
        .selectAll("rect")
        .data(nodes)
        .join("rect")
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("height", d => d.y1 - d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("fill", "blue");

    svg.append("g")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.5)
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", "blue")
        .attr("stroke-width", d => Math.max(1, d.width));

    svg.append("g")
        .style("font", "10px sans-serif")
        .selectAll("text")
        .data(nodes)
        .join("text")
        .attr("x", d => d.x0 < sankeyWidth / 2 ? d.x1 + 6 : d.x0 - 6)
        .attr("y", d => (d.y1 + d.y0) / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", d => d.x0 < sankeyWidth / 2 ? "start" : "end")
        .text(d => d.name);
});
