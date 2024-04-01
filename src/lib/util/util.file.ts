import path from 'path'
import fs from 'fs'

// parses path and fileName from __filename
export const parseFileName = (filename: string): { fileName: string, path: string } => {
  const separator = path.sep
  const pathParts = filename.split(separator)
  const fileName = (pathParts.pop() ?? '').replace('.ts', '')
  const filePath = pathParts.join(separator)
  return {
    fileName,
    path: filePath
  }
}

export const readFile = (filePath: string, fileName: string): string => fs.readFileSync(path.join(filePath, fileName), 'utf-8')
