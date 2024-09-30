'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Searchbar () {
    
    const [search, setSearch] = useState('');
    const searchParams = useSearchParams();
    const router = useRouter();

    const q = searchParams.get('q');

    useEffect(() => {
        setSearch(q || '')
    },[q])

    const onChangeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const onClickBtn = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`)
    }

    const onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            onClickBtn()
        }
    }


    return (
        <div>
            <input
                type="text"
                placeholder="검색어를 입력하세요."
                value={search}
                onChange={onChangeSearch}
                onKeyDown={onKeyDown}
            />
            <button
                type="button"
                onClick={onClickBtn}
            >검색</button>
        </div>
    )
}