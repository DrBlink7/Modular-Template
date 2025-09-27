import { useTheme } from '../hooks/useTheme'

const ThemeToggle = () => {
  const { toggleTheme, isDark } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f3f4f6'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent'
      }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span style={{ fontSize: '1.125rem' }}>{isDark ? '☀️' : '🌙'}</span>
    </button>
  )
}

export default ThemeToggle
