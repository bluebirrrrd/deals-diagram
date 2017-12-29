import Vue from 'vue'
import { DateTime } from 'luxon'

import DealsDiagram from '@/components/DealsDiagram'
import deals from '@/data/deals'

describe('DealsDiagram.vue', () => {
  let Constructor
  let vm

  beforeEach(() => {
    Constructor = Vue.extend(DealsDiagram)
    vm = new Constructor({ propsData: {
      deals,
    },
    }).$mount()
  })

  it('should calculate correct minDate and maxDate', (done) => {
    const newDeals = deals.splice(0, 3)
    const expectedMinDate = DateTime.fromISO(newDeals[0].startDate, { zone: 'utc' }).toString()
    const expectedMaxDate = DateTime.fromISO(newDeals[1].endDate, { zone: 'utc' }).toString()

    vm.deals = newDeals

    Vue.nextTick(() => {
      expect(vm.minDate.toString()).to.equal(expectedMinDate)
      expect(vm.maxDate.toString()).to.equal(expectedMaxDate)
      done()
    })
  })
})
