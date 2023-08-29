import supabase, { supabaseUrl } from "./supabase";

///////////////////////////////////////////////////////////////////////////////////////////////////
export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    throw new Error("Cabins not loaded");
  }
  return data;
};

///////////////////////////////////////////////////////////////////////////////////////////////////
// export const filterCabins = async () => {
//   const { data, error } = await supabase
//     .from("cabins")
//     .select("*")
//     .gt("dicount", 0);
//   if (error) {
//     console.log(error);
//     throw new Error("Cabins not loaded");
//   }
//   return data;
// };

///////////////////////////////////////////////////////////////////////////////////////////////////
export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin not deleted");
  }
  return data;
};

///

///////////////////////////////////////////////////////////////////////////////////////////////////
export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  /////////
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  ////
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://gzaydwyzcpyygeoiygva.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1. create cabin

  let query = supabase.from("cabins");

  // CREATE NEW CABIN
  if (!id) {
    query = query.insert([
      {
        ...newCabin,
        image: imagePath,
      },
    ]);
  }

  // EDIT CABIN
  if (id) {
    query = query
      .update({
        ...newCabin,
        image: imagePath,
      })
      .eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin not added/edit");
  }

  // 2. upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. delete cabin is image has error durring upload
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin image not uploaded and the cabin was not created");
  }

  return data;
};
