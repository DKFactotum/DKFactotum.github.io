const TWOPI = 2 * 3.14159265;
var langDict = [];
// The tree stands still (S107: the rotation went); nodes now and then swell or shrink a
// little and settle, one at a time.
var layoutAngle = 0.65;      // Art's branch, the longest, points into the lower-right corner
var pulseEvery = 1600;
var startStep = 7.5;
var minStep = 7.5;
var maxStep = 12;
var stepChange = 1.125;

$( window ).on("load", function() {
    OrganizeLinks();
    LayoutLinks();
    // The card eases to its new size over a second; follow it frame by frame so the lines,
    // which are drawn in pixels from its size, stay on the nodes, which are placed in vmin.
    $(window).on("resize", RelayoutForAWhile);
    // A hidden language section has no size; lay it out again once it is shown.
    $('.lang-element').on("click", function(){ setTimeout(LayoutLinks, 0); });
    setInterval(PulseLink, pulseEvery);
});

// The tree is laid out twice: once to find the nodes' centre of mass, and once shifted by
// it, so the tree sits centred in its card whichever way its branches go.
var shiftX = 0, shiftY = 0, collected = null, placed = null;
function LayoutLinks(){
    for(var index in langDict){
        collected = []; shiftX = 0; shiftY = 0;
        AdjustItems(langDict[index], startStep, TWOPI, layoutAngle, 0, 0);
        var sx = 0, sy = 0;
        for (var i in collected){ sx += collected[i][0]; sy += collected[i][1]; }
        if (collected.length > 0){ shiftX = -sx/collected.length; shiftY = -sy/collected.length; }
        collected = null; placed = [];
        // the root's own line starts where the root now is, not at the card's centre
        var vMin = Math.min($(window).width(), $(window).height())/100;
        AdjustItems(langDict[index], startStep, TWOPI, layoutAngle, shiftX*vMin, shiftY*vMin);
        FitDiagram(langDict[index], placed, vMin);
        placed = null;
    }
}
// On a portrait screen the tree, sized in vmin, is drawn for the width alone and comes out
// small; scale the whole diagram up until its farthest node, from the centre, meets the card's
// edge less a small margin (S107). Landscape screens keep it as laid out.
function FitDiagram(dict, nodes, vMin){
    var diagram = $(dict[0].line).closest(".linksDiagram");
    var w = diagram.width(), h = diagram.height();
    var k = 1;
    if (w > 0 && h > 0 && $(window).width() < $(window).height()){
        var reachX = 0, reachY = 0;
        for (var i in nodes){
            var r = $(nodes[i].el).outerWidth()/2;
            reachX = Math.max(reachX, Math.abs(nodes[i].x*vMin) + r);
            reachY = Math.max(reachY, Math.abs(nodes[i].y*vMin) + r);
        }
        if (reachX > 0 && reachY > 0)
            k = Math.max(1, Math.min(2.2, (w/2*0.94)/reachX, (h/2*0.94)/reachY));
    }
    diagram.css("transform", k == 1 ? "" : "scale("+k+")");
}
var relayoutUntil = 0, relayoutRunning = false;
function RelayoutForAWhile(){
    relayoutUntil = Date.now() + 1300;
    if (relayoutRunning) return;
    relayoutRunning = true;
    var tick = function(){
        LayoutLinks();
        if (Date.now() < relayoutUntil) requestAnimationFrame(tick);
        else relayoutRunning = false;
    };
    requestAnimationFrame(tick);
}
function PulseLink(){
    var items = $("section.lang-section.lang-active .linkItem a");
    if (items.length == 0) return;
    // Clear the last pulse first, so a finished one never jumps back when its class goes.
    items.filter(".pulse-up, .pulse-down").removeClass("pulse-up pulse-down");
    var item = items.eq(Math.floor(Math.random() * items.length));
    var kind = Math.random() < 0.6 ? "pulse-up" : "pulse-down";
    void item[0].offsetWidth;   // restart the animation if the same node is picked again
    item.addClass(kind);
}

function OrganizeLinks(){
  var langSections = $("section.lang-section");
  langDict = [];
  langSections.each(function(i){
      // var classes = langSections.eq(i).attr("class").split(/\s+/);
      // var lang = classes.reduce((a, b) => a.length <= b.length ? a : b);
      //console.log(langSections.eq(i));
      var lineHolder = langSections.eq(i).find(".visualLink");
      var links = langSections.eq(i).find(".linkItem");
      var dict = []
      links.each(function(j) {
        var item = links.eq(j);
        var dataHolder = item.find(".dataHolder");
        var itemName = dataHolder.find(".name").text();
        var parentName = dataHolder.find(".parent").text();
        var lineClassName = ".line"+itemName;
        var line = lineHolder.find(lineClassName);
        //console.log(line);
        PlaceItem(dict, item, itemName, parentName, line, 0, true);
      });
      langDict.push(dict);
      //console.log(dict);
  });
}

function PlaceItem(dict, item, itemName, parentName, line, level, base){
    var found = false;
    // Search for base cases
    for (var index in dict){
        var dictItem = dict[index];
        if (dictItem.itemName == parentName){
            dictItem.children.push({
                item: item,
                itemName: itemName,
                parentName: parentName,
                line: line,
                children: [],
                level: level+1
            });
            var levelClassName = "level"+(level+1);
            item.addClass(levelClassName);
            found = true;
            return true;
        }
    }
    // search in children
    for (var index in dict){
        var dictItem = dict[index];
        found = PlaceItem(dictItem.children, item, itemName, parentName, line, level+1, false);
        if (found) return true;
    }
    // add a new base case
    if (!found && base){
        dict.push({
            item: item,
            itemName: itemName,
            parentName: parentName,
            line: line,
            children: [],
            level: level
        });
        var levelClassName = "level"+level;
        item.addClass(levelClassName);
        return true;
    }
    return false
}
function AdjustItems(dict, baseStep, angleRange, angleOffset, parentX, parentY){
    var bodyWidth = $(window).width()/100;
    var bodyHeight = $(window).height()/100;
    var vMin = Math.min(bodyWidth, bodyHeight);

    baseStep = Math.max(minStep,Math.min(maxStep, baseStep));
    var startAngle = angleOffset;
    var angleStep = angleRange / dict.length;
    if (dict.length > 1){
        startAngle = startAngle - angleRange/2 + angleStep/2;
    }
    var angle = startAngle;

    var lineContainerWidth = $(dict[0].line).parent().width();
    var lineContainerHeight = $(dict[0].line).parent().height();
    var parentX = parentX + lineContainerWidth/2;
    var parentY = parentY + lineContainerHeight/2;
    for (var index in dict){
        var item = dict[index];
        var offset = item.level * baseStep;
        var x = offset * Math.cos(angle);
        var y = offset * Math.sin(angle);
        if (collected) collected.push([x, y]);
        x += shiftX; y += shiftY;
        if (placed) placed.push({el: item.item, x: x, y: y});
        $(item.item).css("transform","translate("+x+"vmin,"+y+"vmin)");
        $(item.line).attr("x1", parentX);
        $(item.line).attr("y1", parentY);
        var itemX = x*vMin+lineContainerWidth/2;
        var itemY = y*vMin+lineContainerHeight/2;
        $(item.line).attr("x2", itemX);
        $(item.line).attr("y2", itemY);
        if (item.children.length > 0){
            AdjustItems(item.children, baseStep*stepChange, angleStep, angle, itemX-lineContainerWidth/2, itemY-lineContainerHeight/2);
        }
        angle += angleStep;
    }
}
