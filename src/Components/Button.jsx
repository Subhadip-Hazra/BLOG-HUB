const Button = ({ onClickHandler, value, title }) => {
    return (
        // use for default button 
        <button
            onClick={onClickHandler}
            value={value}
            className={`px-4 py-1 border text-base hover:bg-green hover:text-white`}
        >
            {title}
        </button>
    );
};

export default Button;
