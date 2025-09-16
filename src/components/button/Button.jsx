import './Button.css';

export const Button = ({ parentMethod, children }) => { 
    const handleClick = () => {
        parentMethod();
    }

    return(
        <div className="custom-button">
            <a onClick={handleClick}>{children}</a>
        </div>
    )
}