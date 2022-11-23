import './App.css';
import { Mytracker } from "./components/tracker-app/main-file"
import { GlobalProvider } from './context/globelContext';
import { PdfComponent } from './components/pdfComponent';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';

function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/pdfcomponent' element={ <GlobalProvider> <PdfComponent />  </GlobalProvider> } />
          <Route path='/' element={<GlobalProvider>           <Mytracker ></Mytracker>      </GlobalProvider>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;
