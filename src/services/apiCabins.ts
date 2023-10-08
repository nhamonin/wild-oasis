import supabase from './supabase';
import { CabinCreation } from '../types/data/Cabin';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be fetched.');
  }

  return data;
}

export async function createCabin(newCabin: CabinCreation) {
  const { data, error } = await supabase.from('cabins').insert([newCabin]);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created.');
  }

  return data;
}

export async function deleteCabin(id: string) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted.');
  }

  return data;
}
