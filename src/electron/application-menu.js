const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

let template = [{
    label: 'File',
    submenu: [
        { label: 'New', accelerator: 'CmdOrCtrl+N' },
        { label: 'Open', accelerator: 'CmdOrCtrl+P' },
        { label: 'Save', accelerator: 'CmdOrCtrl+S' },
        { label: 'Save As...' },
        { type: 'separator' },
        { label: 'Print' },
        { type: 'separator' },
        { label: 'Exit' },]
}, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo'
        }, {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut'
            }, {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy'
            }, {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste'
            }, {
                label: 'Paste as text'
            }, {
                type: 'separator'
            },
            { label: 'Find', accelerator: 'CmdOrCtrl+F' },
            { label: 'Find Next', accelerator: 'F3' },
            { label: 'Replace', accelerator: 'CmdOrCtrl+H' },
            { type: 'separator' },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall'
            }]
    }, {
        label: 'Format',
        submenu: [
            { label: 'Bold' },
            { label: 'Italic' },
            { label: 'Underline' },
            { label: 'Strikethrough' },
            { label: 'Superscript' },
            { label: 'Subscript' },
            { type: 'separator' },
            { label: 'Formats' },
            { label: 'Clear formating' }
        ]
    }, {
        label: 'Insert',
        submenu: [
            { label: 'Insert/edit link' },
            { label: 'Insert/edit image' },
            { label: 'Insert/edit video' },
            { type: 'separator' },
            { label: 'Horizontal line' },
            { label: 'Insert date/time' },
            { type: 'separator' },
            { label: 'Insert table' },
            { label: 'Table properties' },
            { label: 'Delete table' },
            { label: 'Cell' },
            { label: 'Row' },
            { label: 'Column' },
            { type: 'separator' },
            { label: 'Insert template' }
        ]
    }, {
        label: 'View',
        submenu: [
            { label: 'Visual aids' },
            { label: 'Show blocks' },
            { type: 'separator' }, {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
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
            }]
    }, {
        label: 'Window',
        role: 'window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        }, {
                label: 'Close',
                accelerator: 'CmdOrCtrl+W',
                role: 'close'
            }, {
                type: 'separator'
            }, {
                label: 'Reopen Window',
                accelerator: 'CmdOrCtrl+Shift+T',
                enabled: false,
                key: 'reopenMenuItem',
                click: function () {
                    app.emit('activate')
                }
            }]
    }, {
        label: 'Help',
        role: 'help',
        submenu: [{
            label: 'Learn More',
            click: function () {
                electron.shell.openExternal('http://electron.atom.io')
            }
        }, {
                type: 'separator'
            },
            {
                label: 'Reload',
                accelerator: 'F5',
                click: function (item, focusedWindow) {
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
                label: 'Toggle Developer Tools',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I'
                    } else {
                        return 'F12'
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools()
                    }
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
    console.log("menu initialized.");
})

app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = true
});
