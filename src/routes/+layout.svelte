<script>
  import "../app.css";
  import { onMount } from "svelte";
  import { auth } from '../stores/auth.js'
  import { host } from '../stores/api.js';
  import Header from '../components/Header.svelte';

  let isLoggedIn = false;
  $: {
    isLoggedIn = $auth.isLoggedIn;
  }

  onMount(async () => {
    await auth.checkLoginStatus()
  });
</script>

<div class="flex justify-between items-center">
  <Header />
  {#if isLoggedIn}
    <div class="btn-box">
      <form method="POST" action={host + "/api/v1/admin/logout"}>
        <button class="btn-logout" type="submit">
          로그아웃
        </button>
      </form>
    </div>
  {:else}
    <div class="btn-box">
      <a class="btn-login" href="/login">
        로그인
      </a>
    </div>
  {/if}
</div>

<slot />

<style>
  .btn-box {
    @apply flex mx-10 my-8 px-2 py-4
  }
  .btn-login {
    @apply px-3 py-2 text-white bg-purple-500 rounded-full shadow-lg cursor-pointer select-none
  }

  .btn-login:hover {
    @apply bg-purple-600
  }

  .btn-login:active {
    @apply transition-all duration-75 scale-[0.98] shadow-none
  }

  .btn-logout {
    @apply px-3 py-2 text-white bg-red-500 rounded-full shadow-lg cursor-pointer select-none
  }

  .btn-logout:hover {
    @apply bg-red-600
  }

  .btn-logout:active {
    @apply transition-all duration-75 scale-[0.98] shadow-none
  }
</style>
