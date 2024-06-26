import { IHttpRequestService } from '../../interface/IHttpRequestService'
import { DataSourceEntsoe } from '../dataSource.entsoe'

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Publication_MarketDocument xmlns="urn:iec62325.351:tc57wg16:451-3:publicationdocument:7:0">
    <mRID>a172d0e6ee9d4444b70b2224435d52c0</mRID>
    <revisionNumber>1</revisionNumber>
    <type>A44</type>
    <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A450</sender_MarketParticipant.mRID>
    <sender_MarketParticipant.marketRole.type>A32</sender_MarketParticipant.marketRole.type>
    <receiver_MarketParticipant.mRID codingScheme="A01">10X1001A1001A450</receiver_MarketParticipant.mRID>
    <receiver_MarketParticipant.marketRole.type>A33</receiver_MarketParticipant.marketRole.type>
    <createdDateTime>2024-04-01T10:18:35Z</createdDateTime>
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
            <Point>
                <position>3</position>
                <price.amount>61.97</price.amount>
            </Point>
            <Point>
                <position>4</position>
                <price.amount>63.95</price.amount>
            </Point>
            <Point>
                <position>5</position>
                <price.amount>66.96</price.amount>
            </Point>
            <Point>
                <position>6</position>
                <price.amount>77.14</price.amount>
            </Point>
            <Point>
                <position>7</position>
                <price.amount>88.43</price.amount>
            </Point>
            <Point>
                <position>8</position>
                <price.amount>157.78</price.amount>
            </Point>
            <Point>
                <position>9</position>
                <price.amount>140.10</price.amount>
            </Point>
            <Point>
                <position>10</position>
                <price.amount>97.99</price.amount>
            </Point>
            <Point>
                <position>11</position>
                <price.amount>80.05</price.amount>
            </Point>
            <Point>
                <position>12</position>
                <price.amount>80.14</price.amount>
            </Point>
            <Point>
                <position>13</position>
                <price.amount>79.07</price.amount>
            </Point>
            <Point>
                <position>14</position>
                <price.amount>75.35</price.amount>
            </Point>
            <Point>
                <position>15</position>
                <price.amount>74.06</price.amount>
            </Point>
            <Point>
                <position>16</position>
                <price.amount>73.97</price.amount>
            </Point>
            <Point>
                <position>17</position>
                <price.amount>81.05</price.amount>
            </Point>
            <Point>
                <position>18</position>
                <price.amount>111.88</price.amount>
            </Point>
            <Point>
                <position>19</position>
                <price.amount>172.15</price.amount>
            </Point>
            <Point>
                <position>20</position>
                <price.amount>149.75</price.amount>
            </Point>
            <Point>
                <position>21</position>
                <price.amount>100.27</price.amount>
            </Point>
            <Point>
                <position>22</position>
                <price.amount>82.39</price.amount>
            </Point>
            <Point>
                <position>23</position>
                <price.amount>79.56</price.amount>
            </Point>
            <Point>
                <position>24</position>
                <price.amount>74.74</price.amount>
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
            <Point>
                <position>3</position>
                <price.amount>67.26</price.amount>
            </Point>
            <Point>
                <position>4</position>
                <price.amount>66.35</price.amount>
            </Point>
            <Point>
                <position>5</position>
                <price.amount>79.79</price.amount>
            </Point>
            <Point>
                <position>6</position>
                <price.amount>98.01</price.amount>
            </Point>
            <Point>
                <position>7</position>
                <price.amount>92.35</price.amount>
            </Point>
            <Point>
                <position>8</position>
                <price.amount>139.28</price.amount>
            </Point>
            <Point>
                <position>9</position>
                <price.amount>141.24</price.amount>
            </Point>
            <Point>
                <position>10</position>
                <price.amount>98.05</price.amount>
            </Point>
            <Point>
                <position>11</position>
                <price.amount>87.07</price.amount>
            </Point>
            <Point>
                <position>12</position>
                <price.amount>87.05</price.amount>
            </Point>
            <Point>
                <position>13</position>
                <price.amount>79.90</price.amount>
            </Point>
            <Point>
                <position>14</position>
                <price.amount>79.80</price.amount>
            </Point>
            <Point>
                <position>15</position>
                <price.amount>87.02</price.amount>
            </Point>
            <Point>
                <position>16</position>
                <price.amount>98.01</price.amount>
            </Point>
            <Point>
                <position>17</position>
                <price.amount>105.95</price.amount>
            </Point>
            <Point>
                <position>18</position>
                <price.amount>135.19</price.amount>
            </Point>
            <Point>
                <position>19</position>
                <price.amount>135.45</price.amount>
            </Point>
            <Point>
                <position>20</position>
                <price.amount>74.02</price.amount>
            </Point>
            <Point>
                <position>21</position>
                <price.amount>58.36</price.amount>
            </Point>
            <Point>
                <position>22</position>
                <price.amount>58.01</price.amount>
            </Point>
            <Point>
                <position>23</position>
                <price.amount>56.65</price.amount>
            </Point>
            <Point>
                <position>24</position>
                <price.amount>55.17</price.amount>
            </Point>
        </Period>
    </TimeSeries>
</Publication_MarketDocument>`

const xmlWithOneTimeSeries = `<?xml version="1.0" encoding="UTF-8"?>
<Publication_MarketDocument xmlns="urn:iec62325.351:tc57wg16:451-3:publicationdocument:7:0">
    <mRID>d66e218ffc8f41b288496575864041ae</mRID>
    <revisionNumber>1</revisionNumber>
    <type>A44</type>
    <sender_MarketParticipant.mRID codingScheme="A01">10X1001A1001A450</sender_MarketParticipant.mRID>
    <sender_MarketParticipant.marketRole.type>A32</sender_MarketParticipant.marketRole.type>
    <receiver_MarketParticipant.mRID codingScheme="A01">10X1001A1001A450</receiver_MarketParticipant.mRID>
    <receiver_MarketParticipant.marketRole.type>A33</receiver_MarketParticipant.marketRole.type>
    <createdDateTime>2024-04-02T07:38:59Z</createdDateTime>
    <period.timeInterval>
        <start>2024-04-01T22:00Z</start>
        <end>2024-04-02T22:00Z</end>
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
                <start>2024-04-01T22:00Z</start>
                <end>2024-04-02T22:00Z</end>
            </timeInterval>
            <resolution>PT60M</resolution>
            <Point>
                <position>1</position>
                <price.amount>5.54</price.amount>
            </Point>
            <Point>
                <position>2</position>
                <price.amount>1.28</price.amount>
            </Point>
            <Point>
                <position>3</position>
                <price.amount>0.60</price.amount>
            </Point>
            <Point>
                <position>4</position>
                <price.amount>0.84</price.amount>
            </Point>
            <Point>
                <position>5</position>
                <price.amount>1.51</price.amount>
            </Point>
            <Point>
                <position>6</position>
                <price.amount>7.01</price.amount>
            </Point>
            <Point>
                <position>7</position>
                <price.amount>39.89</price.amount>
            </Point>
            <Point>
                <position>8</position>
                <price.amount>50.89</price.amount>
            </Point>
            <Point>
                <position>9</position>
                <price.amount>56.05</price.amount>
            </Point>
            <Point>
                <position>10</position>
                <price.amount>46.82</price.amount>
            </Point>
            <Point>
                <position>11</position>
                <price.amount>38.29</price.amount>
            </Point>
            <Point>
                <position>12</position>
                <price.amount>39.30</price.amount>
            </Point>
            <Point>
                <position>13</position>
                <price.amount>39.28</price.amount>
            </Point>
            <Point>
                <position>14</position>
                <price.amount>38.37</price.amount>
            </Point>
            <Point>
                <position>15</position>
                <price.amount>33.38</price.amount>
            </Point>
            <Point>
                <position>16</position>
                <price.amount>25.10</price.amount>
            </Point>
            <Point>
                <position>17</position>
                <price.amount>8.83</price.amount>
            </Point>
            <Point>
                <position>18</position>
                <price.amount>41.20</price.amount>
            </Point>
            <Point>
                <position>19</position>
                <price.amount>48.08</price.amount>
            </Point>
            <Point>
                <position>20</position>
                <price.amount>45.65</price.amount>
            </Point>
            <Point>
                <position>21</position>
                <price.amount>42.90</price.amount>
            </Point>
            <Point>
                <position>22</position>
                <price.amount>39.16</price.amount>
            </Point>
            <Point>
                <position>23</position>
                <price.amount>25.70</price.amount>
            </Point>
            <Point>
                <position>24</position>
                <price.amount>1.66</price.amount>
            </Point>
        </Period>
    </TimeSeries>
</Publication_MarketDocument>`

describe('dataSource.entsoe::unit', () => {
  const startDate = new Date('2024-03-24T23:00Z')
  const endDate = new Date('2024-03-25T23:00Z')
  describe('#getDayAheadPrices', () => {
    it('should return data', async () => {
      const httpRequestServiceMock: IHttpRequestService = { makeHttpRequest: jest.fn().mockResolvedValue(xml) }
      const result = await new DataSourceEntsoe(httpRequestServiceMock).getDayAheadPrices(startDate, endDate)
      expect(result).toBeDefined()
    })
    it('should parse data correctly with one TimeSeries', async () => {
      const httpRequestServiceMock: IHttpRequestService = { makeHttpRequest: jest.fn().mockResolvedValue(xmlWithOneTimeSeries) }
      const result = await new DataSourceEntsoe(httpRequestServiceMock).getDayAheadPrices(startDate, endDate)
      expect(result).toBeDefined()
      expect(result.Publication_MarketDocument.TimeSeries.length).toBe(1)
    })
  })
  describe('#getPeriod', () => {
    it('should return a number that is the sum of year, month, day, and hours', async () => {
      const date = new Date('2024-10-25T22:00:00.000Z')
      const result = new DataSourceEntsoe().getPeriod(date)
      expect(result.toString().length).toBe(12)
      expect(result).toBe(202410252200)
    })
    it('should return a number for single digit months and days and hours', () => {
      const date = new Date('2024-01-01T01:00:00.000Z')
      const result = new DataSourceEntsoe().getPeriod(date)
      expect(result.toString().length).toBe(12)
      expect(result).toBe(202401010100)
    })
    it('minutes should always be 00', () => {
      const date = new Date('2024-01-01T01:59:00.000Z')
      const result = new DataSourceEntsoe().getPeriod(date)
      expect(result.toString().length).toBe(12)
      expect(result).toBe(202401010100)
    })
  })
})
