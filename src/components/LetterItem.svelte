<script>
  import { letters } from '../stores/letter.js';

  export let letter

  const deleteLetter = async (letterId) => {
    const res = window.confirm(`삭제 대상 UUID: ${letterId}\n\n정말 삭제하시겠습니까?`);
  }
</script>

<div class="letter-item">
  <div class="content-sm">
    {letter.replyId === undefined ? '???' : letter.replyId}
  </div>
  <div class="content-sm">
    {letter.username === undefined ? '???' : letter.username}
  </div>
  <div class="content-lg">
    {letter.content === undefined ? '???' : letter.content}
  </div>
  <div class="content-lg">
    {letter.reply.message_f === undefined ? '???' : letter.reply.message_f}
  </div>
  <div class="content-lg">
    {letter.reply.message_t === undefined ? '???' : letter.reply.message_t}
  </div>
  <div class="content-md">
    {letter.createdAt === undefined ? '???' : letter.createdAt}
  </div>
  <div class="content-sm">
    <button class="btn-delete" on:click={() => deleteLetter(letter.replyId)}>
      삭제
    </button>
  </div>
</div>

<style>
  .letter-item {
    @apply flex gap-2 px-3 py-2 text-center items-center rounded-md border-b border-gray-200
  }

  .content-sm {
    @apply basis-1/12 line-clamp-4
  }

  .content-md {
    @apply basis-2/12
  }

  .content-lg {
    @apply basis-3/12 line-clamp-4
  }
</style>
