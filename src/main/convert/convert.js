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
    : console.log('ignore it')
  if (fs.existsSync(recentsFilePath)) {
    // Read the existing recents data if the file exists
    const recentsJson = fs.readFileSync(recentsFilePath, 'utf-8')
    recents = JSON.parse(recentsJson)
  }

  // Add each args[i] to the recents array
  for (let i = 0; i < args.length; i++) {
    const { name } = path.parse(path.basename(args[i]))
    // Read the settings from the JSON file
    const settingsJson = fs.readFileSync(settingsFilePath, 'utf-8')
    const settingsObject = JSON.parse(settingsJson)
    let recent0bject = {
      uuid: random_uuid,
      name: `${name}.${settingsObject.format}`,
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
        // Perform compression
        const { name } = path.parse(path.basename(recent.name))
        const outputPath = path.join(outputDirectory, `${name}.${settingsObject.format}`)

        if (recent.status === 'pending') {
          // Compress the image using Sharp within a Promise
          await new Promise((resolve) => {
            let image = sharp(recent.original_path)

            const quality =
              settingsObject.quality < 5 ? 5 : Math.floor(parseInt(settingsObject.quality / 1.5))

            // Check for the format and apply specific settings
            switch (settingsObject.format) {
              case 'png':
                image = image.png({
                  compressionLevel: 9,
                  adaptiveFiltering: true,
                  quality: quality
                })
                break
              case 'jpeg':
                image = image.jpeg({ quality: quality })
                break
              case 'webp':
                image = image.webp({
                  quality: quality,
                  progressive: true,
                  removeMetadata: true
                })
                break
              case 'avif':
                image = image.avif({ quality: quality })
                break
              case 'tiff':
                image = image.tiff({ quality: quality })
                break
              default:
                console.error('Invalid format:', settingsObject.format)
                break
            }
            image.toFile(outputPath, (err, info) => {
              if (err) {
                recent.status = 'error' // Update status to 'error' on error
                fs.writeFileSync(recentsFilePath, JSON.stringify(recents, null, 2))
                event.sender.send('take-update')
                resolve()
              } else {
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
