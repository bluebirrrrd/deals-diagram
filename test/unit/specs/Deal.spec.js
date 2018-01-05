import Vue from 'vue'
import { DateTime } from 'luxon'

import Deal from '../../../src/Deal.vue'
import deals from '../../data/deals'

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
    it('Выполнено', (done) => {
      testDeal.endDate = yesterday
      testDeal.endDateActual = yesterday
      testDeal.closingDate = yesterday
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('Выполнено')
        done()
      })
    })

    it('Просрочено на 1 день', (done) => {
      testDeal.endDate = yesterday
      testDeal.endDateActual = null
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('Просрочено на 1 дней')
        done()
      })
    })

    it('В работе', (done) => {
      testDeal.endDate = today
      testDeal.endDateActual = null
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('В работе')
        done()
      })
    })

    it('Планируется', (done) => {
      testDeal.startDate = tomorrow
      testDeal.endDate = tomorrow.plus({ days: 1 })
      testDeal.endDateActual = null
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('Планируется')
        done()
      })
    })

    it('Акты просрочены на 1 день', (done) => {
      testDeal.startDate = yesterday.minus({ days: 1 })
      testDeal.endDate = yesterday
      testDeal.endDateActual = yesterday
      testDeal.closingDate = null
      vm.deal = testDeal
      Vue.nextTick(() => {
        expect(vm.currentStatus).to.equal('Акты просрочены на 1 дней')
        done()
      })
    })
  })
})
