const Description = ({description, classes}) => {
    return (
        <p className={classes}>
            {description}
        </p>
    )
}

Description.defaultProps = {
    classes: 'text-sm mb-4 text-justify'
}

export default Description;