const BlockQuote = ({quote}) => {
    return (
        <div className="flex my-4 bg-gray-50">
            <div className="flex-none w-1 bg-gray-700"></div>
            <blockquote className="grow px-4 py-2 italic text-sm">
                {quote}
            </blockquote>
        </div>
    )
}

export default BlockQuote;