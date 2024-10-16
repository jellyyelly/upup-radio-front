import { get, writable } from "svelte/store";
import { getApi, delApi } from "./api.js";

function setUsers() {
  let initValues = {
    list: [
      // {
      //   userId: '',
      //   nickname: '',
      //   email: '',
      //   preference: '',
      //   provider: '',
      //   createdAt: ''
      // }
    ],
    pageNumber: 0,
    totalElements: 0,
    totalPages: 1,
    last: '',
  }

  const { subscribe, update, set } = writable({...initValues});

  const fetchUsers = async (pageNumber = 0) => {
    try {
      const options = {
        path:`/api/v1/admin/users?page=${pageNumber}`
      }

      const getData = await getApi(options);

      console.log('data: ', getData)

      const newData = {
        list: getData.data.content,
        pageNumber: getData.data.pageable.pageNumber,
        totalElements: getData.data.totalElements,
        totalPages: getData.data.totalPages,
        last: getData.data.last,
      }

      update(data => {
        data.list = [...newData.list, ...data.list]
        data.pageNumber = newData.pageNumber
        data.totalElements = newData.totalElements
        data.totalPages = newData.totalPages
        data.last = newData.last

        return data
    })
    }
    catch(error) {
      throw error;
    }
  }

  const fetchRemaining = async (userId) => {
    let remaining = 0;

    try {
      const options = {
        path:`/api/v1/admin/users/${userId}/remaining`
      }

      const getData = await getApi(options);

      console.log('data: ', getData)

      remaining = getData.data.remaining;
    }
    catch(error) {
      throw error;
    }

    return remaining;
  }

  const resetUsers = () => {
    set({...initValues})
  }

  return {
    subscribe,
    fetchUsers,
    fetchRemaining,
    resetUsers,
  }
}

export const users = setUsers()
