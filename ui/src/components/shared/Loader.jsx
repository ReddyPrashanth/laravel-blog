import React from 'react';
import { connect } from 'react-redux';
import { getLoading } from '../../store/entities/loader';

const Loader = ({isLoading}) => {
    return (
        <div>
            {isLoading && <div id="spinner" aria-hidden="true" className="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center md:h-full md:inset-0 bg-opacity-50 bg-gray-200">
                <div className="relative px-4 w-full max-w-md h-full md:h-auto">
                    <div className=" flex justify-center items-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-x-2 border-gray-900"></div>
                    </div>
                </div>
            </div>}
        </div> 
    )
}

const mapStateToProps = (state) => ({
    isLoading: getLoading(state)
})

export default connect(mapStateToProps, null)(Loader);