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

  it('should render list of deals', () => {
    expect(vm.$el.querySelector('.diagram ul').children[0].className)
    .to.equal('deal')
  })

  it('should calculate correct minDate and maxDate', (done) => {
    const newDeals = deals.splice(0, 3)
    const expectedMinDate = DateTime.fromISO(newDeals[0].startDate).toString()
    const expectedMaxDate = DateTime.fromISO(newDeals[1].endDate).toString()

    vm.deals = newDeals

    Vue.nextTick(() => {
      expect(vm.minDate.toString()).to.equal(expectedMinDate)
      expect(vm.maxDate.toString()).to.equal(expectedMaxDate)
      done()
    })
  })
})
