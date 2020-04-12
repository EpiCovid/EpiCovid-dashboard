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
   * Check if TotalConfirmed has a watcher on the data props
   */
  it('has a watcher on data', () => {
    expect(typeof TotalConfirmed.watch.data).toBe('function')
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
  /**
   * Check if the component re-render when data is modified
   */
  it('updates the rendered message when wrapper.data updates', async () => {
    var data = [{
      "attributes": {
        "Confirmed": 10
      }
    }, {
      "attributes": {
        "Confirmed": 10
      }
    }]
    const wrapper = getMountedComponent(TotalConfirmed, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('20')
    data = [{
      "attributes": {
        "Confirmed": 41
      }
    }, {
      "attributes": {
        "Confirmed": 10
      }
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('51')
  })
})
