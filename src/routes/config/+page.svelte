<script>
  import { onMount } from "svelte";
  import { config } from '../../stores/config.js';
  import PolicyTableHeader from "../../components/PolicyTableHeader.svelte";
  import PolicyItem from "../../components/PolicyItem.svelte";
  import Navigation from "../../components/Navigation.svelte";

  onMount(() => {
    config.resetPolicies();
    config.fetchPolicies();
  })
</script>

<!-- 네비게이션 -->
<Navigation />

<div class="policy-table">
  <!-- 통계 -->
  <div class="table-statistics">
    전체 정책 수: {$config.policies.length}
  </div>

  <!-- 헤더 -->
  <PolicyTableHeader />

  <!-- 아이템 -->
  {#each $config.policies as policy, index}
    <PolicyItem {policy} />
  {:else}
    <div class="policy-empty">
      찾으려는 정책이 없습니다.
    </div>
  {/each}
</div>

<style>
  .policy-table {
    @apply flex flex-col mx-24 mb-6 px-2 py-2 rounded-md
  }

  .policy-empty {
    @apply flex-1 text-neutral-500 px-3 py-2 text-center items-center
  }
</style>
