import { XMLParser } from 'fast-xml-parser'
export const parseXml = (xml: string): unknown => {
  const parser = new XMLParser()
  const data = parser.parse(xml)
  return data
}
