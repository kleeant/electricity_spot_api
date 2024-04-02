import { parseXml } from '../util.xml'

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Publication_MarketDocument xmlns="urn:iec62325.351:tc57wg16:451-3:publicationdocument:7:0">
    <period.timeInterval>
        <start>2024-03-24T23:00Z</start>
        <end>2024-04-01T22:00Z</end>
    </period.timeInterval>
    <TimeSeries>
        <mRID>1</mRID>
        <businessType>A62</businessType>
        <in_Domain.mRID codingScheme="A01">10YFI-1--------U</in_Domain.mRID>
        <out_Domain.mRID codingScheme="A01">10YFI-1--------U</out_Domain.mRID>
        <currency_Unit.name>EUR</currency_Unit.name>
        <price_Measure_Unit.name>MWH</price_Measure_Unit.name>
        <curveType>A01</curveType>
        <Period>
            <timeInterval>
                <start>2024-03-24T23:00Z</start>
                <end>2024-03-25T23:00Z</end>
            </timeInterval>
            <resolution>PT60M</resolution>
            <Point>
                <position>1</position>
                <price.amount>62.51</price.amount>
            </Point>
            <Point>
                <position>2</position>
                <price.amount>62.29</price.amount>
            </Point>
        </Period>
    </TimeSeries>
    <TimeSeries>
        <mRID>2</mRID>
        <businessType>A62</businessType>
        <in_Domain.mRID codingScheme="A01">10YFI-1--------U</in_Domain.mRID>
        <out_Domain.mRID codingScheme="A01">10YFI-1--------U</out_Domain.mRID>
        <currency_Unit.name>EUR</currency_Unit.name>
        <price_Measure_Unit.name>MWH</price_Measure_Unit.name>
        <curveType>A01</curveType>
        <Period>
            <timeInterval>
                <start>2024-03-25T23:00Z</start>
                <end>2024-03-26T23:00Z</end>
            </timeInterval>
            <resolution>PT60M</resolution>
            <Point>
                <position>1</position>
                <price.amount>72.15</price.amount>
            </Point>
            <Point>
                <position>2</position>
                <price.amount>70.15</price.amount>
            </Point>
        </Period>
    </TimeSeries>
</Publication_MarketDocument>`

describe('util.xml::unit', () => {
  describe('#parseXml', () => {
    it('should parse xml', () => {
      const result = parseXml(xml) as { Publication_MarketDocument: { TimeSeries: unknown[] } }
      expect(Array.isArray(result?.Publication_MarketDocument?.TimeSeries)).toBe(true)
      expect(result?.Publication_MarketDocument?.TimeSeries.length).toBe(2)
      const timeSeriesArr = result.Publication_MarketDocument.TimeSeries as Array<{ Period: { Point: object[] } }>
      for (const timeSeries of timeSeriesArr) {
        expect(Array.isArray(timeSeries.Period.Point)).toBe(true)
        for (const point of timeSeries.Period.Point as Array<{ position: number, 'price.amount': number }>) {
          expect(point.position).toBeDefined()
          expect(point['price.amount']).toBeDefined()
        }
      }
    })
  })
})
