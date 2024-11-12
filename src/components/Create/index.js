import axios from 'axios'
import { useState } from 'react';

const CreateGame = () => {

    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [descriptions, setDescriptions] = useState([{ genre: "", platform: "", rating: "" }]);

    const handleDescriptionChange = (index, field, value) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index][field] = value;
        setDescriptions(newDescriptions);
    };

    const addDescription = () => {
        setDescriptions([...descriptions, { genre: "", platform: "", rating: "" }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/game", {
                title,
                year,
                price,
                descriptions
            });
            console.log("Jogo criado com sucesso:", response.data);
            // Aqui você pode adicionar lógica para redirecionar ou mostrar uma mensagem de sucesso
        } catch (error) {
            console.error("Erro ao criar o jogo:", error);
            // Aqui você pode adicionar lógica para mostrar uma mensagem de erro
        }
    };

    return (
        <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">Cadastrar Novo Jogo</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div>
                        <label htmlFor="gameName" className="block text-gray-700 font-semibold">Nome do Jogo:</label>
                        <input type="text" id="gameName" name="title" className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="year" className="block text-gray-700 font-semibold">Ano:</label>
                        <input type="number" name="year" id="year" className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="price" className="block text-gray-700 font-semibold">Preço:</label>
                        <input type="number" name="price" id="price" className="mt-1 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" step="0.01" required onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold">Descrições:</h3>
                    {descriptions.map((desc, index) => (
                        <div key={index} className="mt-2 border border-gray-300 p-4 rounded-lg shadow-sm">
                            <div>
                                <label className="block text-gray-700 font-semibold">Gênero:</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleDescriptionChange(index, 'genre', e.target.value)} />
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 font-semibold">Plataforma:</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleDescriptionChange(index, 'platform', e.target.value)} />
                            </div>
                            <div className="mt-2">
                                <label className="block text-gray-700 font-semibold">Classificação:</label>
                                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => handleDescriptionChange(index, 'rating', e.target.value)} />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addDescription} className="mt-2 w-full bg-gray-300 text-gray-800 font-bold py-2 rounded hover:bg-gray-400 transition-colors">
                        Adicionar Descrição
                    </button>
                    <button type="submit" className="mt-6 w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors">
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateGame;