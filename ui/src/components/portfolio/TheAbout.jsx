import React from 'react';

const TheAbout = () => {
    return (
        <div>
            <div className="container mx-auto flex py-5">
                <div className="w-2/3 mr-20">
                    <h4 className="text-slate-500">BACKGROUND</h4>
                    <p className="py-2 leading-loose text-sm">
                        Dedicated software engineer with 4+ years of experience interacting with a diverse internal and external customer base to solve problems and meeting
                        deadlines as Federal Govt. Contractor. Actively looking for new opportunities to grow my skill set in various software industry platforms and continuously learning
                        modern trends in software technology.
                    </p>
                </div>
                <div className="w-1/3 ml-20">
                    <h4 className="text-slate-500">SKILLS</h4>
                    <ul className="py-2 leading-loose text-sm">
                        <li>Leadership</li>
                        <li>Communication</li>
                        <li>Problem Solving</li>
                        <li>Multitasking</li>
                        <li>Programming</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TheAbout;