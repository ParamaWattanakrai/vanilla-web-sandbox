const etymologyData = {
    "name": "Computer",
    "children": [
      {
        "name": "Latin",
        "color": "#ff9999",
        "children": [
          {
            "name": "Computare",
            "children": [
              { "name": "Com-" },
              { "name": "-putare" }
            ]
          }
        ]
      },
      {
        "name": "Old French",
        "color": "#99ff99",
        "children": [
          { "name": "Compter" }
        ]
      },
      {
        "name": "Middle English",
        "color": "#9999ff",
        "children": [
          { "name": "Counten" }
        ]
      },
      {
        "name": "Modern English",
        "color": "#ffff99",
        "children": [
          { "name": "Computer" }
        ]
      }
    ]
  };

  const width = 960;
  const height = 600;

  const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

  const g = svg.append("g");

  const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  svg.call(zoom);

  const root = d3.hierarchy(etymologyData);
  const treeLayout = d3.tree().size([width, height]);
  treeLayout(root);

  const link = g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
      .x(d => d.y)
      .y(d => d.x));

  const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`);

  node.append("circle")
    .attr("r", 12)
    .attr("fill", d => d.data.color || "#555")
    .attr("stroke", "#ddd")
    .attr("stroke-width", "2px");

  node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -6 : 6)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name);

  function zoomed(event) {
    g.attr("transform", event.transform);
  }