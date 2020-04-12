import { shallowMount } from '@vue/test-utils'
import LastUpdate from '@/components/LastUpdate'

// Adding Vuetify to avoid warning
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

function getMountedComponent(Component, propsData) {
  return shallowMount(Component, {
    propsData
  })
}

describe('LastUpdate', () => {
  /**
   * Check if LastUpdate has a 'created' hook
   */
  it('has a created hook', () => {
    expect(typeof LastUpdate.created).toBe('function')
  });
  /**
   * Check if LastUpdate has a 'data' props
   */
  it('sets the correct default data', () => {
    expect(typeof LastUpdate.data).toBe('function')
    const defaultData = LastUpdate.data()
    expect(defaultData.data).toBe(undefined)
  });
  /**
   * Check if LastUpdate has a watcher on the data props
   */
  it('has a watcher on data', () => {
    expect(typeof LastUpdate.watch.data).toBe('function')
  })
  /**
   * Check if the component render well the last update
   */
  it('renders correcly with different data props', () => {
    var data = [{
      "last_update": "2020-04-11 20:15:00"
    }, {
      "last_update": "2020-03-11 02:00:00"
    }]
    expect(getMountedComponent(LastUpdate, { data: data })
      .html())
      .toMatch(/04\/11\/2020 .*:15 PM/)
    data = [{
      "last_update": "2020-01-11 22:45:00"
    }, {
      "last_update": "2020-03-11 13:00:00"
    }]
    expect(getMountedComponent(LastUpdate, { data: data })
      .html())
      .toMatch(/03\/11\/2020 .*:00 PM/)
  })
  /**
   * Check if the component re-render when data is modified
   */
  it('updates the rendered message when wrapper.data updates', async () => {
    var data = [{
      "last_update": "2020-04-11 20:15:00"
    }, {
      "last_update": "2020-03-11 02:00:00"
    }]
    const wrapper = getMountedComponent(LastUpdate, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatch(/04\/11\/2020 .*:15 PM/)
    data = [{
      "last_update": "2020-01-11 22:45:00"
    }, {
      "last_update": "2020-03-11 12:00:00"
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatch(/03\/11\/2020 .*:00 PM/)
  })
})