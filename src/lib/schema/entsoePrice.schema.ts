import { type Static, Type } from '@sinclair/typebox'
import configDotenv from '../../infrastructure/config/config.dotenv'

const TimeIntervalSchema = Type.Object({
  start: Type.String(),
  end: Type.String()
})

const PeriodSchema = Type.Object({
  timeInterval: TimeIntervalSchema,
  resolution: Type.Literal('PT60M'),
  Point: Type.Array(Type.Object({
    position: Type.Number(),
    'price.amount': Type.Number()
  }))
})

const TimeSeriesSchema = Type.Object({
  'currency_Unit.name': Type.Literal('EUR'),
  'price_Measure_Unit.name': Type.Literal('MWH'),
  'in_Domain.mRID': Type.Literal(configDotenv.ENTSOE_FIN_DOMAIN),
  'out_Domain.mRID': Type.Literal(configDotenv.ENTSOE_FIN_DOMAIN),
  Period: PeriodSchema
})

export const EntsoePriceSchema = Type.Object({
  Publication_MarketDocument: Type.Object({
    TimeSeries: Type.Array(TimeSeriesSchema)
  })
})

export type TEntsoePrice = Static<typeof EntsoePriceSchema>
