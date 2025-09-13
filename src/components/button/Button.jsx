import './Button.css';

export const Button = ({ parentMethod, children }) => { 
    const handleClick = () => {
        parentMethod();
    }

    return(
        <div className="custom-button">
            <button onClick={handleClick}>{children}</button>
        </div>
    )
}