import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {Character} from "../interface/character";

export const getCharacter = async () => {
    const router = useRouter();

	const [character, setCharacter] = useState<Character>({} as Character);
    const res = await fetch(
        `https://www.amiiboapi.com/api/amiibo/?tail=${router.query.id}`
    );
    const data = await res.json();
    setCharacter(data.amiibo[0]);
};