
import { shallowMount } from '@vue/test-utils'
import TotalDeaths from '@/components/TotalDeaths'

// Adding Vuetify to avoid warning
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('TotalDeaths', () => {
  /**
   * Check if TotalDeaths has a 'created' hook
   */
  it('has a created hook', () => {
    expect(typeof TotalDeaths.created).toBe('function')
  });
  /**
   * Check if TotalDeaths has a 'data' props
   */
  it('sets the correct default data', () => {
    expect(typeof TotalDeaths.data).toBe('function')
    const defaultData = TotalDeaths.data()
    expect(defaultData.data).toBe(undefined)
  });
  /**
   * Check if TotalDeaths has a watcher on the data props
   */
  it('has a watcher on data', () => {
    expect(typeof TotalDeaths.watch.data).toBe('function')
  })
  /**
   * Check if the component render well the total Deaths
   */
  it('renders correcly with different data props', () => {
    var data = [{
      "region": {
        "name": "US"
      },
      "deaths": 1
    }, {
      "region": {
        "name": "US"
      },
      "deaths": 1
    }]
    expect(getMountedComponent(TotalDeaths, { data: data })
      .html())
      .toContain("2")
    data = [{
      "region": {
        "name": "US"
      },
      "deaths": 42
    }, {
      "region": {
        "name": "US"
      },
      "deaths": 10
    }]
    expect(getMountedComponent(TotalDeaths, { data: data })
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
      "deaths": 1
    }, {
      "region": {
        "name": "US"
      },
      "deaths": 1
    }]
    const wrapper = getMountedComponent(TotalDeaths, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('2')
    data = [{
      "region": {
        "name": "US"
      },
      "deaths": 42
    }, {
      "region": {
        "name": "US"
      },
      "deaths": 10
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('52')
  })
})