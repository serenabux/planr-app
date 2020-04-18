function setColor(memberNumber){
    var circles = document.getElementsByClassName("circle");
    var memberNumber = circles.length;
    let colors = ['#52489c', '#4CB944', '#EB5160', '#F9C80E', '#F86624'];
    var avalible_colors = ['#52489c', '#4CB944', '#EB5160', '#F9C80E', '#F86624'];
    var memberColors = []
    let randomItem = Math.floor(Math.random()*avalible_colors.length);
    memberColors.push(avalible_colors[randomItem]);
    randomItem.pop(randomItem);
    if(avalible_colors.length == 0){
        memcpy(colors, avalible_colors, sizeof(colors));
    }
    for(var i; i < memberNumber; i++){
        circles[i].fill = memberColors[i]
    }
}