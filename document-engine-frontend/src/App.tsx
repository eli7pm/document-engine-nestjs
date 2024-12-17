import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentViewer } from './DocumentViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/documents/:documentId" element={<DocumentViewer />} />
      </Routes>
    </Router>
  );
}

export default App;