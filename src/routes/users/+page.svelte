<script>
  import { onMount } from "svelte";
  import { get } from 'svelte/store';
  import { users } from '../../stores/user.js';
  import UserItem from '../../components/UserItem.svelte';
  import EmptyItem from '../../components/EmptyItem.svelte';
  import UserTableHeader from "../../components/UserTableHeader.svelte";
  import Navigation from "../../components/Navigation.svelte";

  let startPage = 0;
  let endPage = 1;
  const view = 3;

  onMount(() => {
    users.resetUsers();
    users.fetchUsers().then(() => {
      console.log('유저 목록: ', get(users).list)
      console.log('현재 페이지: ', get(users).pageNumber)
      console.log('전체 개수: ', get(users).totalElements)
      console.log('전체 페이지 개수: ', get(users).totalPages)
      console.log('마지막 페이지?: ', get(users).last)
      updatePagination();
    })
  });

  $: reactiveData = $users.list;
  $: currentPage = $users.pageNumber;
  $: totalPages = $users.totalPages;

  const goToPage = (page) => {
      console.log('이동하려는 페이지= ', page)
      if (page >= 0 && page < totalPages) {
        currentPage = page;

        // 범위 업데이트
        updatePagination();

        users.resetUsers();
        users.fetchUsers(currentPage);
      }
    };

  const updatePagination = () => {
    startPage = Math.floor(currentPage / view) * view;
    endPage = Math.min(startPage + (view - 1), totalPages - 1);
  }
</script>

<!-- 네비게이션 -->
<Navigation />

<!--  테이블  -->
<div class="users-table">
  <!-- 통계 -->
  <div class="table-statistics">
    전체 유저 수: {$users.totalElements}
  </div>

  <!-- 테이블 헤더 -->
  <UserTableHeader />

  <!-- 테이블 리스트 -->
  {#each reactiveData as user, index}
    <UserItem {user} />
  {:else}
    <EmptyItem />
  {/each}

  <!-- 페이지네이션 -->
  <div class="pagination flex self-center pt-5">
    <button type="button" class="btn-page" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>
      ＜
    </button>

    {#each Array(endPage - startPage + 1) as _, i }
      <button type="button" class="btn-page" on:click={() => goToPage(startPage + i)} class:active={(startPage + i) === currentPage}>
        {startPage + i + 1}
      </button>
    {/each}

    <button type="button" class="btn-page" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>
      ＞
    </button>
  </div>
</div>

<style>
  .users-table {
    @apply flex flex-col mx-10 mb-6 px-2 py-2 rounded-md flex-nowrap
  }
</style>
