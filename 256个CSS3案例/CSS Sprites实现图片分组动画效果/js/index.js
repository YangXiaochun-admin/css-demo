'use strict';

function parseData(d) {
  var keys = _.keys(d[0]);
  return _.map(d, function(d) {
    var o = {};
    _.each(keys, function(k) {
      if( k == 'Pais' || k == 'Codigo') // Prevent Strings Being Parsed
        o[k] = d[k];
      else
        o[k] = parseFloat(d[k]);
    });
    return o;
  });
}

// Find min and maxes
function getBounds(d, paddingFactor) {
  paddingFactor = typeof paddingFactor !== 'undefined' ? paddingFactor : 1;
  var keys = _.keys(d[0]), b = {};
  _.each(keys, function(k) {
    b[k] = {};
    _.each(d, function(d) {
      if(isNaN(d[k]))
        return;
      if(b[k].min === undefined || d[k] < b[k].min)
        b[k].min = d[k];
      if(b[k].max === undefined || d[k] > b[k].max)
        b[k].max = d[k];
    });
    b[k].max > 0 ? b[k].max *= paddingFactor : b[k].max /= paddingFactor;
    b[k].min > 0 ? b[k].min /= paddingFactor : b[k].min *= paddingFactor;
  });
  return b;
}

// Force-Directed Scatterplot
// Source: http://bl.ocks.org/rpgove/10603627
var data = d3.csv.parse( d3.select("pre#data").text() );

// Resolve collisions between nodes.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(data);
  return function (d) {
    var r = d.radius + radius + 5,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function (quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var qx = d.x - quad.point.x,
            qy = d.y - quad.point.y,
            l = Math.sqrt(qx * qx + qy * qy),
            qr = d.radius + quad.point.radius + (d.color !== quad.point.color);
        if (l < qr) {
          l = (l - qr) / l * alpha;
          qx = qx * l;
          qy = qy * l;
          d.x = d.x - qx;
          d.y = d.y - qy;
          quad.point.x += qx;
          quad.point.y += qy;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}

function moveTowardDataPosition(alpha) {
  return function (d) {
    d.x += (xScale(d[xVar]) - d.x) * 0.1 * alpha;
    d.y += (y(d[yVar]) - d.y) * 0.1 * alpha;
  };
}

function tick(e) {
  node.each(moveTowardDataPosition(e.alpha));
  node.each(collide(e.alpha, false));
  node
  .attr("cx", function (d) { return d.x; })
  .attr("cy", function (d) { return d.y; });
  flags
  .attr('style', function (d) {
    var styleString;
    styleString = 'top:';
    styleString += d.y + 80;
    styleString += 'px; left: ';
    styleString += d.x + 26;
    styleString += 'px;';
    return styleString;
  });
}



data = parseData(data);// Parse numbers to Float
var xVar = "Participações",
    yVar = "Melhor Posição",
    xVarOptions = ["Sede", "Participações", "PIB", "População", "IDH"],
    descriptions = { "População" : "População", "Host" : "Quantas vezes sediou uma copa do mundo", "PIB" : "PIB", "Participações" : "Número de participações em copas", "IDH": "IDH" },
    xScale,
    bounds = getBounds(data, 1),
    formatValue = d3.format(".2s"),
    thisTickFormat = function (d) {
      return formatValue(d).replace('G', 'B');
    },
    margin = {top: 20, right: 20, bottom: 20, left: 20},
    padding = {top: 20, right: 20, bottom: 20, left: 20},
    outerWidth = 960,
    outerHeight = 400,
    innerWidth = outerWidth - margin.left - margin.right,
    innerHeight = outerHeight - margin.top - margin.bottom,
    width = innerWidth - padding.left - padding.right,
    height = innerHeight - padding.top - padding.bottom,
    radius = 10,
    //x axis scale
    x = d3.scale.log().base(2).range([0, width]),
    // y axis scale
    y = d3.scale.log().base(2).range([0, height]),
    // Declare Axis
    xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(thisTickFormat),
    yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickFormat(d3.format("d")),
    force,
    node,
    flags,
    container,
    circles,
    svg,
    dl, 
    span;

// THE CREATION

// Create the Container
container = d3.select(".g-container");

// Create the Menu
container.append("div")
  .attr("class", "g-menu btn-group")
  .attr("data-toggle", "buttons-radio")
  .attr("id", "x-axis-menu");

// Create the SVG
svg = container
  .append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);

svg.append("g").attr("class", "g-circles")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

circles = svg.select("g").append("g");

// Create the nodes
node = circles.selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("class", "dot")
  .attr("r", radius)
  .attr("cx", function (d) { return x(d[xVar]); })
  .attr("cy", function (d) { return y(d[yVar]); })
  .style("fill", function (d) { return 'transparent'; });

// Create the definition list
dl = container
  .append("div")
  .attr("class", "g-dados")
  .append("dl")
  .attr("class", "f32");

span = dl.append("span");

// Create THE FORCE
force = d3.layout.force()
  .nodes(data)
  .size([innerWidth, innerHeight])
  .on("tick", tick)
  .charge(20)
  .gravity(0)
  .chargeDistance(20);

// Create the Visualization
span.append("dt").text("Brasil");
span.append("dd").attr("class", "flag br");
dl.append("dt").text("Melhor Posição");
dl.append("dd").attr("class", "first-dado").text("1º Lugar");
dl.append("dt").text("Sede");
dl.append("dd").text("1 vez");
dl.append("dt").text("Participações");
dl.append("dd").text("19");
dl.append("dt").text("PIB (US$)");
dl.append("dd").text("2.2B");
dl.append("dt").text("População");
dl.append("dd").text("200M");
dl.append("dt").text("IDH");
dl.append("dd").text("0.730");

// Create the Flags
flags = container.append('div')
  .attr("class", "g-flags")
  .append("ul")
  .attr('class',  'f32')
  .selectAll("li")
  .data(force.nodes())
  .enter().append('li')
  .attr('class',  function (d) {
    return 'flag ' + d.Codigo;
  }).on("mouseover", function (d) {
    d3.select('.g-dados span dt')
    .html(d.Pais);
    d3.select('.g-dados span dd')
    .attr('class', 'flag ' + d.Codigo);
    d3.select(".first-dado")
    .html(d["Melhor Posição"] + "º Lugar");
    d3.select(".g-dados dd:nth-of-type(2)")
    .html(d.Sede === 1 ? d.Sede + " vez" : (d.Sede < 2 ? "Nunca" : d.Sede + " vezes"));
    d3.select(".g-dados dd:nth-of-type(3)")
    .html(d["Participações"]);
    formatValue = d3.format(".2s");
    var thisFormatValue = function (d) {
      return formatValue(d).replace('G', 'B');
    };
    d3.select(".g-dados dd:nth-of-type(4)")
    .html(thisFormatValue(d.PIB));
    d3.select(".g-dados dd:nth-of-type(5)")
    .html(thisFormatValue(d["População"]));
    formatValue = d3.format(".3f");
    d3.select(".g-dados dd:nth-of-type(6)")
    .html(formatValue(d.IDH));
  });

// Set scale domain
x.domain(d3.extent(data, function (d) { return d[xVar]; })).nice();
y.domain(d3.extent(data, function (d) { return d[yVar]; })).nice();

// Set initial positions
data.forEach(function (d) {
  d.x = x(d[xVar]);
  d.y = y(d[yVar]);
  d.radius = radius;
});

// Create the x Axis Menu
d3.select('#x-axis-menu')
  .selectAll('a')
  .data(xVarOptions)
  .enter()
  .append('a')
  .text(function (d) {return d; })
  .attr("class", "btn")
  .classed('active', function (d) {
    return d === xVar;
  })
  .on('click', function (d) {
    force.stop();
    xVar = d;
    updateChart();
    updateMenus();
  });

// Render axes
svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(40," + (height + 28) +  ")")
  .call(xAxis);

svg.append("g")
  .attr("class", "y axis")
  .attr('transform', 'translate(40, 20)')
  .call(yAxis)
  .append("text");


function makeXAxis(s) {
  s.call(d3.svg.axis()
  .scale(xScale)
  .orient("bottom")
  .tickSize(-height - 7, 0, 0)
  .tickFormat(thisTickFormat));
}

function makeYAxis(s) {
  s.call(d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickSize(-width, 0, 0)
  .tickFormat(function (d) { return d + "º"; }));
}

function updateScales() {
  switch (xVar) {
    case "População":  //Country population
      formatValue = d3.format(".2s");
      thisTickFormat = function (d) {
        return formatValue(d).replace('G', 'B');
      };
      xScale = d3.scale.log().base(2)
      .range([0, width])
      .domain(d3.extent(data, function (d) { return d[xVar]; })).nice();
      break;
    case "Sede":  //How many times this country hosted a world cup
      formatValue = d3.format("d");
      xScale = d3.scale.linear()
      .range([0, width])
      .domain([bounds[xVar].min, bounds[xVar].max]);
      break;
    case "PIB":   // GDP - Gross Domestic Product
      formatValue = d3.format(".2s");
      xScale = d3.scale.log().base(2)
      .range([0, width])
      .domain([bounds[xVar].min, bounds[xVar].max]);
      break;
    case "Participações": // How many times this country went to a world cup
      formatValue = d3.format("d");
      xScale = d3.scale.linear()
      .range([0, width])
      .domain([bounds[xVar].min, bounds[xVar].max]);
      break;
    case "IDH":
      formatValue = d3.format(".2f");
      xScale = d3.scale.linear()
      .range([0, width])
      .domain([bounds[xVar].min, bounds[xVar].max]);
      break;
  }
}
function updateChart() {
  updateScales();
  d3.selectAll('.dot')
  .transition()
  .duration(1000)
  .ease('quad-out')
  .attr('cx', function (d) { return xScale(d[xVar]); })
  .attr('cy', function (d) { return y(d[yVar]); });

  //Also update the axes
  d3.select('.x')
  .transition()
  .call(makeXAxis);
  d3.select('.y')
  .transition()
  .call(makeYAxis);
  // Update axis labels
  d3.select('.label')
  .text(descriptions[xVar]);
  // Start THE FORCE
  force.start();
}

function updateMenus() {
  d3.select('#x-axis-menu')
  .selectAll('a')
  .classed('active', function (d) {
    return d === xVar;
  });
}

updateChart();
updateMenus();