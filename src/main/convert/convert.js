const { app } = require('electron')
const path = require('path')
const fs = require('fs')

// App user data folder
const appDirectory = app.getPath('userData')

// Where app recents store
const recentsFilePath = path.join(appDirectory, 'recent.json', '')

export const compressFiles = (event, args) => {
  let recents = []
  !fs.existsSync(recentsFilePath)
    ? fs.writeFileSync(recentsFilePath, JSON.stringify(recents))
    : console.log()
  if (fs.existsSync(recentsFilePath)) {
    // Read the existing recents data if the file exists
    const recentsJson = fs.readFileSync(recentsFilePath, 'utf-8')
    recents = JSON.parse(recentsJson)
  }

  // Add each args[i] to the recents array
  for (let i = 0; i < args.length; i++) {
    let recent0bject = {
      time: new Date().toLocaleString(),
      name: path.basename(args[i]),
      path: args[i],
      status: 'pending'
    }
    recents.push(recent0bject)
  }

  // Write the updated recents array back to the file
  fs.writeFileSync(recentsFilePath, JSON.stringify(recents))
  const recentsJson = fs.readFileSync(recentsFilePath, 'utf-8')
  recents = JSON.parse(recentsJson)
  event.sender.send('compress-update', recents)
}

export const sendRecents = (event) => {
  let recents
  const recentsJson = fs.readFileSync(recentsFilePath, 'utf-8')
  recents = JSON.parse(recentsJson)
  event.sender.send('take-recents', recents)
}
