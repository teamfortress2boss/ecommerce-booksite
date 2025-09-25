export type Book = {
  id: number;
  imageUrl: string;
  title: string;
  author: string;
  price: string;
};

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://mbptntdjgaaxbkutvkst.supabase.co'
const supabasekey = 'sb_secret_nsta7AIGs3UiaR8xQSTsDQ_8aohKeVu'
const supabase = createClient(supabaseUrl, supabasekey)

let { data: products, error } = await supabase
  .from('products')
  .select('id, imageUrl, title, author, price')

export const featuredBooks: Book[] = products;
console.log(featuredBooks);