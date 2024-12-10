import { redirect } from '@sveltejs/kit';
import { getUserById } from '$lib/users';
import jwt from 'jsonwebtoken';

const publicRoutes = ['/login', '/api'];
const PRIVATE_JWT_SECRET  = process.env.PRIVATE_JWT_SECRET!;

export const handle = async ({ event, resolve }) => {
  const token = event.cookies.get('token');
  let user = null;

  if (token) {
    try {
      // Verify JWT token
      const decoded = jwt.verify(token, PRIVATE_JWT_SECRET);
      user = await getUserById(decoded.id);
    } catch (err) {
      event.cookies.delete('token', {path: '/'});
    }
  }
  event.locals.user = user;

  // Redirect logic based on authentication status
  if (user && (event.url.pathname === '/login' || event.url.pathname === '/')) {
    throw redirect(303, '/Dashboard');
  }

  if (!user && !publicRoutes.includes(event.url.pathname.toLowerCase())) {
    throw redirect(307, '/Login');
  }

  return resolve(event);
};
export const reroute = ({ url }) => {
	return url.pathname.toLowerCase();
};
