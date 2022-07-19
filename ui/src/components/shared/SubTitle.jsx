const SubTitle = ({subTitle, classes}) => {
    return (
        <h2 className={classes}>{subTitle}</h2>
    )
}

SubTitle.defaultProps = {
    classes: 'font-sm text-teal-700 mb-2'
}

export default SubTitle;