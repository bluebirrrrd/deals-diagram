import Vue from 'vue'
import DealsDiagram from '@/components/DealsDiagram'

describe('DealsDiagram.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(DealsDiagram)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.diagram h2').textContent)
    .to.equal('Diagram works')
  })
})
