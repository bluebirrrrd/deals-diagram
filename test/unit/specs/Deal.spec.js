import Vue from 'vue'
import { DateTime } from 'luxon'

import Deal from '../../../src/Deal.vue'
import deals from '../../data/deals'

function transformDealDates(deal) {
  const resultingDeal = Object.assign({}, deal)
  resultingDeal.startDate = DateTime.fromISO(resultingDeal.startDate, { zone: 'utc' })
  resultingDeal.endDate = DateTime.fromISO(resultingDeal.endDate, { zone: 'utc' })
  if (resultingDeal.endDateActual) {
    resultingDeal.endDateActual = DateTime.fromISO(resultingDeal.endDateActual, { zone: 'utc' })
  }

  return resultingDeal
}

describe('Deal.vue', () => {
  let Constructor
  let vm
  const testDeal = transformDealDates(deals[0])
  const minDate = testDeal.startDate.minus({ months: 1 })
  const maxDate = testDeal.endDate.plus({ months: 2 })
  const duration = maxDate.diff(minDate)

  const today = DateTime.local().setZone('utc').set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  const yesterday = today.minus({ days: 1 })
  const tomorrow = today.plus({ days: 1 })

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

  describe('should set the status to ', () => {
    it('Finished', (done) => {
      testDeal.endDate = yesterday
      testDeal.endDateActual = yesterday
      testDeal.closingDate = yesterday
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('Finished')
        done()
      })
    })

    it('1 days overdue', (done) => {
      testDeal.endDate = yesterday
      testDeal.endDateActual = null
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('1 days overdue')
        done()
      })
    })

    it('In progress', (done) => {
      testDeal.endDate = today
      testDeal.endDateActual = null
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('In progress')
        done()
      })
    })

    it('Scheduled', (done) => {
      testDeal.startDate = tomorrow
      testDeal.endDate = tomorrow.plus({ days: 1 })
      testDeal.endDateActual = null
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('Scheduled')
        done()
      })
    })

  })
})
