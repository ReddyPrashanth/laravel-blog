const DateDisplay = ({displaytext, date}) => {
    return (
        <p className="text-sm mb-2">{displaytext} <span className="text-teal-800">{date}</span></p>
    )
}

export default DateDisplay;