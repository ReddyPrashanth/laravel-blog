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
import ProtectedRoute from './components/authentication/ProtectedRoute';
import { loadPosts } from './store/entities/posts';
import ThePortfolio from './components/portfolio/ThePortfolio';
import BreadCrumbs from './components/shared/BreadCrumbs';
import Posts from './components/posts';
import TheFooter from './components/shared/TheFooter';

const store = configureStore();
store.dispatch(loadPosts());
function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Loader />
        <NavBar />
        <main className='container mx-auto py-4 min-h-90'>
          <BreadCrumbs />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/portfolio/*' element={<ThePortfolio />}/>
            <Route path='create/post' element={
                <ProtectedRoute>
                  <CreatePost />
                </ProtectedRoute>
              }/>
            <Route path='/posts'>
              <Route path='' element={<Posts />}/>
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
            <Route path='/not-found' element={<NotFound />}/>
            <Route path='*' element={<Navigate replace to="/not-found" />}/>
          </Routes>
        </main>
        <TheFooter />
      </React.Fragment>
    </Provider>
  );
}

export default App;
