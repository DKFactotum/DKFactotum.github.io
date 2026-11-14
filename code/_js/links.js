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
    $(window).on("resize", LayoutLinks);
    // A hidden language section has no size; lay it out again once it is shown.
    $('.lang-element').on("click", function(){ setTimeout(LayoutLinks, 0); });
    setInterval(PulseLink, pulseEvery);
});

function LayoutLinks(){
    for(var index in langDict){
        AdjustItems(langDict[index], startStep, TWOPI, layoutAngle, 0, 0);
    }
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
