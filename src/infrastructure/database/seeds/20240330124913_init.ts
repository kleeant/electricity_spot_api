import util from '../../../lib/util'
import { Knex } from 'knex'
const seeds = [
  {
    id: 1,
    price: 3.564
  },
  {
    id: 2,
    price: 3.763
  },
  {
    id: 3,
    price: 3.556
  },
  {
    id: 4,
    price: 3.514
  },
  {
    id: 5,
    price: 3.818
  },
  {
    id: 6,
    price: 4.069
  },
  {
    id: 7,
    price: 4.362
  },
  {
    id: 8,
    price: 4.796
  },
  {
    id: 9,
    price: 5.347
  },
  {
    id: 10,
    price: 5.553
  },
  {
    id: 11,
    price: 4.616
  },
  {
    id: 12,
    price: 3.791
  },
  {
    id: 13,
    price: 3.291
  },
  {
    id: 14,
    price: 3.029
  },
  {
    id: 15,
    price: 2.947
  },
  {
    id: 16,
    price: 2.467
  },
  {
    id: 17,
    price: 3.499
  },
  {
    id: 18,
    price: 4.433
  },
  {
    id: 19,
    price: 4.369
  },
  {
    id: 20,
    price: 4.252
  },
  {
    id: 21,
    price: 3.892
  },
  {
    id: 22,
    price: 3.61
  },
  {
    id: 23,
    price: 3.112
  },
  {
    id: 24,
    price: 2.408
  },
  {
    id: 25,
    price: 2.06
  },
  {
    id: 26,
    price: 1.838
  },
  {
    id: 27,
    price: 1.213
  },
  {
    id: 28,
    price: 0.999
  },
  {
    id: 29,
    price: 1.201
  },
  {
    id: 30,
    price: 1.277
  },
  {
    id: 31,
    price: 2.149
  },
  {
    id: 32,
    price: 2.239
  },
  {
    id: 33,
    price: 1.594
  },
  {
    id: 34,
    price: 1.328
  },
  {
    id: 35,
    price: 1.688
  },
  {
    id: 36,
    price: 1.883
  },
  {
    id: 37,
    price: 1.3
  },
  {
    id: 38,
    price: 0.986
  },
  {
    id: 39,
    price: 1.344
  },
  {
    id: 40,
    price: 2.619
  },
  {
    id: 41,
    price: 3.97
  },
  {
    id: 42,
    price: 4.232
  },
  {
    id: 43,
    price: 4.195
  },
  {
    id: 44,
    price: 4.188
  },
  {
    id: 45,
    price: 4.198
  },
  {
    id: 46,
    price: 3.991
  },
  {
    id: 47,
    price: 3.702
  },
  {
    id: 48,
    price: 3.548
  },
  {
    id: 49,
    price: 3.845
  },
  {
    id: 50,
    price: 3.882
  },
  {
    id: 51,
    price: 3.881
  },
  {
    id: 52,
    price: 3.96
  },
  {
    id: 53,
    price: 4.173
  },
  {
    id: 54,
    price: 4.352
  },
  {
    id: 55,
    price: 4.429
  },
  {
    id: 56,
    price: 4.567
  },
  {
    id: 57,
    price: 4.41
  },
  {
    id: 58,
    price: 4.183
  },
  {
    id: 59,
    price: 3.604
  },
  {
    id: 60,
    price: 2.508
  },
  {
    id: 61,
    price: 2.574
  },
  {
    id: 62,
    price: 1.275
  },
  {
    id: 63,
    price: 1.626
  },
  {
    id: 64,
    price: 3.504
  },
  {
    id: 65,
    price: 5.129
  },
  {
    id: 66,
    price: 5.666
  },
  {
    id: 67,
    price: 5.749
  },
  {
    id: 68,
    price: 5.473
  },
  {
    id: 69,
    price: 5.181
  },
  {
    id: 70,
    price: 4.94
  },
  {
    id: 71,
    price: 4.574
  },
  {
    id: 72,
    price: 4.209
  },
  {
    id: 73,
    price: 4.209
  },
  {
    id: 74,
    price: 4.202
  },
  {
    id: 75,
    price: 4.21
  },
  {
    id: 76,
    price: 4.382
  },
  {
    id: 77,
    price: 4.619
  },
  {
    id: 78,
    price: 4.457
  },
  {
    id: 79,
    price: 4.892
  },
  {
    id: 80,
    price: 5.004
  },
  {
    id: 81,
    price: 4.931
  },
  {
    id: 82,
    price: 4.204
  },
  {
    id: 83,
    price: 3.537
  },
  {
    id: 84,
    price: 3.546
  },
  {
    id: 85,
    price: 3.31
  },
  {
    id: 86,
    price: 3.068
  },
  {
    id: 87,
    price: 3.26
  },
  {
    id: 88,
    price: 4.107
  },
  {
    id: 89,
    price: 5.266
  },
  {
    id: 90,
    price: 5.762
  },
  {
    id: 91,
    price: 5.805
  },
  {
    id: 92,
    price: 5.083
  },
  {
    id: 93,
    price: 5.009
  },
  {
    id: 94,
    price: 4.628
  },
  {
    id: 95,
    price: 4.398
  },
  {
    id: 96,
    price: 4.041
  },
  {
    id: 97,
    price: 4.039
  },
  {
    id: 98,
    price: 4.001
  },
  {
    id: 99,
    price: 3.749
  },
  {
    id: 100,
    price: 3.649
  },
  {
    id: 101,
    price: 3.649
  },
  {
    id: 102,
    price: 3.688
  },
  {
    id: 103,
    price: 4.025
  },
  {
    id: 104,
    price: 4.237
  },
  {
    id: 105,
    price: 4.087
  },
  {
    id: 106,
    price: 3.749
  },
  {
    id: 107,
    price: 3.039
  },
  {
    id: 108,
    price: 1.804
  },
  {
    id: 109,
    price: 2.005
  },
  {
    id: 110,
    price: 1.003
  },
  {
    id: 111,
    price: 0.447
  },
  {
    id: 112,
    price: 0.412
  },
  {
    id: 113,
    price: 1.315
  },
  {
    id: 114,
    price: 3.391
  },
  {
    id: 115,
    price: 3.654
  },
  {
    id: 116,
    price: 3.214
  },
  {
    id: 117,
    price: 2.809
  },
  {
    id: 118,
    price: 0.416
  },
  {
    id: 119,
    price: 0.033
  },
  {
    id: 120,
    price: 0.554
  },
  {
    id: 121,
    price: 0.128
  },
  {
    id: 122,
    price: 0.06
  },
  {
    id: 123,
    price: 0.084
  },
  {
    id: 124,
    price: 0.151
  },
  {
    id: 125,
    price: 0.701
  },
  {
    id: 126,
    price: 3.989
  },
  {
    id: 127,
    price: 5.089
  },
  {
    id: 128,
    price: 5.605
  },
  {
    id: 129,
    price: 4.682
  },
  {
    id: 130,
    price: 3.829
  },
  {
    id: 131,
    price: 3.93
  },
  {
    id: 132,
    price: 3.928
  },
  {
    id: 133,
    price: 3.837
  },
  {
    id: 134,
    price: 3.338
  },
  {
    id: 135,
    price: 2.51
  },
  {
    id: 136,
    price: 0.883
  },
  {
    id: 137,
    price: 4.12
  },
  {
    id: 138,
    price: 4.808
  },
  {
    id: 139,
    price: 4.565
  },
  {
    id: 140,
    price: 4.29
  },
  {
    id: 141,
    price: 3.916
  },
  {
    id: 142,
    price: 2.57
  },
  {
    id: 143,
    price: 0.166
  },
  {
    id: 144,
    price: 2.528
  },
  {
    id: 145,
    price: 2.063
  },
  {
    id: 146,
    price: 1.695
  },
  {
    id: 147,
    price: 1.299
  },
  {
    id: 148,
    price: 2.684
  },
  {
    id: 149,
    price: 3.498
  },
  {
    id: 150,
    price: 3.995
  },
  {
    id: 151,
    price: 4.609
  },
  {
    id: 152,
    price: 4.982
  },
  {
    id: 153,
    price: 5.206
  },
  {
    id: 154,
    price: 5.06
  },
  {
    id: 155,
    price: 4.86
  },
  {
    id: 156,
    price: 4.975
  },
  {
    id: 157,
    price: 4.887
  },
  {
    id: 158,
    price: 4.841
  },
  {
    id: 159,
    price: 4.962
  },
  {
    id: 160,
    price: 5.395
  },
  {
    id: 161,
    price: 5.697
  },
  {
    id: 162,
    price: 5.932
  },
  {
    id: 163,
    price: 5.739
  },
  {
    id: 164,
    price: 5.428
  },
  {
    id: 165,
    price: 5.846
  },
  {
    id: 166,
    price: 5.767
  },
  {
    id: 167,
    price: 5.533
  },
  {
    id: 168,
    price: 5.452
  },
  {
    id: 169,
    price: 5.201
  },
  {
    id: 170,
    price: 5.017
  },
  {
    id: 171,
    price: 5.157
  },
  {
    id: 172,
    price: 5.194
  },
  {
    id: 173,
    price: 5.408
  },
  {
    id: 174,
    price: 7.693
  },
  {
    id: 175,
    price: 24.99
  },
  {
    id: 176,
    price: 24.996
  },
  {
    id: 177,
    price: 7.999
  },
  {
    id: 178,
    price: 7.5
  },
  {
    id: 179,
    price: 6.306
  },
  {
    id: 180,
    price: 5.949
  },
  {
    id: 181,
    price: 5.853
  },
  {
    id: 182,
    price: 6.006
  },
  {
    id: 183,
    price: 7.499
  },
  {
    id: 184,
    price: 6.566
  },
  {
    id: 185,
    price: 7.008
  },
  {
    id: 186,
    price: 9.751
  },
  {
    id: 187,
    price: 8.785
  },
  {
    id: 188,
    price: 6.778
  },
  {
    id: 189,
    price: 5.994
  },
  {
    id: 190,
    price: 5.721
  },
  {
    id: 191,
    price: 5.6
  }
]
export async function seed (knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('spot_price').del()
  const baseDay = util.date.removeDays(8)
  const data: Array<{ id: number, price: number, timestamp: Date }> = []
  seeds.forEach((seed, index) => {
    data.push({
      ...seed,
      timestamp: util.date.addHours(index + 1, baseDay)
    })
  })
  // Inserts seed entries
  await knex('spot_price').insert(data)
};
