<script>
  const data = {
      username: '',
      password: ''
  }

  // 로그인 버튼 제어
  let isSubmitLock = true
  $: isSubmitLock = data.username.trim() === '' || data.password.trim() === ''
</script>

<div class="flex justify-center items-center mt-64">
  <form class="flex-col" method="POST" action="http://localhost:8090/api/v1/admin/login">
    <div class="login-form-input-container">
      <span class="login-form-label">아이디</span>
      <input name="username" bind:value={data.username} class="login-input-field" type="text" required
            autocomplete="username" placeholder="아이디를 입력하세요" maxlength="20"/>
    </div>
    <div class="login-form-input-container">
      <span class="login-form-label">비밀번호</span>
      <input name="password" bind:value={data.password} class="login-input-field" type="password" required
            autocomplete="new-password" placeholder="비밀번호를 입력하세요" maxlength="20"/>
    </div>

    <button id="login" type="submit" class="login-btn" disabled={isSubmitLock} >
      <span class="mr-1 text-[16px]">
          <i class="bi bi-box-arrow-in-right"></i>
      </span>
      로그인
    </button>
  </form>
</div>

<style>
  .login-form-input-container {
    @apply mt-3 text-[13px] relative
  }

  .login-form-label {
    @apply absolute translate-y-2 ml-1 text-gray-500 left-[10px] top-[6px] pointer-events-none
  }

  .login-input-field {
    @apply pl-[6rem] pt-3.5 w-full rounded-lg p-3 bg-neutral-200/50 focus:bg-white focus:outline outline-2 outline-neutral-500
  }

  .login-btn {
    @apply mt-3 w-[350px] px-[1rem] py-3 text-[15px] font-bold rounded-xl hover:bg-purple-600 hover:border-purple-600 text-white bg-purple-500 border border-purple-500 shadow-sm
  }

  .login-btn:disabled {
    @apply mt-3 w-[350px] px-[1rem] py-3 text-[15px] font-bold rounded-xl text-white bg-purple-300 border border-purple-300 shadow-sm
  }
</style>
