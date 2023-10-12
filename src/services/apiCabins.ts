import supabase, { supabaseUrl } from './supabase';
import { CabinCreation } from '../types';

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be fetched.');
  }

  return data;
}

export async function createEditCabin(newCabin: CabinCreation, id?: number) {
  const imageInDB = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.name}.jpg`.replaceAll('/', '');
  const imagePath = imageInDB
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let insertedCabin;
  let error;

  // for creating a new cabin
  if (!id) {
    ({ data: insertedCabin, error } = await supabase
      .from('cabins')
      .insert([{ ...newCabin, image: imagePath }])
      .select()
      .single());
  }

  // for editing a cabin
  if (id) {
    ({ data: insertedCabin, error } = await supabase
      .from('cabins')
      .update({ ...newCabin, image: imagePath })
      .eq('id', id)
      .select()
      .single());
  }

  if (error || !insertedCabin) {
    console.error(error);
    throw new Error('Cabins could not be created or edited.');
  }

  if (!newCabin.image) {
    console.error('Image is missing');
    throw new Error('Cabin image is missing.');
  }

  if (imageInDB) return insertedCabin;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  if (storageError) {
    console.error(storageError);
    await supabase.from('cabins').delete().eq('id', insertedCabin.id);
    throw new Error('Cabin image could not be uploaded.');
  }
}

export async function deleteCabin(id: number) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted.');
  }

  return data;
}
