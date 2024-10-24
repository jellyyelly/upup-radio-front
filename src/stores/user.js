import { get, writable, derived } from "svelte/store";
import { getApi, delApi } from "./api.js";

// 검색어를 저장할 store 생성
export const searchTerm = writable("");
export const searchField = writable("all"); // 기본값은 전체 검색

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

  const fetchRemaining = async (userId) => {
    let remaining = 0;

    try {
      const options = {
        path:`/api/v1/admin/users/${userId}/remaining`
      }

      const getData = await getApi(options);

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

export const users = setUsers();

// 안전한 문자열 검사 함수
const safeIncludes = (field, searchTerm) => {
  // field가 null 또는 undefined면 false 반환
  if (field == null) return false;

  // 숫자인 경우 문자열로 변환
  const fieldStr = String(field).toLowerCase();
  return fieldStr.includes(searchTerm.toLowerCase());
};

// 필터링된 사용자 목록을 생성하는 derived store
export const filteredUsers = derived(
  [users, searchTerm, searchField],
  ([$users, $searchTerm, $searchField]) => {
    if (!$searchTerm) return $users.list;

    return $users.list.filter(user => {
      switch ($searchField) {
        case 'nickname':
          return safeIncludes(user.nickname, $searchTerm);
        case 'email':
          return safeIncludes(user.email, $searchTerm);
        case 'uuid':
          return safeIncludes(user.userId, $searchTerm);
        case 'preference':
          return safeIncludes(user.preference, $searchTerm);
        case 'createdAt':
          return safeIncludes(user.createdAt, $searchTerm);
        case 'dormant':
          return safeIncludes(user.dormant, $searchTerm);
        case 'dormantAt':
          return safeIncludes(user.dormantAt, $searchTerm);
        case 'all':
        default:
          return (
            safeIncludes(user.nickname, $searchTerm) ||
            safeIncludes(user.email, $searchTerm) ||
            safeIncludes(user.userId, $searchTerm) ||
            safeIncludes(user.preference, $searchTerm) ||
            safeIncludes(user.createdAt, $searchTerm) ||
            safeIncludes(user.dormant, $searchTerm) ||
            safeIncludes(user.dormantAt, $searchTerm)
          );
      }
    });
  }
);
