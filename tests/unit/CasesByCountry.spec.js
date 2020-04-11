import { shallowMount } from '@vue/test-utils'
import CasesByCountry from '@/components/CasesByCountry'

// Adding Vuetify to avoid warning
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('CasesByCountry', () => {
  /**
   * Check if CasesByCountry has a 'created' hook
   */
  it('has a created hook', () => {
    expect(typeof CasesByCountry.created).toBe('function')
  });
  /**
   * Check if CasesByCountry has a 'data' props
   */
  it('sets the correct default data', () => {
    expect(typeof CasesByCountry.data).toBe('function')
    const defaultData = CasesByCountry.data()
    expect(defaultData.data).toBe(undefined)
  });
  /**
   * Check if CasesByCountry has a watcher on the data props
   */
  it('has a watcher on data', () => {
    expect(typeof CasesByCountry.watch.data).toBe('function')
  })
  /**
   * Check if the component render well the last update
   */
  it('renders correcly with different data props', () => {
    var data = [{
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }]
    expect(getMountedComponent(CasesByCountry, { data: data })
      .html())
      .toMatch(/2.*US/)
    data = [{
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Country_Region": "France",
        "Confirmed": 1
      }
    }]
    expect(getMountedComponent(CasesByCountry, { data: data })
      .html())
      .toMatch(/1.*US.*1.*France/)
    data = [{
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Country_Region": "France",
        "Confirmed": 2
      }
    }]
    expect(getMountedComponent(CasesByCountry, { data: data })
      .html())
      .toMatch(/2.*France.*1.*US/)
  })
  /**
   * Check if the component re-render when data is modified
   */
  it('updates the rendered message when wrapper.data updates', async () => {
    var data = [{
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }]
    const wrapper = getMountedComponent(CasesByCountry, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatch(/2.*US/)
    data = [{
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Country_Region": "France",
        "Confirmed": 1
      }
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatch(/1.*US.*1.*France/)
    data = [{
      "attributes": {
        "Country_Region": "US",
        "Confirmed": 1
      }
    }, {
      "attributes": {
        "Country_Region": "France",
        "Confirmed": 2
      }
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatch(/2.*France.*1.*US/)
  })
})