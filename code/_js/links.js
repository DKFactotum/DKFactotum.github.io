const TWOPI = 2 * 3.14159265;
var langDict = [];
var currentAngle = 0;
var angleUpdateTime = 5;
var targetAngleSpeed = 0.00125;
var angleSpeed = 0.000125;
var rotating = true;
var startStep = 12;
var minStep = 9;
var stepChange = 0.85;

////////////////////////////////////////////////////////////////////////////////
//////////////////////Preparation functions/////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
$( window ).on("load", function() {
    OrganizeLinks();
    setInterval(UpdateLinks, angleUpdateTime);
});

////////////////////////////////////////////////////////////////////////////////
function UpdateLinks(){
    if (langDict.length > 0 && rotating){
        if (angleSpeed < targetAngleSpeed)
            angleSpeed += targetAngleSpeed/250.0;
        currentAngle += angleSpeed;
        if (currentAngle > TWOPI)
            currentAngle -= TWOPI;
        for(var index in langDict){
            AdjustItems(langDict[index], startStep, TWOPI, currentAngle, 0, 0);
        }
    }
}
function ToggleRotation(){
    rotating = !rotating;
    if (!rotating){
        angleSpeed = 0;
    }
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
        item.hover(ToggleRotation);
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
            var levelClassName = "level"+level;
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

    baseStep = Math.max(minStep,baseStep);
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
