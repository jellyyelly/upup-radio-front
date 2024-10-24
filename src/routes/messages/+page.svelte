<script>
  import { onDestroy, onMount } from "svelte";
  import { get } from 'svelte/store';
  import { letters, searchTerm, filteredLetters, searchField } from '../../stores/letter.js';
  import LetterItem from '../../components/LetterItem.svelte';
  import EmptyItem from '../../components/EmptyItem.svelte';
  import LetterTableHeader from '../../components/LetterTableHeader.svelte';
  import Navigation from "../../components/Navigation.svelte";

  let startPage = 0;
  let endPage = 1;
  const view = 5;

  const searchOptions = [
    { value: 'all', label: '전체' },
    { value: 'uuid', label: 'uuid' },
    { value: 'username', label: '작성자' },
    { value: 'content', label: '편지 내용' },
    { value: 'message_f', label: 'F 유형 답장' },
    { value: 'message_t', label: 'T 유형 답장' },
    { value: 'createdAt', label: '작성 시간' },
  ];

  onMount(() => {
    letters.resetLetters();
    letters.fetchLetters().then(() => {
      updatePagination();
    })
  });

  $: reactiveData = $letters.list;
  $: currentPage = $letters.pageNumber;
  $: totalPages = $letters.totalPages;

  const goToPage = (page) => {
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

  <!-- 테이블 필터 -->
  <div class="filter-container">
    <label class="flex px-2" for="user-filter">
      필터 조회 수: {$filteredLetters.length}
    </label>
    <div class="flex gap-2">
      <select id="user-filter" bind:value={$searchField} class="filter-select">
        {#each searchOptions as option }
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
      <div>
        <input id="filter" type="text" class="filter-input-field" bind:value={$searchTerm} autocomplete="nickname" placeholder="필터링 할 단어를 입력하세요." />
      </div>
    </div>
  </div>

  <!-- 테이블 헤더 -->
  <LetterTableHeader />

  <!-- 테이블 리스트 -->
  {#each $filteredLetters as letter, index}
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

  .filter-container {
    @apply flex flex-col gap-2 mb-2.5 px-1.5 py-2.5 min-w-[385px] max-w-[400px] justify-start items-start border  border-neutral-300 rounded-xl flex-nowrap text-nowrap
  }

  .filter-container:focus-within {
    @apply outline outline-2 outline-neutral-500
  }

  .filter-select {
    @apply min-w-[80px] pl-2 py-2 rounded-lg bg-neutral-200/50
  }

  .filter-input-field {
    @apply min-w-[280px] rounded-lg px-2.5 py-2 bg-neutral-200/50 focus:bg-white focus:outline outline-2 outline-neutral-500
  }
</style>
