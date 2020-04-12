import { shallowMount } from '@vue/test-utils'
import TotalRecovered from '@/components/TotalRecovered'

// Adding Vuetify to avoid warning
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('TotalRecovered', () => {
  /**
   * Check if TotalRecovered has a 'created' hook
   */
  it('has a created hook', () => {
    expect(typeof TotalRecovered.created).toBe('function')
  });
  /**
   * Check if TotalRecovered has a 'data' props
   */
  it('sets the correct default data', () => {
    expect(typeof TotalRecovered.data).toBe('function')
    const defaultData = TotalRecovered.data()
    expect(defaultData.data).toBe(undefined)
  });
  /**
   * Check if TotalRecovered has a watcher on the data props
   */
  it('has a watcher on data', () => {
    expect(typeof TotalRecovered.watch.data).toBe('function')
  })
  /**
   * Check if the component render well the total recovered
   */
  it('renders correcly with different data props', () => {
    var data = [{
      "region": {
        "name": "US"
      },
      "recovered": 1
    }, {
      "region": {
        "name": "US"
      },
      "recovered": 1
    }]
    expect(getMountedComponent(TotalRecovered, { data: data })
      .html())
      .toContain("2")
    data = [{
      "region": {
        "name": "US"
      },
      "recovered": 42
    }, {
      "region": {
        "name": "US"
      },
      "recovered": 10
    }]
    expect(getMountedComponent(TotalRecovered, { data: data })
      .html())
      .toContain("52")
  })
  /**
   * Check if the component re-render when data is modified
   */
  it('updates the rendered message when wrapper.data updates', async () => {
    var data = [{
      "region": {
        "name": "US"
      },
      "recovered": 1
    }, {
      "region": {
        "name": "US"
      },
      "recovered": 1
    }]
    const wrapper = getMountedComponent(TotalRecovered, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('2')
    data = [{
      "region": {
        "name": "US"
      },
      "recovered": 42
    }, {
      "region": {
        "name": "US"
      },
      "recovered": 10
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('52')
  })
})