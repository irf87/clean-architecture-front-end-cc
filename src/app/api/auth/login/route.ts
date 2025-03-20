import { NextResponse } from 'next/server'
import { AuthRepositoryImpl } from '@/domains/auth/infrastructure/server/AuthRepositoryImpl';
import { LoginUseCase } from '@/domains/auth/application/server/LoginUseCase';

// Simulate random delay between 1-5 seconds
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 4000 + 1000))

export async function POST(request: Request) {
  try {

    await randomDelay();

    // 20% chance of timeout
    if (Math.random() < 0.2) {
      // Simulate a longer delay to trigger timeout
      await new Promise(resolve => setTimeout(resolve, 6000))
    }

    const loginUseCase = new LoginUseCase(new AuthRepositoryImpl());

    const body = await request.json()
    const { email, password, dynamicKey } = body;

    const userResponse = await loginUseCase.execute(email, password);

    if(userResponse.error) {
      return NextResponse.json(
        { error: userResponse.error },
        { status: userResponse?.status || 500 }
      )
    }

    const response = NextResponse.json(userResponse, { status:200 });

    response.cookies.set('token', userResponse.data?.token || '', {
      path: '/',
      maxAge: 3600,
    });
    
    response.cookies.set('dynamicKey', dynamicKey, {
      path: '/',
      maxAge: 300,
    });

    return response
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 