var countMembers = 0;
var countFormuls = 0;
var countShrifts = 0;
var count = 0;
var countMove = 0;
var countTimes = 0;
var countColor = 0;
var countSize = 0;

function begin(){ //для перемещения маленьких окон
    document.body.addEventListener("mousemove", move, false);
    document.body.addEventListener("mouseup", end, false);
}
function move(event){
    if(countMove==0){
        tar = event.target.parentNode;
        countMove++;
}
    var x = event.clientX /screen.width * 100 - 8;
    var y = event.pageY - 15;
    tar.style.marginLeft = "";
    tar.style.marginTop = "";
    tar.style.marginLeft = x + "%";
    tar.style.marginTop = y + "px";
}
function end(){
    document.body.removeEventListener("mousemove", move, false);
    document.body.removeEventListener("mouseup", end, false);
    countMove = 0;
}
function show(id){ //для отображения маленьких окон
    var links = document.links;
    if(id.id=='members'){
        count = countMembers;
    }else if(id.id=='formuls'){
        count = countFormuls;
    }else{
        count = countShrifts;
    }
    if(count%2==0){
        if(id.style.opacity < 0.9){
            id.style.opacity = (id.style.opacity * 1) + 0.1;
            setTimeout(function(){show(id);}, 20);
            id.style.visibility = "visible";
            for(var i = links.length - 1; i >= 0; i--){
                if(links[i].href=='javascript:show(' + id.id + ')'){
                    if(links[i].children.length > 0){
                        links[i].children[0].className = 'shine-img';
                        i = -1;
                    }else{
                        links[i].className = 'shine-a';
                        i = -1;
                    }
                }
            }
        }else{
           if(id.id=='members'){
                countMembers++;
            }else if(id.id=='formuls'){
                countFormuls++;
            }else{
                countShrifts++;
            }
        }
    }else{
        if(id.style.opacity > 0){
            id.style.opacity = (id.style.opacity * 1) - 0.1;
            setTimeout(function(){show(id);}, 20);
            for(var i = 0; i < links.length; i++){
                if(links[i].href=='javascript:show(' + id.id + ')'){
                    if(links[i].children.length > 0){
                        links[i].children[0].className = "";
                    }else{
                        links[i].className = "user";
                    }
                }
            }
        }else{
            id.style.visibility = "hidden";
            if(id.id=='members'){
                countMembers++;
            }else if(id.id=='formuls'){
                countFormuls++;
            }else{
                countShrifts++;
            }
        }
    }
}

function resize(max, min){ //для окон чата и лекции
    if(min.style.display != 'none'){
        min.style.display = 'none';
        max.style.maxWidth = '94%';
        if(min.id == 'chat') {
            leftContent.style.maxWidth = '94%';
            max.style.marginLeft = 'auto';
        }else{
            chat.style.marginTop = '0px';
        }
        chatText.style.height = '500px';
        max.parentNode.style.display = 'block';
        var img = document.images;
        for(var i = 0; i < img.length; i++){
            if(img[i].src=='http://localhost:8080/images/mini-max.png'){
                img[i].src = 'http://localhost:8080/images/mini-mini.png';
            }
        }
        var collLabel = info.getElementsByTagName('label');
        for(var i = 0; collLabel.length - 1 > i; i++){
            collLabel[i].style.float = 'left';
            collLabel[i].style.marginRight = '2%';
        }
    }else{
        min.style.display = '';
        max.style.maxWidth = '';
        max.style.marginLeft = '';
        max.style.marginTop = '';
        chat.style.marginTop = '';
        chatText.style.height = '';
        max.parentNode.style.display = '';
        var img = document.images;
        for(var i = 0; i < img.length; i++){
            if(img[i].src=='http://localhost:8080/images/mini-mini.png'){
                img[i].src = 'http://localhost:8080/images/mini-max.png';
            }
        }
        var collLabel = info.getElementsByTagName('label');
        for(var i = 0; collLabel.length - 1 > i; i++){
            collLabel[i].style.float = '';
            collLabel[i].style.marginRight = '';
        }
    }
}
var y=4;
var countcommPanel=0;
var countquestPanel=0;
var countPanel=0;

function commPanel(ind, panel){ //для панели комментариев и вопросов
    var x = writeHeader.children;
    if(panel=='commPanelClass') {countPanel = countcommPanel;}
    else {countPanel = countquestPanel;}
    if(countPanel%2==0){        
        if(y==4){
            if(parseFloat(x[ind].style.marginRight * 1) < 15){
                x[ind].style.marginRight = y + '%';
                y+= 0.2;
                setTimeout(function(){commPanel(ind, panel)}, 1);
            }
        }else{
            if(parseFloat(x[ind].style.marginRight) < 15){
                x[ind].style.marginRight = y + '%';
                y+= 0.2;
                setTimeout(function(){commPanel(ind, panel)}, 1);
            }else{
                var div = document.createElement('div');
                div.style.maxWidth = '1px';
                div.style.marginLeft = '62%';
                var a = document.createElement('a');
                a.href = 'javascript:createComm()';
                a.innerHTML = 'создать';
                a.style.paddingTop = '10px';
                a.style.display = 'block';
                var a2 = document.createElement('a');
                a2.href = 'javascript:hiddenComm()';
                a2.innerHTML = 'скрывать';
                x[ind].appendChild(div);
                x[ind].style.display = 'flex';
                x[ind].id = 'leftBorder' + ind;
                x[ind].nextElementSibling.className += ' border-left-panel';
                div.style.visibility = 'hidden';
                div.style.opacity = '0';
                div.appendChild(a);
                div.appendChild(a2);
                showPanel(panel, x, ind);
                if(panel=='commPanelClass')countcommPanel++;
                else{countquestPanel++;}
                y=4;
            }   
        }
    }else{
        hiddenPanel(x, ind);
        if(parseFloat(x[ind].style.marginRight) > 4){
            x[ind].style.marginRight = parseFloat(x[ind].style.marginRight) - 0.2 + '%';
            setTimeout(function(){commPanel(ind, panel)}, 1);
        }else{
            x[ind].className = panel;
            x[ind].style.marginRight = "";
            x[ind].nextElementSibling.className = "";
            x[ind].lastElementChild.remove();
            x[ind].id = "";
            if(panel=='commPanelClass')countcommPanel++;
            else{countquestPanel++;}
        }
    }
}


function showPanel(panel, x, ind){ //для панели сверху лекции
    if(x[ind].lastElementChild.style.opacity <= 0.9){
        x[ind].lastElementChild.style.opacity = x[ind].lastElementChild.style.opacity * 1 + 0.1;
        x[ind].lastElementChild.style.visibility = 'visible';
        setTimeout(function(){showPanel(panel, x, ind);}, 20);  
    }
    x[ind].className =  panel + ' border-left-panel';
}
function hiddenPanel(x, ind){ //для панели сверху лекции
    if(x[ind].lastElementChild.style.opacity > 0){
        x[ind].lastElementChild.style.opacity = x[ind].lastElementChild.style.opacity * 1 - 0.1;
        setTimeout(function(){hiddenPanel(x, ind);}, 20);  
    }
}

function insertFormul(text){
    var curr = lectionText.selectionEnd;
    var length = lectionText.value.length;
    beforeText = lectionText.value.substring(0, curr);
    posleText = lectionText.value.substring(curr, length);
    lectionText.value = beforeText + text + posleText;
    lectionText.selectionEnd = curr + text.length;
}
function otherSymbols(){
    var elem = document.body.firstElementChild;
    if(elem.style.opacity * 1 == 0) {elem.style.opacity = 1;}
    if(elem.style.opacity * 1 >= 0.5){
        elem.style.opacity -= 0.1;
        setTimeout(otherSymbols, 40);
    }
}
function showTimes(){
    var currentTimes;
    if(countTimes==0){
        lectionText.style.fontFamily = 'Segoe Script';
        countTimes++;
    }else{
        currentTimes = lectionText.style.fontFamily;
        var collOpt = times.options;
        var need = collOpt[times.selectedIndex].value;
        lectionText.style.fontFamily = need;
        times.style.fontFamily = need;
    }
}
function showColor(){
    var currentColor;
    if(countColor==0){
        lectionText.style.color = '#555555';
        countColor++;
    }else{
        currentColor = lectionText.style.color;
        var collOpt = color.options;
        var need = collOpt[color.selectedIndex].value;
        lectionText.style.color = need;
        exampleColor.style.background = need;
    }
}
function showSize(){
    var currentSize;
    if(countSize==0){
        lectionText.style.size = '12px';
        countSize++;
    }else{
        currentSize = lectionText.style.fontSize;
        var collOpt = size.options;
        var need = collOpt[size.selectedIndex].value;
        lectionText.style.fontSize = need;
    }
}

window.onload = function(){
    (function(){
        var date = new Date;
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        time.innerHTML = "Длительность: 00 : " + m + " : " + s;
        window.setTimeout(arguments.callee, 500);
    })();

    times.addEventListener('mouseup', showTimes, false);
    color.addEventListener('mouseup', showColor, false);
    size.addEventListener('mouseup', showSize, false);
};
