import { Link } from 'react-router-dom'
import './styles/Header.css'

const Header = () => {
  return (
    <header className='header'>
        <h1 className='header__title'>
            <Link to='/'>Musci App</Link>
        </h1>
        <nav>
            <ul className='header__ul'>
                <li>
                    <Link to='/'>Songs</Link>
                </li>
                <li>
                    <Link to='/artists'>Artists</Link>
                </li>
                <li>
                    <Link to='albums'>Albums</Link>
                </li>
                <li>
                    <Link to='/genres'>Genres</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Header