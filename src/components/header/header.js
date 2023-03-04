import './headers.scss'

const Header = () => {
    return (
        <div className="header  h-12">
            <div className="header_content grid  grid-cols-3 gap-4">
                <button className="nav_btn">React TRELLO</button>
                <div className="lg:col-start-3 grid grid-cols-3 gap-4">
                    <button className="nav_btn">Home</button>
                    <button className="nav_btn">Your Board</button>
                    <button className="nav_btn">Source Code</button>
                </div>
            </div>
            
        </div>
        
    )
}
export default Header;