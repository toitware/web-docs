/*
OnlyCurrentDoc
*/
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(data.timestamp), data.temperature, data.humidity]);
  return ContentService.createTextOutput("OK");
}

// Optional:
function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.parameter.data);
  sheet.appendRow([new Date(data.timestamp), data.temperature, data.humidity]);
  return ContentService.createTextOutput("OK");
}
