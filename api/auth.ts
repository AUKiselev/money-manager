import { IUserData } from '@/models/user';

export const userRegister = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
): Promise<IUserData | undefined> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    const { user, accessToken, refreshToken } = await $fetch<IUserData>('users/registration/', {
      baseURL: baseUrl,
      method: 'POST',
      body: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const userLogin = async (email: string, password: string): Promise<IUserData | undefined> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    const { user, accessToken, refreshToken } = await $fetch<IUserData>('users/login/', {
      baseURL: baseUrl,
      method: 'POST',
      body: {
        email,
        password,
      },
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const refreshTokens = async (): Promise<IUserData | undefined> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    const { user, accessToken, refreshToken } = await $fetch<IUserData>('users/refresh/', {
      baseURL: baseUrl,
      method: 'GET',
      credentials: 'include',
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
