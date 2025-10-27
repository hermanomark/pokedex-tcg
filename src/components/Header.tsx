import FadeUp from "./FadeUp";

const Header = ({ header }: { header: string }) => {
  return (
    <FadeUp>
      <header className="text-gray-900 mx-auto py-4 mb-6 border-b border-gray-300">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
          {header}
        </h1>
      </header>
    </FadeUp>
  );
}

export default Header;