/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // 로그인이 필요하지 않은 경로들
  const publicPaths = ['/login', '/'];

  // 현재 경로가 public path가 아니라면 로그인 상태를 확인
  if (!publicPaths.includes(event.url.pathname)) {
    const jsession = event.cookies.get('JSESSIONID')
    console.log('jss',jsession)
    event.locals.isLoggedIn = typeof jsession !== 'undefined' ? true : false;
    if (!event.locals.isLoggedIn) {
      // 로그인되지 않은 경우 /login으로 리디렉션
      return new Response(null, {
        status: 302,
        headers: { Location: `/login?redirect=${event.url.pathname}` }
      });
    }
  }
  console.log('bye', event.locals.isLoggedIn)
  // 로그인 상태가 확인되었거나 public path인 경우 정상적으로 요청을 처리
  const response = await resolve(event);
  return response;
}
