import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import TheRefresh from '../../icons/TheRefresh';
import Button from '../shared/Button';
import TopPosts from './TopPosts';
import { loadPosts } from '../../store/entities/posts';


const Home = () => {
    const dispatch = useDispatch();
    return (
        <React.Fragment>
            <Link to="/posts/create">
                <Button text="Create Post" styles="border rounded px-2 py-1 text-sm font-semibold hover:text-white hover:bg-teal-600 mr-2"/>
            </Link>
            <Button onClick={() => dispatch(loadPosts())} text={<TheRefresh />} styles="border rounded px-2 py-1 text-teal-600 text-sm font-semibold"/>
            <TopPosts />
        </React.Fragment>
    )
}

export default Home;