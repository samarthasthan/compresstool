const { app } = require('electron')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const sharp = require('sharp')

// Generate a random UUID
const random_uuid = uuidv4()

// App user data folder
const appDirectory = app.getPath('userData')

// Where app settings store
const settingsFilePath = path.join(appDirectory, 'settings.json')
// Where app recents store
const recentsFilePath = path.join(appDirectory, 'recent.json', '')

export const addFiles = (event, args) => {
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
      uuid: random_uuid,
      name: path.basename(args[i]),
      original_path: args[i],
      time: new Date().toLocaleString(),
      status: 'pending',
      new_path: '',
      size: null
    }
    recents.unshift(recent0bject)
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

export const compressFiles = async (event) => {
  let recents
  const recentsJson = fs.readFileSync(recentsFilePath, 'utf-8')
  recents = JSON.parse(recentsJson)
  try {
    // Read the settings from the JSON file
    const settingsJson = fs.readFileSync(settingsFilePath, 'utf-8')
    const settingsObject = JSON.parse(settingsJson)
    const outputDirectory = settingsObject.location
    if (!fs.existsSync(outputDirectory)) {
      fs.mkdirSync(outputDirectory)
    }

    // Process each recent object
    for (let i = recents.length - 1; i >= 0; i--) {
      const recent = recents[i]

      // Check if the file exists
      if (fs.existsSync(recent.original_path)) {
        const outputPath = path.join(outputDirectory, recent.name)

        if (recent.status === 'pending') {
          // Compress the image using Sharp within a Promise
          await new Promise((resolve) => {
            sharp(recent.original_path)
              .jpeg({ quality: parseInt(settingsObject.quality) }) // You can use .webp() for WebP format if preferred
              .toFile(outputPath, (err, info) => {
                if (err) {
                  console.error(`Error compressing ${recent.name}:`, err)
                  recent.status = 'error' // Update status to 'error' on error
                  fs.writeFileSync(recentsFilePath, JSON.stringify(recents, null, 2))
                  event.sender.send('take-update')
                  resolve()
                } else {
                  console.log(`Compressed ${recent.name} and saved to ${outputPath}`)
                  recent.status = 'successful' // Update status to 'successful' on success
                  recent.new_path = outputPath // Set new_path to the output path
                  recent.size = formatBytes(info.size) // Set size to the file size

                  fs.writeFileSync(recentsFilePath, JSON.stringify(recents, null, 2))
                  event.sender.send('take-update')
                  resolve()
                }
              })
          })
        }
      } else {
        console.warn(`File not found: ${recent.name}`)
        recent.status = 'not_found' // Update status to 'not_found' if the file doesn't exist
        fs.writeFileSync(recentsFilePath, JSON.stringify(recents, null, 2))
        event.sender.send('take-update')
      }
    }
  } catch (error) {
    console.error('Error compressing files:', error)
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
