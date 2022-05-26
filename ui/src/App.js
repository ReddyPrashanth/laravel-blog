import React from 'react';
import NavBar from './components/shared/NavBar';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import NotFound from './components/shared/NotFound';
import CreatePost from './components/posts/CreatePost';
import Loader from './components/shared/Loader';
import ThePost from './components/posts/ThePost';
import TheLogin from './components/authentication/TheLogin';
import SignUp from './components/authentication/SignUp';
import TestAuth from './components/authentication/TestAuth';
import ProtectedRoute from './components/authentication/ProtectedRoute';
import { loadPosts } from './store/entities/posts';
import ThePortfolio from './components/portfolio/ThePortfolio';

const store = configureStore();
store.dispatch(loadPosts());
function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Loader />
        <NavBar />
        <main className='container mx-auto py-4 md:py-8'>
          <Routes>
            <Route path='/home' element={<Home />}/>
            <Route path='/portfolio/*' element={<ThePortfolio />}/>
            <Route path='/posts'>
              <Route path='create' element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }/>
              <Route path=':id' element={
                <ProtectedRoute>
                  <ThePost />
                </ProtectedRoute>
              }/>
            </Route>
            <Route path='/auth'>
              <Route path='signin' element={<TheLogin />}/>
              <Route path='signup' element={<SignUp />}/>
            </Route>
            <Route path='/test/auth' element={
              <ProtectedRoute>
                <TestAuth />
              </ProtectedRoute>
            }/>
            <Route path='/not-found' element={<NotFound />}/>
            <Route path='/' element={<Navigate replace to="/home" />}/>
            <Route path='*' element={<Navigate replace to="/not-found" />}/>
          </Routes>
        </main>
      </React.Fragment>
    </Provider>
  );
}

export default App;
