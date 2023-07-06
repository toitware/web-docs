/*
OnlyCurrentDoc
*/
// Copyright (C) 2023 Toitware ApS.
// Use of this source code is governed by a Zero-Clause BSD license that can
// be found in the LICENSE_BSD0 file.

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
