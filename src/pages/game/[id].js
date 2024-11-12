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
                    setGame(response.data.game);
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

    if (loading) return <div className="text-center text-xl">Carregando...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;
    if (!game) return <div className="text-center">Jogo não encontrado.</div>;

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-white mb-4">{game.title || "Título não disponível"}</h1>
            <p className="text-lg text-white">Ano: {game.year || "Ano não disponível"}</p>
            <p className="text-lg text-white">Preço: {game.price !== null && game.price !== undefined ? `R$${game.price.toFixed(2)}` : "Preço não disponível"}</p>
            <div className="mt-4 bg-white p-4 rounded shadow-lg w-full max-w-md">
                {game.descriptions && game.descriptions.length > 0 ? (
                    game.descriptions.map((desc) => (
                        <div key={desc._id} className="mb-4">
                            <h4 className="font-semibold">Descrição:</h4>
                            <p>Gênero: {desc.genre || "Gênero não disponível"}</p>
                            {desc.platform && <p>Plataforma: {desc.platform}</p>}
                            <p>Classificação: {desc.rating || "Classificação não disponível"}</p>
                        </div>
                    ))
                ) : (
                    <p>Sem descrições disponíveis.</p>
                )}
            </div>
            <button 
                onClick={() => router.push(`/game/edit/${game._id}`)}
                className="mt-6 bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition-colors"
            >
                Editar Jogo
            </button>
            <button 
                onClick={() => router.push('/')} 
                className="mt-6 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
                Voltar ao Início
            </button>
        </div>
    );
};

export default GameDetails;
