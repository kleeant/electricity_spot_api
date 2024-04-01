import { SpotPriceService } from '../../core/spotPrice/service.spotPrice'
import loggerService from '../../lib/logger'

const run = async (): Promise<void> => {
  try {
    await (new SpotPriceService()).updatePrices()
    process.exit(0)
  } catch (e) {
    loggerService.error(e as Error)
    process.exit(1)
  }
}

void run()
