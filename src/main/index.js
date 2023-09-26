import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import sharp from 'sharp'
const path = require('path')
const os = require('os')
const fs = require('fs')
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 804,
    height: 496,
    show: false,
    resizable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('compress-image', (event, filePath, softwareName) => {
  // Get the user's home directory
  const userHomeDir = os.homedir()

  // Define the path for the software's folder in the downloads directory
  const downloadsDirectory = path.join(userHomeDir, 'Downloads')
  const softwareFolder = path.join(downloadsDirectory, softwareName)

  // Ensure that the software's folder exists, create it if necessary
  if (!fs.existsSync(softwareFolder)) {
    fs.mkdirSync(softwareFolder)
  }

  // Extract the original file name from the filePath
  const originalFileName = path.basename(filePath)

  // Construct the path for the compressed image within the software's folder
  const compressedPath = path.join(softwareFolder, originalFileName)

  // Perform image compression using 'sharp' library
  sharp(filePath)
    .resize({ width: 800 }) // Adjust the resizing options as needed
    .toFile(compressedPath, (err, info) => {
      if (err) {
        console.error(err)
        event.reply('compression-failed', err.message)
      } else {
        console.log('Image compressed successfully:', info)
        event.reply('compression-success', compressedPath)
      }
    })
})
