import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter

const List = () => {
    const router = useRouter(); // Initialize useRouter
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [gameToDelete, setGameToDelete] = useState(null);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get("http://localhost:4000/games");
                setGames(response.data.games);
            } catch (e) {
                setError("Erro ao carregar a lista de jogos. Tente novamente mais tarde.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);

    const confirmDelete = (id) => {
        setGameToDelete(id);
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(`http://localhost:4000/game/${gameToDelete}`);
            setGames(games.filter(game => game._id !== gameToDelete));
            setGameToDelete(null);
        } catch (e) {
            setError("Erro ao deletar o jogo. Tente novamente mais tarde.");
            console.error(e);
        } finally {
            setDeleting(false);
        }
    };

    const handleViewDetails = (id) => {
        router.push(`/game/${id}`); // Certifique-se de que a rota está correta
    };

    if (loading) {
        return (
            <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Carregando jogos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
                <div className="text-red-500 bg-white p-4 rounded shadow-lg">{error}</div>
            </div>
        );
    }

    if (games.length === 0) {
        return (
            <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Nenhum jogo disponível no momento.</div>
            </div>
        );
    }

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen">
            <h2 className="text-4xl font-extrabold text-center text-white mb-12">Lista de Jogos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {games.map((game) => (
                    <div
                        key={game._id}
                        className="border border-gray-300 rounded-lg shadow-lg p-6 bg-white transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br from-yellow-100 to-white relative"
                    >
                        {game.isNew && (
                            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                Novo
                            </span>
                        )}
                        
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">{game.title}</h3>
                        <p className="text-gray-600 mb-1">Ano: <span className="font-semibold">{game.year}</span></p>
                        <p className="text-gray-600 mb-1">Preço: <span className="font-semibold">R${game.price.toFixed(2)}</span></p>
                        {game.descriptions.length > 0 && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-2">Descrição:</h4>
                                {game.descriptions.map((desc) => (
                                    <div key={desc._id} className="ml-4">
                                        <p className="text-gray-600">Gênero: <span className="font-semibold">{desc.genre}</span></p>
                                        {desc.platform && <p className="text-gray-600">Plataforma: <span className="font-semibold">{desc.platform}</span></p>}
                                        <p className="text-gray-600">Classificação: <span className="font-semibold">{desc.rating}</span></p>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button 
                            onClick={() => handleViewDetails(game._id)} // Passa o ID do jogo
                            className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                        >
                            Ver Mais Detalhes
                        </button>
                        <button className="mt-2 w-full bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600 transition-colors">
                            Comprar Agora
                        </button>
                        <button 
                            onClick={() => confirmDelete(game._id)} 
                            className="mt-2 w-full bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors"
                        >
                            Deletar Jogo
                        </button>
                    </div>
                ))}
            </div>
            {gameToDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-bold">Tem certeza que deseja deletar este jogo?</h3>
                        <div className="mt-4">
                            <button onClick={handleDelete} className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors">
                                {deleting ? "Deletando..." : "Confirmar Deleção"}
                            </button>
                            <button onClick={() => setGameToDelete(null)} className="ml-2 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 transition-colors">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default List;
