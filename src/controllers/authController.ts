import { Controller, Post, Body, Route } from 'tsoa';
import jwt from 'jsonwebtoken';

@Route('auth')
export class AuthController extends Controller {
  @Post('token')
  public async generateToken(
    @Body() requestBody: { username: string; password: string }
  ): Promise<string> {
    const { username, password } = requestBody;

    // Verificar si el usuario y la contraseña son válidos (aquí debes implementar tu lógica de autenticación)
    const isValidUser = await authenticateUser(username, password);

    if (isValidUser) {
      // Crear un token JWT con una clave secreta
      const token = jwt.sign({ username }, 'secret', { expiresIn: '1h' });

      // Retornar el token generado
      return token;
    } else {
      throw new Error('Credenciales inválidas');
    }
  }
}

async function authenticateUser(username: string, password: string): Promise<boolean> {
  // Aquí debes implementar la lógica para verificar si el usuario y la contraseña son válidos
  // Puedes consultar una base de datos, llamar a un servicio de autenticación, etc.
  // Retorna true si el usuario es válido y false si no lo es
  // Aquí tienes un ejemplo básico:

  const validUsername = 'admin';
  const validPassword = 'admin';

  if (username === validUsername && password === validPassword) {
    return true;
  } else {
    return false;
  }
}
