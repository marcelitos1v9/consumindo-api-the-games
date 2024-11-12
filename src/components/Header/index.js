import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 shadow-lg">
            <nav className="flex justify-between items-center">
                <h1 className="text-white text-4xl font-extrabold transition duration-300 hover:underline">Bem-vindo à Plataforma de Jogos</h1>
                <div className="space-x-6">
                    <Link href="/" className="text-white text-lg font-semibold hover:text-indigo-300 transition duration-300">Página Inicial</Link>
                    <Link href="/game/create" className="text-white text-lg font-semibold hover:text-indigo-300 transition duration-300">Adicionar Novo Jogo</Link>
                    <Link href="/game/list" className="text-white text-lg font-semibold hover:text-indigo-300 transition duration-300">Ver Lista de Jogos</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
