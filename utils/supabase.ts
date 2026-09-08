import { createClient } from '@supabase/supabase-js'

const bucket = 'swift-store'

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string,
)

const sanitizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, '_')

export const uploadImage = async (image: File) => {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
    throw new Error('Missing Supabase credentials')
  }

  const timestamp = Date.now()
  const newName = `${timestamp}-${sanitizeFileName(image.name)}`
  const buffer = Buffer.from(await image.arrayBuffer())

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, buffer, {
      cacheControl: '3600',
      contentType: image.type || 'application/octet-stream',
    })

  if (error || !data) {
    throw new Error(error?.message || 'Image upload failed')
  }

  return supabase.storage.from(bucket).getPublicUrl(newName).data.publicUrl
}

export const deleteImage = (url: string) => {
  const imageName = url.split('/').pop()
  if (!imageName) throw new Error('Invalid URL')
  return supabase.storage.from(bucket).remove([imageName])
}
