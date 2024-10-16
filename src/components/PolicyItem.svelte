<script>
  import { config } from '../stores/config.js';

  export let policy

  const data = {
    value: ''
  }

  // 변경 버튼 제어
  let isSubmitLock = true
  $: isSubmitLock = data.value.trim() === '' || data.value.trim() === ''

  const changeValue = async (target, value) => {
    console.log(target, value)
    if (isNaN(value)) {
      window.alert(`변경 값은 숫자만 가능합니다.\n입력 값: ${value}`)
      return
    }

    const res = window.confirm(`변경하려는 정책: ${target}\n현재 값:${policy.currentValue}\n변경 값:${value}\n\n정말 변경하시겠습니까?`);
    if (res === true) {
      await config.changePolicy(target, value)
    }
  }
</script>

<div class="policy-item">
  <div class="policy-content">
    {policy.policy}
  </div>
  <div class="policy-content">
    {policy.standardValue}
  </div>
  <div class="policy-content">
    {policy.condition === 'gt' ? '기준 값보다 큰 값만 허용' : '기준 값보다 작은 값만 허용'}
  </div>
  <div class="policy-content">
    {policy.currentValue === null ? '없음' : policy.currentValue}
  </div>
  <div class="policy-content flex justify-center">
    <div class="change-form">
      <input name="changeValue" bind:value={data.value} class="change-input-field" type="text" required
            autocomplete="off" placeholder="입력" maxlength="5" />
      <button id="change" class="btn-policy-change" disabled={isSubmitLock} on:click={() => changeValue(policy.policy, data.value)} >
        변경
      </button>
    </div>
  </div>
</div>

<style>
  .policy-item {
    @apply flex gap-2 px-3 py-2 text-center items-center border-b
  }

  .policy-content {
    @apply basis-1/5
  }

  .change-form {
    @apply my-0.5 text-[13px] relative
  }

  .change-input-field {
    @apply w-24 rounded-lg p-3 pt-3.5 bg-neutral-200/50 focus:bg-white focus:outline outline-2 outline-neutral-500
  }

  .btn-policy-change {
    @apply absolute px-2 py-1.5 right-2 top-[7px] text-white bg-purple-500 rounded-lg
  }

  .btn-policy-change:hover {
    @apply bg-purple-600
  }

  .btn-policy-change:active {
    @apply transition-all duration-75 scale-[0.98] shadow-none
  }

  .btn-policy-change:disabled {
    @apply bg-purple-300 text-gray-100
  }
</style>
