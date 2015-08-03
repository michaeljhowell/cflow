var graph = new joint.dia.Graph;

var paper = new joint.dia.Paper({
    el: $('#paper'),
    width: 600,
    height: 600,
    model: graph,
    gridSize: 1,
    defaultLink: new joint.dia.Link({
        smooth: true,
        attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
    }),
    validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
        // Prevent linking from input ports.
        if (magnetS && magnetS.getAttribute('type') === 'input') return false;
        // Prevent linking from output ports to input ports within one element.
        if (cellViewS === cellViewT) return false;
        // Prevent linking to input ports.
        return magnetT && magnetT.getAttribute('type') === 'input';
    },
    snapLinks: { radius: 75 },
    markAvailable: true
});

paper.on('cell:pointerup', function(cellView, event, x, y){
    console.log("pointerup");
    console.log(event);
    console.log(x+" "+y);
    console.log("1:"+cellView);
});
var nTime = new joint.shapes.basic.Rect({
    position: { x: 100, y: 30 },
    size: { width: 75, height: 75 },
    attrs: { rect: { fill: 'blue' },
        text: {text:'Time'},
        '.label': { text: 'Time', fill: 'white' },
        '.outPorts circle': {fill: 'green'}
    }
});

var nToggle = nTime.clone();
nToggle.attr({
    rect: {fill: 'white'},
    text: {text:'Toggle'}
});

nTime.on('change:z', function(){alert('Parent Changed')});

var nHourHand = nTime.clone();
nHourHand.attr({
    rect: {fill: 'green'},
    text: {text:'Hours'}
});
var nMinuteHand = nTime.clone();
nMinuteHand.attr({
    rect: {fill: '#ABABAB'},
    text: {text:'Minutes'}
});
var nClockFace = nTime.clone();
nClockFace.attr({
    rect: {fill: 'white'},
    text: {text:'Clock Face'}
});

var nOutput = nTime.clone();

nOutput.attr({
    rect: {fill: 'white'},
    text: {text:'Output'}
});

nTime.position(300,30);
nToggle.position(50,30);
nHourHand.position(200, 250);
nMinuteHand.position(100,250);
nClockFace.position(50,400);
nOutput.position(150, 500);

var link = new joint.dia.Link({
    source: { id: nTime.id },
    target: { id: nToggle.id }
});

var link2 = new joint.dia.Link({
    source: { id: nTime.id },
    target: { id: nHourHand.id }
});

graph.addCells([nTime, nToggle, nHourHand, nMinuteHand,
    nClockFace, nOutput,
    link, link2]);

var m1 = new joint.shapes.devs.Model({
    position: { x: 50, y: 75 },
    size: { width: 90, height: 90 },
    inPorts: [],
    outPorts: [''],
    attrs: {
        '.label': { text: 'Model', 'ref-y': .4 },
        rect: { fill: '#2ECC71', rx: 50, ry: 80 },
        '.inPorts circle': { fill: '#16A085', magnet: 'passive', type: 'input' },
        '.outPorts circle': { fill: '#E74C3C' }
    }
}).addTo(graph);


var m2 = new joint.shapes.devs.Model({
    position:{x:200, y:100},
    size: { width: 90, height: 90 },
    inPorts: [''],
    outPorts: [''],
    attrs: {
        rect: {rx: 0, ry: 0, fill: '#2ECC71'},
        '.label': {text: 'Other Model'},
        '.inPorts circle': { fill: '#0099FF', magnet: 'passive', type: 'input'},
        '.outPorts circle': { fill: '#E74C3C' }
    }
}).addTo(graph);

m2.prop("outPorts", ["we", "wee"]);
