import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/products', '/cart', '/orders']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
	const token = request.cookies.get('token')
	const { pathname } = request.nextUrl

	if (pathname === '/') {
		return token
			? NextResponse.redirect(new URL('/products', request.url))
			: NextResponse.redirect(new URL('/login', request.url))
	}

	if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	if (authRoutes.includes(pathname) && token) {
		return NextResponse.redirect(new URL('/products', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/((?!api|_next/static|_next/image|favicon.ico|public).*)',
	]
}