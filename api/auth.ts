import { IUserData } from '@/models/user';

export const userRegister = async (
  email: string,
  password: string,
  firstName?: string,
  lastName?: string,
): Promise<IUserData | undefined> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    const response = await $fetch<IUserData>('users/registration/', {
      baseURL: baseUrl,
      method: 'POST',
      credentials: 'include',
      body: {
        email,
        password,
        firstName,
        lastName,
      },
    });

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const userLogin = async (email: string, password: string): Promise<IUserData | undefined> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    const response = await $fetch<IUserData>('users/login/', {
      baseURL: baseUrl,
      method: 'POST',
      credentials: 'include',
      body: {
        email,
        password,
      },
    });

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const refreshTokens = async (): Promise<IUserData | undefined> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    const response = await $fetch<IUserData>('users/refresh/', {
      baseURL: baseUrl,
      method: 'GET',
      credentials: 'include',
    });

    return response;
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const logout = async (): Promise<void> => {
  const { baseUrl } = useRuntimeConfig().public;

  try {
    await useFetch('users/logout/', {
      baseURL: baseUrl,
      method: 'GET',
      credentials: 'include',
    });
  } catch (e) {
    console.error(e);
  }
};
