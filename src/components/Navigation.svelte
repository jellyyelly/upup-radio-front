<script>
  import { auth } from "../stores/auth";

  $: isLoggedIn = $auth.isLoggedIn
  $: pathname = typeof window === 'undefined' ? 'null' : window.location.pathname
</script>

{#if isLoggedIn}
  <div class="page-nav">
    <a href="/users" type="button" class="nav-btn" class:active={(pathname === '/users')}>유저 목록</a>
    <a href="/messages" type="button" class="nav-btn" class:active={(pathname === '/messages')}>편지 목록</a>
    <a href="/config" type="button" class="nav-btn" class:active={(pathname === '/config')}>설정</a>
  </div>
{/if}

<style>
  .nav-btn.active{
    @apply bg-purple-700
  }
</style>
