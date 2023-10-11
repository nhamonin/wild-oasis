import supabase, { supabaseUrl } from './supabase';
import { CabinCreation } from '../types';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be fetched.');
  }

  return data;
}

export async function createCabin(newCabin: CabinCreation) {
  const imageName = `${Math.random()}-${newCabin.name}.jpg`.replaceAll('/', '');
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from('')
    .insert([{ ...newCabin, image: imagePath }])
    .select('*');

  if (error || !data) {
    console.error(error);
    throw new Error('Cabins could not be created.');
  }

  const insertedCabin = data[0];

  if (!newCabin.image) {
    console.error('Image is missing');
    throw new Error('Cabin image is missing.');
  }

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
