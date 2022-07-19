import { Link } from "react-router-dom";

const SectionOne = () => {
    return (
        <div className="bg-sky-50 flex items-center mb-4 p-4 lg:p-8">
            <div className="mr-4 lg:mr-8">
                <h2 className="font-semibold text-xl uppercase mb-2">Welcome to Dev Insights</h2>
                <p className="text-sm mb-4 text-justify">
                    It's a technical blog site that provides insights for beginners on devops, programming and cloud services.
                    Each article on this site provides useful information on setting up various tools used by devops in a real time 
                    development and production environments using AWS.
                </p>
                <Link to='/portfolio/about' className="p-2 font-medium bg-teal-600 text-white rounded uppercase text-sm">my portfolio</Link>
            </div>
            <div>
                <img src="/cover.jpg" alt="cover page" />
            </div>
        </div>
    )
}

export default SectionOne;