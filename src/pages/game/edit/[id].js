import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const EditGame = () => {
    const router = useRouter();
    const { id } = router.query; // Obtém o ID do jogo da URL
    const [game, setGame] = useState({
        title: "",
        year: "",
        price: "",
        descriptions: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameDetails = async () => {
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:4000/game/${id}`);
                    setGame(response.data.game); // Ajustado para acessar 'game' na resposta
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame((prevGame) => ({
            ...prevGame,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/game/${id}`, game);
            router.push(`/game/${id}`); // Redireciona de volta para a página de detalhes após a edição
        } catch (e) {
            setError("Erro ao atualizar o jogo.");
            console.error(e);
        }
    };

    if (loading) return <div className="text-center text-xl">Carregando...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold text-white mb-4">Editar Jogo</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700">Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={game.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Ano:</label>
                    <input
                        type="number"
                        name="year"
                        value={game.year}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={game.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descrição:</label>
                    {game.descriptions.map((desc, index) => (
                        <div key={desc._id} className="mb-2">
                            <input
                                type="text"
                                name="genre"
                                value={desc.genre}
                                onChange={(e) => {
                                    const newDescriptions = [...game.descriptions];
                                    newDescriptions[index].genre = e.target.value;
                                    setGame({ ...game, descriptions: newDescriptions });
                                }}
                                placeholder="Gênero"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="platform"
                                value={desc.platform || ""}
                                onChange={(e) => {
                                    const newDescriptions = [...game.descriptions];
                                    newDescriptions[index].platform = e.target.value;
                                    setGame({ ...game, descriptions: newDescriptions });
                                }}
                                placeholder="Plataforma"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                            <input
                                type="text"
                                name="rating"
                                value={desc.rating || ""}
                                onChange={(e) => {
                                    const newDescriptions = [...game.descriptions];
                                    newDescriptions[index].rating = e.target.value;
                                    setGame({ ...game, descriptions: newDescriptions });
                                }}
                                placeholder="Classificação"
                                required
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="mt-4 w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                    Atualizar Jogo
                </button>
            </form>
            <button 
                onClick={() => router.push(`/game/${id}`)} 
                className="mt-4 bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 transition-colors"
            >
                Voltar
            </button>
        </div>
    );
};

export default EditGame; 