import { get, writable } from "svelte/store";
import { getApi, delApi } from "./api.js";

function setLetters() {
  let initValues = {
    list: [
      // {
      //   replyId: '',
      //   letterId: '',
      //   username: '',
      //   content: '',
      //   preference: '',
      //   reply: {
      //     message_f: '',
      //     message_t: ''
      //   },
      //   createdAt: ''
      // }
    ],
    pageNumber: 0,
    totalElements: 0,
    totalPages: 1,
    last: '',
  }

  const { subscribe, update, set } = writable({...initValues});

  const fetchLetters = async (pageNumber = 0) => {
    try {
      const options = {
        path:`/api/v1/admin/messages?page=${pageNumber}`
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

  const resetLetters = () => { // 편지 목록을 초기화 해주는 역할
    set({...initValues})
}

  return {
    subscribe,
    fetchLetters,
    // fetchIssueDetail,
    // deleteIssue,
    resetLetters,
  }
}

export const letters = setLetters()
