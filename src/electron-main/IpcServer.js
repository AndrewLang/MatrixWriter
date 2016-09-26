const ipc = require('electron').ipcMain;
const dialog = require('electron').dialog;


ipc.on('mw:log', function (event, message) {
  //event.sender.send('asynchronous-reply', 'pong')
  console.log(message);
})

ipc.on('mw:OpenFileDialog', function (event, title, defaultFolder, filters) {
  console.log(defaultFolder);

  dialog.showOpenDialog({
    title: title,
    defaultPath: defaultFolder,
    filters: filters,
    properties: ['openFile']
  }, function (files) {
    if (files)
      event.returnValue = files;
    else
      event.returnValue = "";
  });
})
