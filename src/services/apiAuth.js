import supabase, { supabaseUrl } from "./supabase";
import { supabaseAdmin } from "./supabase";

export const signup = async ({ fullName, email, password }) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error("Cant signup at the momennt");
  }

  return data;
};
////////////////////////////////
export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
};

////////////////////////////////
export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("User not exist");
  }

  return user;
};

//
export const getAllUsers = async () => {
  const {
    data: { users },
    error,
  } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    console.error(error);
    throw new Error("No users");
  }

  return users;
};

//

export const updateCurrentUser = async ({ fullName, password, avatar }) => {
  //////////////////////////////////////////////
  // 1. update password OR fullname
  /////////////////////////////////////////////
  let updateData;
  if (password) {
    updateData = {
      password,
    };
  }
  if (fullName) {
    updateData = {
      data: {
        fullName,
      },
    };
  }
  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!avatar) return data;
  //////////////////////////////////////////////
  // 2. upload avatar image
  //////////////////////////////////////////////
  const fileName = `avatar-${data.user.id} -${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    console.log(storageError);
    throw new Error("Avatar image not uploaded");
  }

  //////////////////////////////////////////////
  // 3. update avatar image
  //////////////////////////////////////////////

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });

  if (error2) {
    console.error(error2);
    throw new Error(error.message);
  }

  return updatedUser;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("User not loged out");
  }
};
