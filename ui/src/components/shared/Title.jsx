const Title = ({title, classes}) => {
    return (
        <h2 className={classes}>{title}</h2>
    )
}

Title.defaultProps = {
    classes: 'font-semibold text-teal-700 mb-2 text-lg'
}

export default Title;    