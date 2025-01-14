import StringHelper from '@adonisjs/core/helpers/string'
import app from '@adonisjs/core/services/app'
import { join } from 'node:path'
import sharp from 'sharp'
import { rm } from 'node:fs/promises'
import drive from '@adonisjs/drive/services/main'
import logger from '@adonisjs/core/services/logger'

export default class AssetsService {
  async convertAndUpload(location: string, file: any): Promise<string> {
    const uid = StringHelper.generateRandom(10)
    const localKeyPath = join(location, `${uid}.${file.extname}`)
    const keyPath = join(location, `${uid}.webp`)

    try {
      await file.move(app.tmpPath(), { name: localKeyPath })

      const buffer = await sharp(app.tmpPath(localKeyPath)).webp({ quality: 80 }).toBuffer()

      const disk = drive.use()
      await disk.put(keyPath, buffer)
    } catch (e) {
      logger.error(e)
    } finally {
      await rm(join(app.tmpPath(), location), { recursive: true })
    }

    return keyPath
  }
}
