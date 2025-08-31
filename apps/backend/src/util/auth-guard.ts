import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    
    if (!token) {
      throw new Error('No token provided');
    }
    
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      (global as any).__req_user = payload; // attach for brevity
      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}