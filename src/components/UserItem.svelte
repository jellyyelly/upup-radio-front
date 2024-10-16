<script>
  import { users } from '../stores/user.js';

  export let user

  $: remaining = null;

  const retrieveRemaining = async (userId) => {
    remaining = await users.fetchRemaining(userId);
  }

  const deleteUser = async (userId, nickname) => {
    const res = window.confirm(`삭제 대상 UUID: ${userId}\n삭제 대상 작성자: ${nickname}\n\n정말 삭제하시겠습니까?`);
    console.log(res)
  }
</script>

<div class="user-item">
  <div class="content-sm">
    {user.userId === undefined ? '???' : user.userId}
  </div>
  <div class="content-md">
    {user.nickname === undefined ? '???' : user.nickname}
  </div>
  <div class="content-md">
    {user.email === undefined ? '???' : user.email}
  </div>
  <div class="content-sm">
    {user.preference === undefined ? '???' : user.preference}
  </div>
  <div class="content-md">
    {user.provider === undefined ? '???' : user.provider}
  </div>
  <div class="content-md">
    {user.createdAt === undefined ? '???' : user.createdAt}
  </div>
  <div class="flex gap-3 justify-center items-center content-sm text-nowrap">
    {remaining === null ? '? 개' : `${remaining}개`}
    <button class="btn-retrieve" on:click={() => retrieveRemaining(user.userId)}>
      조회
    </button>
  </div>
  <div class="content-sm text-nowrap" on:click={() => deleteUser(user.userId, user.nickname)}>
    <button class="btn-delete">
      삭제
    </button>
  </div>
</div>

<style>
  .user-item {
    @apply flex gap-2 px-3 py-2 text-center items-center rounded-md border-b border-gray-200
  }

  .content-sm {
    @apply basis-1/12
  }

  .content-md {
    @apply basis-2/12
  }

  .btn-retrieve {
    @apply px-2 py-1.5 text-white bg-purple-500 hover:bg-purple-600 rounded-lg drop-shadow-md
  }

  .btn-retrieve:active {
    @apply transition-all duration-75 scale-[0.98] shadow-none
  }
</style>
