import { shallowMount } from '@vue/test-utils'
import TotalConfirmed from '@/components/TotalConfirmed'

// Adding Vuetify to avoid warning
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('TotalConfirmed', () => {
  /**
   * Check if TotalConfirmed has a 'created' hook
   */
  it('has a created hook', () => {
    expect(typeof TotalConfirmed.created).toBe('function')
  });
  /**
   * Check if TotalConfirmed has a 'data' props
   */
  it('sets the correct default data', () => {
    expect(typeof TotalConfirmed.data).toBe('function')
    const defaultData = TotalConfirmed.data()
    expect(defaultData.data).toBe(undefined)
  })
  /**
   * Check if the total confirmed number of cases is well rendered
   */
  it('renders correctly with different data props', () => {
    var data = [{
      "attributes": {
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Confirmed": 1
      }
    }]
    expect(getMountedComponent(TotalConfirmed, { data: data })
      .html())
      .toContain('2')

    var data = [{
      "attributes": {
        "Confirmed": 42
      }
    }, {
      "attributes": {
        "Confirmed": 10
      }
    }]
    expect(getMountedComponent(TotalConfirmed, { data: data })
      .html())
      .toContain('52')
  })
})
