export const getSpotPrices = `
  SELECT id, price, timestamp
  FROM   spot_price
  WHERE  timestamp >= :from
  AND    timestamp <= :to
  ORDER BY timestamp 
  ;
`
export const getHighestAndLowestPriceInRange = `
  SELECT max(price) as highest_price_in_range
    ,min(price) as lowest_price_in_range
  FROM   spot_price
  WHERE  timestamp >= :from
  AND    timestamp <= :to
  ;
`
