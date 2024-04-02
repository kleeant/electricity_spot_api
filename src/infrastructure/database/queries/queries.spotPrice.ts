export const getSpotPrices = `
  SELECT id, price, timestamp
  FROM   spot_price
  WHERE  timestamp >= :from
  AND    timestamp <= :to
  ORDER BY timestamp 
  ;
`
