import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-blue-600 p-4">
            <nav className="flex justify-between items-center">
                <h1 className="text-white text-2xl">Minha Aplicação de Jogos</h1>
                <div>
                    <Link href="/" className="text-white mr-4">Início</Link>
                    <Link href="/game/create" className="text-white">Criar Jogo</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
