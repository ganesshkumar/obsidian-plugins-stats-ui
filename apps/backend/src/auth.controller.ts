import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { Repo } from '@mono/store';
import jwt from 'jsonwebtoken';

@Controller('v1/auth')
export class AuthController {
  @Post('start')
  async start(@Body() body: { redirect?: string }) {
    // Create state and PKCE parameters for OAuth
    const state = Math.random().toString(36).substring(7);
    const codeVerifier = Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7);
    
    // In a real implementation, you'd store state and codeVerifier temporarily
    // For this demo, we'll create a simple Google OAuth URL
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      response_type: 'code',
      scope: 'openid email profile',
      redirect_uri: `${process.env.OAUTH_REDIRECT_ORIGIN}/v1/auth/google/callback`,
      state,
      code_challenge: codeVerifier, // In real implementation, this should be hashed
      code_challenge_method: 'plain' // Should be S256 in production
    });
    
    const loginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    return { loginUrl };
  }

  @Get('google/callback')
  async googleCallback(@Query('code') code: string, @Query('state') state: string) {
    // In a real implementation, you'd:
    // 1. Exchange code for tokens with Google
    // 2. Get user info from Google
    // 3. Create/update user in database
    // 4. Generate JWT
    
    // For this demo, we'll simulate the process
    const mockUserInfo = {
      sub: 'google_' + Math.random().toString(36).substring(7),
      email: 'demo@example.com'
    };
    
    const user = await Repo.upsertUserFromGoogle({
      sub: mockUserInfo.sub,
      email: mockUserInfo.email
    });
    
    const token = jwt.sign(
      { id: user.id, uuid: user.uuid },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );
    
    // Redirect to Obsidian deep link
    const redirectUrl = `${process.env.OBSIDIAN_DEEP_LINK}?token=${token}&state=${state}`;
    return { redirect: redirectUrl };
  }

  @Post('me/pseudoname')
  async setPseudoname(@Body() body: { pseudoname: string }) {
    // In real implementation, extract user from JWT
    const userId = (global as any).__req_user?.id;
    if (!userId) throw new Error('Not authenticated');
    
    await Repo.setPseudoname(userId, body.pseudoname);
    return { ok: true };
  }
}