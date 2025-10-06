import type { Route } from "./+types/home";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'
import { useParams } from 'react-router-dom';
const supabaseUrl = 'https://mbptntdjgaaxbkutvkst.supabase.co'
const supabasekey = 'sb_publishable_bl0foT0cUlXywsYFTu3CPQ_usJlIQx-'
const supabase = createClient(supabaseUrl, supabasekey)

import type { Book } from "~/utils/types";

export default function BookDetails(){
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [book, setBook] = useState<Book | null>(null);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        async function fetchBook(){
            setLoading(true);
            let {data : book, error} = await supabase
            .from('products')
            .select('*')
            .eq('id', parseInt(id as string, 10))
            .single();

            if (error){
                console.log("Supabase Fetch Error:", error);
            }
            else{
                setBook(book as Book);
            }

            setLoading(false);
        }
        fetchBook()
    }, [id])
}