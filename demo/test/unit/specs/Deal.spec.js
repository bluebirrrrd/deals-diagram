import Vue from 'vue'
import { DateTime } from 'luxon'

import Deal from '@/components/Deal'
import deals from '@/data/deals'

function transformDealDates(deal) {
  const resultingDeal = Object.assign({}, deal)
  resultingDeal.startDate = DateTime.fromISO(resultingDeal.startDate)
  resultingDeal.endDate = DateTime.fromISO(resultingDeal.endDate)
  return resultingDeal
}

describe('Deal.vue', () => {
  let Constructor
  let vm
  const testDeal = transformDealDates(deals[0])
  const minDate = testDeal.startDate.minus({ months: 1 })
  const maxDate = testDeal.endDate.plus({ months: 2 })
  const duration = maxDate.diff(minDate)

  beforeEach(() => {
    Constructor = Vue.extend(Deal)
    vm = new Constructor({ propsData: {
      deal: testDeal,
      minDate,
      maxDate,
      duration,
    },
    }).$mount()
  })
})
