const cloudinary = require('../utils/cloudinary')
import { Request, Response, NextFunction } from 'express'

export const postImage = async (request: Request, response: Response, next: NextFunction) => {
  let imageUrl = ''
  if (request.file) {
    const result = await cloudinary.uploader.upload(request.file.path)
    imageUrl = result.secure_url
  }
  response.status(201).json({ imageUrl });
}