const { app } = require('electron')
const path = require('path')
const fs = require('fs')
const os = require('os')
const userHomeDir = os.homedir()

// User download folder
const downloadsDirectory = path.join(userHomeDir, 'Downloads')
const appDownloadsDirectory = path.join(downloadsDirectory, app.name)

// App user data folder
const appDirectory = app.getPath('userData')

// Where app settings store
const settingsFilePath = path.join(appDirectory, 'settings.json')

// Where app recents store
const recentsFilePath = path.join(appDirectory, 'recent.json', '')

export const setSettings = (event, args) => {
  // Check is settings exists if not create default settings
  if (!fs.existsSync(settingsFilePath)) {
    let settingsData = {
      location: appDownloadsDirectory,
      quality: 85
    }
    fs.writeFileSync(settingsFilePath, JSON.stringify(settingsData))
  } else {
    args === null ? console.log() : fs.writeFileSync(settingsFilePath, JSON.stringify(args))
  }
  !fs.existsSync(recentsFilePath)
    ? fs.writeFileSync(recentsFilePath, JSON.stringify([]))
    : setPendingFailed()
}

// Send  settings
export const getSettings = (event) => {
  try {
    // Read the settings from the JSON file
    const settingsJson = fs.readFileSync(settingsFilePath, 'utf-8')
    const settingsObject = JSON.parse(settingsJson)

    // Send the settings object back to the renderer process
    event.sender.send('take-settings', settingsObject)
  } catch (error) {
    console.error('Error while reading settings:', error)

    // Optionally, send an error message back to the renderer process
    event.sender.send('take-settings', error.message)
  }
}

function setPendingFailed() {
  let recents
  const recentsJson = fs.readFileSync(recentsFilePath, 'utf-8')
  recents = JSON.parse(recentsJson)
  recents.forEach((element) => {
    if (element.status === 'pending') {
      element.status = 'error'
    }
  })
  fs.writeFileSync(recentsFilePath, JSON.stringify(recents, null, 2))
}
