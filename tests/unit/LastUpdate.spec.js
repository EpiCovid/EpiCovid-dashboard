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
      "attributes": {
        "Last_Update": 100000
      }
    }, {
      "attributes": {
        "Last_Update": 200000
      }
    }]
    expect(getMountedComponent(LastUpdate, { data: data })
      .html())
      .toContain("01/01/1970 1:03 AM")
    data = [{
      "attributes": {
        "Last_Update": 200000
      }
    }, {
      "attributes": {
        "Last_Update": 300000
      }
    }]
    expect(getMountedComponent(LastUpdate, { data: data })
      .html())
      .toContain("01/01/1970 1:05 AM")
  })
  /**
   * Check if the component re-render when data is modified
   */
  it('updates the rendered message when wrapper.data updates', async () => {
    var data = [{
      "attributes": {
        "Last_Update": 100000
      }
    }, {
      "attributes": {
        "Last_Update": 200000
      }
    }]
    const wrapper = getMountedComponent(LastUpdate, { data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('01/01/1970 1:03 AM')
    data = [{
      "attributes": {
        "Last_Update": 200000
      }
    }, {
      "attributes": {
        "Last_Update": 300000
      }
    }]
    wrapper.setData({ data: data })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toContain('01/01/1970 1:05 AM')
  })
})