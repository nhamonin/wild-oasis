import supabase, { supabaseUrl } from './supabase';

type UserLogin = {
  email: string;
  password: string;
};

type UserSignup = UserLogin & {
  fullName: string;
};

export async function signup({ fullName, email, password }: UserSignup) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { fullName, avatar: '' },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }: UserLogin) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser(sessionData.session.access_token);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({
  password,
  fullName,
  avatar,
}: {
  password?: string;
  fullName?: string;
  avatar?: File | null;
}) {
  let updateData = {};

  if (password) {
    updateData = { password };
  }

  if (fullName) {
    updateData = { data: { fullName } };
  }

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  if (!avatar) {
    return data;
  }

  const filename = `avatar-${data?.user?.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage.from('avatars').upload(filename, avatar);

  if (storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
    data: { avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${filename}` },
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return updatedUser;
}
