const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const ipc = electron.ipcMain;
const webContents = electron.webContents;

function getWindow(windowName) {
    var windowArray = BrowserWindow.getAllWindows();
    for (var i = 0; i < windowArray.length; i++) {
        if (windowArray[i].name == windowName) {
            return windowArray[i].window;
        }
    }
    return null;
}

let template = [{
    label: 'File',
    submenu: [
        {
            label: "New post", accelerator: 'CmdOrCtrl+N', click: function (item, focusedWindow) {
                if (focusedWindow) {
                    //ipc.send("mwMaing:Log", "Log from main process ");
                    // var windows = electron.getAllWindows();
                    // console.log( windows);

                   var mainWindow = getWindow('mainWindow');
                }
            }
        },
        { label: "Open local post", accelerator: 'CmdOrCtrl+O' },
        { label: "Save", accelerator: 'CmdOrCtrl+S' },
        { type: 'separator' },
        { label: "Publish" },
        { type: 'separator' },
        { label: "Print" },
        { type: 'separator' },
        { label: "Options" },
        { type: 'separator' },
        { label: "Exit" }
    ]
}, {
        label: 'Edit',
        submenu: [
            { label: 'Undo', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
            { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
            { type: 'separator' },
            { label: 'Cut', accelerator: 'CmdOrCtrl+X', role: 'cut' },
            { label: 'Copy', accelerator: 'CmdOrCtrl+C', role: 'copy' },
            { label: 'Paste', accelerator: 'CmdOrCtrl+V', role: 'paste' },
            { type: 'separator' },
            { label: 'Select All', accelerator: 'CmdOrCtrl+A', role: 'selectall' }]
    }, {
        label: 'Format',
        submenu: [
            { label: 'Bold' },
            { label: 'Italic' },
            { label: 'Underline' },
            { label: 'Strikethrough' },
            { type: 'separator' },
            { label: 'Superscript' },
            { label: 'Subscript' },
            { type: 'separator' },
            { label: 'Increase indent' },
            { label: 'Decrease indent' },
            { type: 'separator' },
            { label: 'Text color' },
            { label: 'Text background' },
            { type: 'separator' },
            {
                label: 'Align',
                submenu: [
                    { label: 'Align left' },
                    { label: 'Align center' },
                    { label: 'Align right' },
                    { label: 'Justify' }
                ]
            },
            {
                label: 'Bullet list',
                submenu: [
                    { label: 'Default' },
                    { label: 'Circle' },
                    { label: 'Disc' },
                    { label: 'Square' }
                ]
            },
            {
                label: 'Number list',
                submenu: [
                    { label: 'Default' },
                    { label: 'Lower Alpha' },
                    { label: 'Lpwer Greek' },
                    { label: 'Lower Roman' },
                    { label: 'Upper Alpha' },
                    { label: 'Upper Roman' }
                ]
            },
            { type: 'separator' },
            { label: 'Clear format' },
        ]
    }, {
        label: 'Insert',
        submenu: [
            { label: 'Hyperink' },
            { label: 'Emoticon' },
            { label: 'Horizontal line' },
            { label: 'Date' },
            { type: 'separator' },
            { label: 'Picture' },
            { label: 'Screenshot' },
            { label: 'Video' },
            { label: 'Map' },
            { label: 'Code sample' },
            { type: 'separator' },
            { label: 'Table' },
        ]
    },
    {
        label: 'View',
        submenu: [
            { label: 'Show welcome' },
            { type: 'separator' },
            { label: 'Visual aid' },
            { label: 'Visual blocks' },
            { type: 'separator' },
            {
                label: 'Reload', accelerator: 'CmdOrCtrl+R', click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        // on reload, start fresh and close any old
                        // open secondary windows
                        if (focusedWindow.id === 1) {
                            BrowserWindow.getAllWindows().forEach(function (win) {
                                if (win.id > 1) {
                                    win.close()
                                }
                            })
                        }
                        focusedWindow.reload()
                    }
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F'
                    } else {
                        return 'F11'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
                    }
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I'
                    } else {
                        return 'Ctrl+Shift+I'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
                }
            },
            {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }
        ]
    }, {
        label: 'Help',
        role: 'help',
        submenu: [
            {
                label: 'About',
                click: function () {
                    electron.shell.openExternal('http://electron.atom.io')
                }
            }]
    }]

function addUpdateMenuItems(items, position) {
    if (process.mas) return

    const version = electron.app.getVersion()
    let updateItems = [{
        label: `Version ${version}`,
        enabled: false
    }, {
            label: 'Checking for Update',
            enabled: false,
            key: 'checkingForUpdate'
        }, {
            label: 'Check for Update',
            visible: false,
            key: 'checkForUpdate',
            click: function () {
                require('electron').autoUpdater.checkForUpdates()
            }
        }, {
            label: 'Restart and Install Update',
            enabled: true,
            visible: false,
            key: 'restartToUpdate',
            click: function () {
                require('electron').autoUpdater.quitAndInstall()
            }
        }]

    items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}

if (process.platform === 'darwin') {
    const name = electron.app.getName()
    template.unshift({
        label: name,
        submenu: [{
            label: `About ${name}`,
            role: 'about'
        }, {
                type: 'separator'
            }, {
                label: 'Services',
                role: 'services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: `Hide ${name}`,
                accelerator: 'Command+H',
                role: 'hide'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Alt+H',
                role: 'hideothers'
            }, {
                label: 'Show All',
                role: 'unhide'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit()
                }
            }]
    })

    // Window menu.
    template[3].submenu.push({
        type: 'separator'
    }, {
            label: 'Bring All to Front',
            role: 'front'
        })

    addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
    const helpMenu = template[template.length - 1].submenu
    addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem)
        reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem)
        reopenMenuItem.enabled = true
})

ipc.on('mw:ShowMainMenu', function (event) {
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
});
ipc.on('mw:HideMainMenu', function (event) {
    Menu.setApplicationMenu(null);
});