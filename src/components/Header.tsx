import FadeUp from "./FadeUp";

const Header = ({ header }: { header: string }) => {
  return (
    <FadeUp>
      <header className="text-gray-900 max-w-7xl mx-auto px-6 py-4 flex flex-col items-center text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          {header}
        </h1>
      </header>
    </FadeUp>
  );
}

export default Header;