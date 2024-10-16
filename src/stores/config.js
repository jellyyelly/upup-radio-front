import { get, writable } from "svelte/store";
import { getApi, putApi } from "./api.js";

function setConfig() {
  let initValues = {
    policies: [],
  }

  const { subscribe, update, set } = writable({...initValues});

  const fetchPolicies = async () => {
    try {
      const options = {
        path:`/api/v1/admin/policy`
      }

      const getData = await getApi(options);

      console.log('data: ', getData)

      update(data => {
        data.policies = getData.data

        return data
      })
    }
    catch(error) {
      throw error;
    }
  }

  const changePolicy = async (policy, value) => {
    try {
      const data = {
        target: policy,
        changeValue: value
      }

      const options = {
        path:`/api/v1/admin/policy?${policy}=${value}`,
        data: data
      }

      const getData = await putApi(options);

      fetchPolicies();
      window.alert(`변경에 성공했습니다.\n\n변경한 값: ${getData.data.changeResult}\n변경 시각:${getData.data.changeDateTime}`)
      console.log('put result: ', getData)
    }
    catch(error) {
      throw error;
    }
  }

  const resetPolicies = () => {
    set({...initValues})
  }

  return {
    subscribe,
    fetchPolicies,
    changePolicy,
    resetPolicies,
  }
}

export const config = setConfig()
