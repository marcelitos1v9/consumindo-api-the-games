import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const CreateGame = () => {
    const router = useRouter();
    const [game, setGame] = useState({
        title: "",
        year: "",
        price: "",
        descriptions: [{ genre: "", platform: "", rating: "" }]
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Adicionando estado para mensagem de sucesso

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame((prevGame) => ({
            ...prevGame,
            [name]: value
        }));
    };

    const handleDescriptionChange = (index, e) => {
        const { name, value } = e.target;
        const newDescriptions = [...game.descriptions];
        newDescriptions[index][name] = value;
        setGame({ ...game, descriptions: newDescriptions });
    };

    const addDescription = () => {
        setGame((prevGame) => ({
            ...prevGame,
            descriptions: [...prevGame.descriptions, { genre: "", platform: "", rating: "" }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/game", game);
            setSuccessMessage("Jogo criado com sucesso!"); // Definindo mensagem de sucesso
            setTimeout(() => {
                router.push("/"); // Redireciona para a página inicial após 2 segundos
            }, 2000);
        } catch (e) {
            setError("Erro ao criar o jogo.");
            console.error(e);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">Criar Novo Jogo</h1>
            {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
            {successMessage && <div className="text-green-500 mb-4 text-center">{successMessage}</div>} {/* Exibindo mensagem de sucesso */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Título:</label>
                    <input
                        type="text"
                        name="title"
                        value={game.title}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Ano:</label>
                    <input
                        type="number"
                        name="year"
                        value={game.year}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Preço:</label>
                    <input
                        type="number"
                        name="price"
                        value={game.price}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold">Descrição:</label>
                    {game.descriptions.map((description, index) => (
                        <div key={index} className="mb-2">
                            <input
                                type="text"
                                name="genre"
                                value={description.genre}
                                onChange={(e) => handleDescriptionChange(index, e)}
                                placeholder="Gênero"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                name="platform"
                                value={description.platform}
                                onChange={(e) => handleDescriptionChange(index, e)}
                                placeholder="Plataforma"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                name="rating"
                                value={description.rating}
                                onChange={(e) => handleDescriptionChange(index, e)}
                                placeholder="Avaliação"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addDescription} className="mt-2 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors">
                        Adicionar Descrição
                    </button>
                </div>
                <button type="submit" className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors">
                    Criar Jogo
                </button>
            </form>
        </div>
    );
};

export default CreateGame;
