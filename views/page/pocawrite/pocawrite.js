"use strict";

var groupData = ["-----", "아이돌"];
var issueData = {
"-----": [],
"아이돌": ["-----", "소녀시대","샤이니","엑소","BTS","스트레이키즈","NCT","더보이즈","세븐틴","에스파","아이브","르세라핌","뉴진스","스테이씨"],


};
var detailData = {
"-----": [],
"블랙핑크": [],
"트레저": [],
"엑소": [],
"BTS": [],
"스트레이키즈": [],
"NCT": [],
"더보이즈": [],
"세븐틴": [],
"에스파": [],
"아이브": [],
"르세라핌": [],
"뉴진스": [],
"스테이씨": [],




};

var $group = $("#group");
var $issue = $("#issue");
var $detail = $("#detail");

function newIssue(selected) {
$issue.empty();
$.each(issueData[selected], function(index, value) {
$issue.append("<option>" + value + "</option>");
});
}

function newDetail(selected) {
$detail.empty();
console.log("Selected Issue: " + selected);
$.each(detailData[selected], function(index, value) {
$detail.append("<option>" + value + "</option>");
});
}

$(document).ready(function() {
$.each(groupData, function(index, value) {
$group.append("<option>" + value + "</option>");
});

$group.change(function() {
var selected = $(this).find('option:selected').val();
newIssue(selected);
});
$issue.change(function() {
var selected = $(this).find('option:selected').val();
newDetail(selected);
});
});



