import { redirect, error } from '@sveltejs/kit';
import { findUserByUsername } from '$lib/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const PRIVATE_JWT_SECRET  = process.env.PRIVATE_JWT_SECRET!;

export async function POST({ request, cookies }) {
  try{
    const { username, password } = await request.json();

    const user = await findUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, username: user.username },
        PRIVATE_JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      // Set JWT token in an HTTP-only cookie
      cookies.set('token', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: false, // Set to true if using HTTPS
        maxAge: 60 * 60 * 24 // 1 day
      });
      return new Response('ok', { status: 200 });
      //redirect(302, '/');
    } else {
      error(401, 'Usuário ou senha incorreta.');
    }
  }catch(err){
    console.log(err)
    error(401, 'Usuário ou senha incorreta.');
  }

}
