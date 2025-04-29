
export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav>
      <button onClick={toggleDarkMode}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
}