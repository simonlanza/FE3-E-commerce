import {Layout} from "@/components/layouts/Layout";
import {useRouter} from "next/router";
import React from "react";
import {useState, useEffect} from "react";
import {Character} from "../../interface/character";
import {get} from "http";
import {Card} from "@/components/ui/card";
import { GetStaticPaths } from "next";
import { getCharacter } from "@/service";

const CharacterPage = () => {
	const router = useRouter();

	const [character, setCharacter] = useState<Character>({} as Character);

	const getCharacter = async () => {
		const res = await fetch(
			`https://www.amiiboapi.com/api/amiibo/?tail=${router.query.id}`
		);
		const data = await res.json();
		setCharacter(data.amiibo[0]);
	};

	useEffect(() => {
		getCharacter();
	}, []);

	return (
		<Layout title="Character">
			<Card character={character} />
		</Layout>
	);
};

export const getStaticPath: GetStaticPaths = async ({ locales }) => {
	const idiomas = locales as string [];
	const data = await getCharacters()
	const paths = data.flatMap((character) => (
		idiomas.map((idioma) => ({params : {id: character.tail}, locale: idioma}))
	))

	return {
		paths: [],
		fallback: true,
	}
}

export const getStatiProps: GetStaticProps = async ({ params }) => {

	const id = params?.id as string;

	const character = await getCharacter();

}

export default CharacterPage;
