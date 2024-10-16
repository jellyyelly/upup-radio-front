<script>
  import { onDestroy, onMount } from "svelte";
  import { get } from 'svelte/store';
  import { letters } from '../../stores/letter.js';
  import LetterItem from '../../components/LetterItem.svelte';
  import EmptyItem from '../../components/EmptyItem.svelte';
  import LetterTableHeader from '../../components/LetterTableHeader.svelte';
  import Navigation from "../../components/Navigation.svelte";

  let startPage = 0;
  let endPage = 1;
  const view = 5;

  onMount(() => {
    letters.resetLetters();
    letters.fetchLetters().then(() => {
      console.log('편지 목록: ', get(letters).list)
      console.log('현재 페이지: ', get(letters).pageNumber)
      console.log('전체 개수: ', get(letters).totalElements)
      console.log('전체 페이지 개수: ', get(letters).totalPages)
      console.log('마지막 페이지?: ', get(letters).last)
      updatePagination();
    })
  });

  $: reactiveData = $letters.list;
  $: currentPage = $letters.pageNumber;
  $: totalPages = $letters.totalPages;

  const goToPage = (page) => {
      console.log('이동하려는 페이지= ', page)
      if (page >= 0 && page < totalPages) {
        currentPage = page;

        // 범위 업데이트
        updatePagination();

        letters.resetLetters();
        letters.fetchLetters(currentPage);
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
<div class="letter-table">
  <div class="table-statistics">
    전체 편지 개수: {$letters.totalElements}
  </div>

  <!-- 테이블 헤더 -->
  <LetterTableHeader />

  <!-- 테이블 리스트 -->
  {#each reactiveData as letter, index}
    <LetterItem {letter} />
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
  .letter-table {
    @apply flex flex-col mx-10 my-6 px-2 py-2 rounded-md flex-nowrap text-nowrap
  }
</style>
