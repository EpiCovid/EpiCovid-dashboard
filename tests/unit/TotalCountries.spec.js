import { shallowMount } from '@vue/test-utils'
import TotalCountries from '@/components/TotalCountries'

// Adding Vuetify to avoid warning
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('TotalCountries', () => {
  /**
   * Check if TotalCountries has a 'created' hook
   */
  it('has a created hook', () => {
    expect(typeof TotalCountries.created).toBe('function')
  });
  /**
   * Check if TotalCountries has a 'data' props
   */
  it('sets the correct default data', () => {
    expect(typeof TotalCountries.data).toBe('function')
    const defaultData = TotalCountries.data()
    expect(defaultData.data).toBe(undefined)
  })
  /**
   * Check if TotalCountries has a watcher on the data props
   */
  it('has a watcher on data', () => {
    expect(typeof TotalCountries.watch.data).toBe('function')
  })
  /**
   * Check if the total Countries number of cases is well rendered
   */
  it('renders correctly with different data props', () => {
    var data = [{
      "attributes": {
        "Country_Region": "US"
      }
    }, {
      "attributes": {
        "Country_Region": "US"
      }
    }, {
      "attributes": {
        "Country_Region": "France"
      }
    }]
    expect(getMountedComponent(TotalCountries, { data: data })
      .html())
      .toContain('2')
    data = [{
      "attributes": {
        "Country_Region": "US"
      }
    }, {
      "attributes": {
        "Country_Region": "China"
      }
    }, {
      "attributes": {
        "Country_Region": "France"
      }
    }]
    expect(getMountedComponent(TotalCountries, { data: data })
      .html())
      .toContain('3')
  })
  /**
   * Check if the component re-render when data is modified
   */
  it('updates the rendered message when wrapper.data updates', async () => {

    var data = [{
      "attributes": {
        "Country_Region": "US"
      }
    }, {
      "attributes": {
        "Country_Region": "US"
      }
    }, {
      "attributes": {
        "Country_Region": "France"
      }
    }]
    const wrapper = getMountedComponent(TotalCountries, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('2')


    data = [{
      "attributes": {
        "Country_Region": "US"
      }
    }, {
      "attributes": {
        "Country_Region": "China"
      }
    }, {
      "attributes": {
        "Country_Region": "France"
      }
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('3')
  })
})
