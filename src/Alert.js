const Alert = ({ variant, children }) => {
    const colors = {
        success: '#A4D0A4',
        danger: '#E06469'
    }
    return (
        // we can use inline style to dynamically change the style of our alerts
        // inline styles need two curly braces because first we set JSX curly braces
        // then we create an object which ofcoase needs curly braces
        <div style={{ backgroundColor: colors[variant] }}>
            {/* This is how we can access HTML elements that are nested in Alert in App.js */}
            {children}
        </div>
    )
}

export default Alert;