const electron = require('electron')
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app
const ipc = electron.ipcMain;
const webContents = electron.webContents;

function invokeCommand(focusedWindow, commandName, commandArgument) {
    focusedWindow.webContents.send('mw:command', commandName, commandArgument);
}

let template = [{
    label: 'File',
    submenu: [{
        label: "New post",
        accelerator: 'CmdOrCtrl+N',
        click: function (item, focusedWindow) {
            if (focusedWindow) {
                //focusedWindow.webContents.send('mwMain:Log', "message from main process.");
                invokeCommand(focusedWindow, "NewPost");
            }
        }
    },
        {
            label: "Open local post",
            accelerator: 'CmdOrCtrl+O',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "OpenLocalPost");
                }
            }
        },
        {
            label: "Save",
            accelerator: 'CmdOrCtrl+S',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "SavePost");
                }
            }
        },
        { type: 'separator' },
        {
            label: "Publish",
            accelerator: 'CmdOrCtrl+Shift+P',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "PublishPost");
                }
            }
        },
        { type: 'separator' },
        {
            label: "Print",
            accelerator: 'CmdOrCtrl+P',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "PrintPost");
                }
            }
        },
        { type: 'separator' },
        {
            label: "Options",
            accelerator: 'CmdOrCtrl+Shift+O',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "ShowOptions");
                }
            }
        },
        { type: 'separator' },
        {
            label: "Exit",
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "Exit");
                }
            }
        }
    ]
}, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'CmdOrCtrl+Z',
            role: 'undo',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "Undo");
                }
            }
        },
            {
                label: 'Redo',
                accelerator: 'Shift+CmdOrCtrl+Z',
                role: 'redo',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Redo");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Cut',
                accelerator: 'CmdOrCtrl+X',
                role: 'cut',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Cut");
                    }
                }
            },
            {
                label: 'Copy',
                accelerator: 'CmdOrCtrl+C',
                role: 'copy',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Copy");
                    }
                }
            },
            {
                label: 'Paste',
                accelerator: 'CmdOrCtrl+V',
                role: 'paste',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Paste");
                    }
                }
            },
            {
                label: 'Delete',
                accelerator: 'Delete',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Delete");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Find',
                accelerator: 'CmdOrCtrl+F',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "SearchReplace");
                    }
                }
            },
            { label: 'Find Next', accelerator: 'F3' },
            {
                label: 'Replace', accelerator: 'CmdOrCtrl+H',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "SearchReplace");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Select All',
                accelerator: 'CmdOrCtrl+A',
                role: 'selectall',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "SelectAll");
                    }
                }
            }
        ]
    }, {
        label: 'Format',
        submenu: [{
            label: 'Bold',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "Bold");
                }
            }
        },
            {
                label: 'Italic',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Italic");
                    }
                }
            },
            {
                label: 'Underline',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Underline");
                    }
                }
            },
            {
                label: 'Strikethrough',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Strikethrough");
                    }
                }
            },
            {
                label: 'Block quote',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "BlockQuote");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Superscript',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Superscript");
                    }
                }
            },
            {
                label: 'Subscript',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Subscript");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Increase indent',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Indent");
                    }
                }
            },
            {
                label: 'Decrease indent',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "Outdent");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Text color',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "ForeColor");
                    }
                }
            },
            {
                label: 'Text background',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "HiliteColor");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Align',
                submenu: [{
                    label: 'Align left',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            invokeCommand(focusedWindow, "JustifyLeft");
                        }
                    }
                },
                    {
                        label: 'Align center',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "JustifyCenter");
                            }
                        }
                    },
                    {
                        label: 'Align right',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "JustifyRight");
                            }
                        }
                    },
                    {
                        label: 'Justify',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "JustifyFull");
                            }
                        }
                    }
                ]
            },
            {
                label: 'Bullet list',
                submenu: [{
                    label: 'Default',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            invokeCommand(focusedWindow, "BulletDefault");
                        }
                    }
                },
                    {
                        label: 'Circle',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "BulletCircle");
                            }
                        }
                    },
                    {
                        label: 'Disc',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "BulletDisc");
                            }
                        }
                    },
                    {
                        label: 'Square',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "BulletSquare");
                            }
                        }
                    }
                ]
            },
            {
                label: 'Number list',
                submenu: [{
                    label: 'Default',
                    click: function (item, focusedWindow) {
                        if (focusedWindow) {
                            invokeCommand(focusedWindow, "NumberDefault");
                        }
                    }
                },
                    {
                        label: 'Lower Alpha',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "NumberLowerAlpha");
                            }
                        }
                    },
                    {
                        label: 'Lower Greek',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "NumberLowerGreek");
                            }
                        }
                    },
                    {
                        label: 'Lower Roman',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "NumberLowerRoman");
                            }
                        }
                    },
                    {
                        label: 'Upper Alpha',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "NumberupperAlpha");
                            }
                        }
                    },
                    {
                        label: 'Upper Roman',
                        click: function (item, focusedWindow) {
                            if (focusedWindow) {
                                invokeCommand(focusedWindow, "NumberUpperRoman");
                            }
                        }
                    }
                ]
            },
            { type: 'separator' },
            {
                label: 'Clear format',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "RemoveFormat");
                    }
                }
            },
        ]
    }, {
        label: 'Insert',
        submenu: [{
            label: 'Hyperlink',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "InsertLink");
                }
            }
        },
            {
                label: 'Emoticon',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertEmoticon");
                    }
                }
            },
            {
                label: 'Horizontal line',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertHorizontalRule");
                    }
                }
            },
            {
                label: 'Page break',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertPageBreak");
                    }
                }
            },
            {
                label: 'Date',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertDate");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Picture',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertImage");
                    }
                }
            },
            {
                label: 'Screenshot',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertScreenshot");
                    }
                }
            },
             {
                label: 'OneDrive',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertFromOneDrive");
                    }
                }
            },
            {
                label: 'Video',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertVideo");
                    }
                }
            },
            {
                label: 'Map',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertMap");
                    }
                }
            },
            {
                label: 'Code sample',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "CodeEditor");
                    }
                }
            },
            { type: 'separator' },
            {
                label: 'Table',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "InsertTable");
                    }
                }
            },
        ]
    },
    {
        label: 'View',
        submenu: [{
            label: 'Show welcome',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    invokeCommand(focusedWindow, "ShowWelcome");
                }
            }
        },
            { type: 'separator' },
            {
                label: 'Visual aid',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "ToggleVisualAid");
                    }
                }
            },
            {
                label: 'Visual blocks',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        invokeCommand(focusedWindow, "VisualBlocks");
                    }
                }
            },
            { type: 'separator' },
            {
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
        submenu: [{
            label: 'About',
            click: function () {
                invokeCommand(focusedWindow, "ShowAbout");
                electron.shell.openExternal('http://electron.atom.io')
            }
        }]
    }
]

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