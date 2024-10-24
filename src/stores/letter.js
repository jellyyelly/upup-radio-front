import { get, writable, derived } from "svelte/store";
import { getApi, delApi } from "./api.js";

// 검색어를 저장할 store 생성
export const searchTerm = writable("");
export const searchField = writable("all"); // 기본값은 전체 검색

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

      // console.log('data: ', getData)

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

export const letters = setLetters();

// 안전한 문자열 검사 함수
const safeIncludes = (field, searchTerm) => {
  // field가 null 또는 undefined면 false 반환
  if (field == null) return false;

  // 숫자인 경우 문자열로 변환
  const fieldStr = String(field).toLowerCase();
  return fieldStr.includes(searchTerm.toLowerCase());
};

// 필터링된 사용자 목록을 생성하는 derived store
export const filteredLetters = derived(
  [letters, searchTerm, searchField],
  ([$letters, $searchTerm, $searchField]) => {
    if (!$searchTerm) return $letters.list;

    return $letters.list.filter(letter => {
      switch ($searchField) {
        case 'username':
          return safeIncludes(letter.username, $searchTerm);
        case 'content':
          return safeIncludes(letter.content, $searchTerm);
        case 'uuid':
          return safeIncludes(letter.replyId, $searchTerm);
        case 'message_t':
          return safeIncludes(letter.reply.message_t, $searchTerm);
        case 'message_f':
          return safeIncludes(letter.reply.message_f, $searchTerm);
        case 'createdAt':
          return safeIncludes(letter.createdAt, $searchTerm);
        case 'all':
        default:
          return (
            safeIncludes(letter.username, $searchTerm) ||
            safeIncludes(letter.content, $searchTerm) ||
            safeIncludes(letter.replyId, $searchTerm) ||
            safeIncludes(letter.message_t, $searchTerm) ||
            safeIncludes(letter.message_f, $searchTerm) ||
            safeIncludes(letter.createdAt, $searchTerm)
          );
      }
    });
  }
);
