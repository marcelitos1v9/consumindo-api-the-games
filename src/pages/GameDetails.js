import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const GameDetails = () => {
    const router = useRouter();
    const { id } = router.query; // Obtém o ID do jogo da URL
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:4000/game/${id}`);
                    setGame(response.data);
                } catch (e) {
                    setError("Erro ao carregar os detalhes do jogo.");
                    console.error(e);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchGameDetails();
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;
    if (!game) return <div>Jogo não encontrado.</div>;

    return (
        <div>
            <h1>{game.title}</h1>
            <p>Ano: {game.year}</p>
            <p>Preço: R${game.price.toFixed(2)}</p>
            {game.descriptions.map((desc) => (
                <div key={desc._id}>
                    <h4>Descrição:</h4>
                    <p>Gênero: {desc.genre}</p>
                    {desc.platform && <p>Plataforma: {desc.platform}</p>}
                    <p>Classificação: {desc.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default GameDetails; 